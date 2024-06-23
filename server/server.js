require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const createHttpError = require("http-errors");
const { isHttpError } = require("http-errors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(logger("dev"));

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknwon error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
