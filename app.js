import express from "express";
import Joi from "joi";
import { drivers, teams } from "./data.js";
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

// List of constructors
app.get(`${baseRoute}/teams`, (req, res) => {
  res.status(200).send(teams);
});

// Getting the driver on the consulted position
// After ":" I can put my 'route parametrer'
app.get(`${baseRoute}/drivers/standings/:position`, (req, res) => {
  const positionSchema = Joi.number().min(1).max(drivers.length);
  const position = req.params.position; // req.params will return an object {"position" : [VALUE INFORMED ON URL]}

  const { error } = positionSchema.validate(position);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  console.log(error);
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
  const driverSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    team: Joi.string().min(3).max(50).required(),
    points: Joi.number().min(0).max(1000).default(0),
  });
  const validationObject = driverSchema.validate(req.body, {
    abortEarly: false,
  });
  const { error } = validationObject;
  if (error) {
    res.status(400).send(error.message);
    return;
  }

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
  const driverSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    team: Joi.string().min(3).max(50).required(),
    points: Joi.number().min(0).max(1000).default(0),
  });

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
  res.status(200).send(selectedDriver);
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
