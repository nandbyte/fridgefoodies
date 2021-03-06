import express from "express";
import cors from "cors";
import config from "./config";
import ingredientRoute from "./routes/ingredient";
import foodie from "./routes/foodie";
import recipe from "./routes/recipe";
import recipeIngrediant from "./routes/recipeIngredient";
import rating from "./routes/ratings";
import search from "./routes/search";
import comment from "./routes/comment"
const app = express();

// Configuration
app.set("port", config.port);
const {Client} = require('pg');
const pool = new Client();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(ingredientRoute);
app.use(foodie);
app.use(recipe);
app.use(recipeIngrediant);
app.use(rating);
app.use(search);
app.use(comment);
export default app;
