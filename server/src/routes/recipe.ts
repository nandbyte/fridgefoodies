import { Router } from "express";
import { addRecipe } from "../controllers/recipe.controller";

const router = Router();

router.post("/recipe", addRecipe);

export default router;