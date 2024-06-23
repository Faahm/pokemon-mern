require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const logger = require("morgan");
const homeRoutes = require("./routes/home");
const pokemonsRoutes = require("./routes/pokemons");
const createHttpError = require("http-errors");
const { isHttpError } = require("http-errors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(logger("dev"));

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", homeRoutes);

app.use("/pokemons", pokemonsRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
  console.error("Error details:", {
    message: error.message,
    status: error.status,
    stack: error.stack,
  });
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
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
