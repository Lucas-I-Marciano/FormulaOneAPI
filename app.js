import express from "express";
import Joi from "joi";
// teams is static, so in order to get the most updated value from teams, I have to export the function that will generate the team array
import { drivers, teams, generateTeamsArray } from "./data.js";
import { randomUUID } from "node:crypto";
import {
  validateDriverInfo,
  validatePositionSchema,
} from "./inputValidation.js";

import driversRouter from "./routes/driver.js";
import teamsRouter from "./routes/team.js";

const baseRoute = "/api/v1";
const app = express();

// Middleware
// My request / response will go through this middleware before delivery result
app.use(express.json());

// I will use each file as a router. If an endpoint was for /drivers, access driver.js file
app.use(`${baseRoute}/drivers`, driversRouter);
app.use(`${baseRoute}/teams`, teamsRouter);

app.use((error, req, res, next) => {
  res.status(error.statusCode ?? 500).send(error);
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log("Server running on port: ", port);
});

// I will leave my first way to construct the API before refractory below. I developed here and once completed, I refractory to routers file

// // List of constructors
// app.get(`${baseRoute}/teams`, (req, res) => {
//   res.status(200).send(generateTeamsArray());
// });

// // Getting the driver on the consulted position
// app.get(`${baseRoute}/teams/standings/:position`, (req, res) => {
//   const position = req.params.position; // req.params will return an object {"position" : [VALUE INFORMED ON URL]}
//   const { error } = validatePositionSchema(
//     position,
//     generateTeamsArray().length
//   );

//   if (error) {
//     res.status(400).send(error.message);
//     return;
//   }
//   // const {position} = req.params; // Another way to get the information
//   res.status(200).send(generateTeamsArray()[position - 1]);
// });

// // List of driver ordered
// app.get(`${baseRoute}/drivers`, (req, res) => {
//   res.status(200).send(drivers);
// });

// // Getting the driver on the consulted position
// // After ":" I can put my 'route parametrer'
// app.get(`${baseRoute}/drivers/standings/:position`, (req, res) => {
//   const position = req.params.position; // req.params will return an object {"position" : [VALUE INFORMED ON URL]}
//   const { error } = validatePositionSchema(position, drivers.length);
//   if (error) {
//     res.status(400).send(error.message);
//     return;
//   }

//   // const {position} = req.params; // Another way to get the information
//   res.status(200).send(drivers[position - 1]);
// });

// // Getting information of a driver based on the id
// app.get(`${baseRoute}/drivers/:id`, (req, res) => {
//   const driverId = req.params["id"]; // Another way to get the information
//   const selectedDriver = drivers.find((driver) => {
//     return driver.id === driverId;
//   });

//   if (!selectedDriver) {
//     res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
//     return;
//   }
//   res.status(200).send(selectedDriver);
// });

// // Creating a new pilot
// app.post(`${baseRoute}/drivers`, (req, res) => {
//   const newDriver = { ...req.body, id: randomUUID() };
//   const validationObject = validateDriverInfo(req.body);
//   const { error } = validationObject;
//   if (error) {
//     res.status(400).send(error.message);
//     return;
//   }

//   drivers.push(newDriver);
//   drivers.sort((item1, item2) => {
//     if (item1.points > item2.points) {
//       return -1; // Like move down one position on sort
//     }
//     if (item1.points < item2.points) {
//       return 1; // Like move up one position on sort
//     }
//     return 0;
//   });
//   res.status(200).send(newDriver);
// });

// // Updating informations
// app.put(`${baseRoute}/drivers/:id`, (req, res) => {
//   const driverId = req.params.id;
//   const selectedDriver = drivers.find((drive) => {
//     return drive.id === driverId;
//   });
//   if (!selectedDriver) {
//     res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
//     return;
//   }

//   const newInformation = req.body;
//   for (const information in newInformation) {
//     if (information in selectedDriver) {
//       selectedDriver[information] = newInformation[information];
//     } else {
//       console.log(`${information} is not a relevant information`);
//       continue;
//     }
//   }
//   // If user change points, I need to reorder my list
//   drivers.sort((item1, item2) => {
//     if (item1.points > item2.points) {
//       return -1; // Like move down one position on sort
//     }
//     if (item1.points < item2.points) {
//       return 1; // Like move up one position on sort
//     }
//     return 0;
//   });
//   res.status(200).send(selectedDriver);
// });

// app.delete(`${baseRoute}/drivers/:id`, (req, res) => {
//   const driverId = req.params.id;
//   const selectedDriver = drivers.find((driver) => {
//     return driver.id === driverId;
//   });
//   if (!selectedDriver) {
//     res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
//     return;
//   }
//   drivers.splice(drivers.indexOf(selectedDriver), 1);
//   res.status(200).send(selectedDriver);
// });
