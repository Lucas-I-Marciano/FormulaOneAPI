import express from "express";
import { driversInRandomOrder as drivers } from "./data.js";

const baseRoute = "/api/v1";
const app = express();

app.get(`${baseRoute}/drivers`, (req, res) => {
  res.status(200).send(drivers);
});

const port = 3000;
app.listen(port, () => {
  console.log("Server running on port: ", port);
});
