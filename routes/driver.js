import express from "express";
import { randomUUID } from "node:crypto";
import {
  validateDriverInfo,
  validatePositionSchema,
} from "../inputValidation.js";

import { drivers } from "../data.js";

const router = express.Router();

// List of driver ordered
router.get(`/`, (req, res) => {
  res.status(200).send(drivers);
});

// Getting the driver on the consulted position
// After ":" I can put my 'route parametrer'
router.get(`/standings/:position`, (req, res) => {
  const position = req.params.position; // req.params will return an object {"position" : [VALUE INFORMED ON URL]}
  const { error } = validatePositionSchema(position, drivers.length);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  // const {position} = req.params; // Another way to get the information
  res.status(200).send(drivers[position - 1]);
});

// Getting information of a driver based on the id
router.get(`/:id`, (req, res) => {
  const driverId = req.params["id"]; // Another way to get the information
  const selectedDriver = drivers.find((driver) => {
    return driver.id === driverId;
  });

  if (!selectedDriver) {
    res.status(404).send(`Driver not founded<br>Searched ID:<br>${driverId}`);
    return;
  }
  res.status(200).send(selectedDriver);
});

// Creating a new pilot
router.post(`/`, (req, res) => {
  const newDriver = { ...req.body, id: randomUUID() };
  const validationObject = validateDriverInfo(req.body);
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
router.put(`/:id`, (req, res) => {
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

router.delete(`/:id`, (req, res) => {
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

export default router;
