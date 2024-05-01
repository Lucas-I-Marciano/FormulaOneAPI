import express from "express";
import { drivers } from "./data.js";
import { randomUUID } from "node:crypto";

const baseRoute = "/api/v1";
const app = express();

// Middleware
// My request / response will go through this middleware before delivery result
app.use(express.json());

// List of driver ordered
app.get(`${baseRoute}/drivers`, (req, res) => {
  res.status(200).send(drivers);
});

// Getting the driver on the consulted position
// After ":" I can put my 'route parametrer'
app.get(`${baseRoute}/drivers/standings/:position`, (req, res) => {
  const position = req.params.position; // req.params will return an object {"position" : [VALUE INFORMED ON URL]}
  // const {position} = req.params; // Another way to get the information
  res.status(200).send(drivers[position - 1]);
});

// Getting information of a driver based on the id
app.get(`${baseRoute}/drivers/:id`, (req, res) => {
  const driverId = req.params["id"]; // Another way to get the information
  const selectedDriver = drivers.find((driver) => {
    return driver.id === driverId;
  });
  console.log(
    drivers.find((driver) => {
      return driver.id === driverId;
    })
  );
  if (!selectedDriver) {
    res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
    return;
  }
  res.status(200).send(selectedDriver);
});

// Creating a new pilot
app.post(`${baseRoute}/drivers`, (req, res) => {
  const newDriver = { ...req.body, id: randomUUID() };
  drivers.push(newDriver);
  drivers.sort((item1, item2) => {
    if (item1.points > item2.points) {
      return -1; // Like move down one position on sort
    }
    if (item1.points < item2.points) {
      return 1; // Like move up one position on sort
    }
    return 0;
  });
  res.status(200).send(newDriver);
});

// Updating informations
app.put(`${baseRoute}/drivers/:id`, (req, res) => {
  const driverId = req.params.id;
  const selectedDriver = drivers.find((drive) => {
    return drive.id === driverId;
  });
  if (!selectedDriver) {
    res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
    return;
  }
  const newInformation = req.body;
  for (const information in newInformation) {
    if (information in selectedDriver) {
      selectedDriver[information] = newInformation[information];
    } else {
      console.log(`${information} is not a relevant information`);
      continue;
    }
  }
  // If user change points, I need to reorder my list
  drivers.sort((item1, item2) => {
    if (item1.points > item2.points) {
      return -1; // Like move down one position on sort
    }
    if (item1.points < item2.points) {
      return 1; // Like move up one position on sort
    }
    return 0;
  });
  res.status(200).send(selectedDrive);
});

app.delete(`${baseRoute}/drivers/:id`, (req, res) => {
  const driverId = req.params.id;
  const selectedDriver = drivers.find((driver) => {
    return driver.id === driverId;
  });
  if (!selectedDriver) {
    res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
    return;
  }
  drivers.splice(drivers.indexOf(selectedDriver), 1);
  res.status(200).send(selectedDriver);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server running on port: ", port);
});
