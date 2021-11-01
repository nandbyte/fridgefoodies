import { Router } from "express";
import { addRecipe,editRecipe } from "../controllers/recipe.controller";

const router = Router();

router.post("/recipe", addRecipe).put("/recipe",editRecipe);

export default router;