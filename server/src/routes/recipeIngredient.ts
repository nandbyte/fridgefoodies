import { Router } from "express";
import { addRecipeIngredient, editRecipeIngredient, getRecipeIngredientById, deleteRecipeIngredient } from "../controllers/recipeIngredient.controller";
import { protect } from "../middleware/auth"

const router = Router();
router.post("/recipeingredient", protect,addRecipeIngredient);
router.put("/recipeingredient", protect,editRecipeIngredient);
router.delete("/recipeingredient/:id", protect,deleteRecipeIngredient);
router.get("/recipeingredient/:id", getRecipeIngredientById)
export default router;