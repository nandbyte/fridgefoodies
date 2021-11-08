import { Router } from "express";
import { addRecipeIngredient, editRecipeIngredient, getRecipeIngredientById, deleteRecipeIngredient } from "../controllers/recipeIngredient.controller";
import { protect } from "../middleware/auth"

const router = Router();
router.post("/recipeingredient", addRecipeIngredient);
router.put("/recipeingredient", editRecipeIngredient);
router.delete("/recipeingredient/:id", deleteRecipeIngredient);
router.get("/recipeingredient/:id", getRecipeIngredientById)
export default router;