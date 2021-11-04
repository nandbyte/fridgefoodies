import { Router } from "express";
import {
    getAllRecipe,
    addRecipe,
    editRecipe,
    getAllRecipeByUsers,
    getRecipeById,
    searchRecipeByKeyWord
} from "../controllers/recipe.controller";

import { protect } from "../middleware/auth"

const router = Router();

router.post("/recipe",protect,addRecipe);
router.put("/recipe",protect, editRecipe);
router.get("/recipe", getAllRecipe);
router.get("/recipe/user/:id", getAllRecipeByUsers);
router.get("/recipe/:id", getRecipeById);
router.get("/recipe/find/:keyword?", searchRecipeByKeyWord);

export default router;