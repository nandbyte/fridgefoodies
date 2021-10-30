import express from "express";
import cors from "cors";
import config from "./config";

import ingredientRoute from "./routes/ingredient";

const app = express();

// Configuration
app.set("port", config.port);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(ingredientRoute);

export default app;
