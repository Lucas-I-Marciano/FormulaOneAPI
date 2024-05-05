import express from "express";
import { generateTeamsArray } from "../data.js";
import { validatePositionSchema } from "../inputValidation.js";

const router = express.Router();

// List of constructors
// I will change app to router
router.get(`/`, (req, res) => {
  res.status(200).send(generateTeamsArray());
});

// Getting the driver on the consulted position
router.get(`/standings/:position`, (req, res, next) => {
  const position = req.params.position; // req.params will return an object {"position" : [VALUE INFORMED ON URL]}
  const { error } = validatePositionSchema(
    position,
    generateTeamsArray().length
  );

  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.descrition = error.message;
    return next(err);
  }
  // const {position} = req.params; // Another way to get the information
  res.status(200).send(generateTeamsArray()[position - 1]);
});

export default router;
