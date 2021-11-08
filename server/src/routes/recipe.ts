import { Router } from "express";
import {
    getAllRecipe,
    addRecipe,
    editRecipe,
    getAllRecipeByUsers,
    getRecipeById,
    searchRecipeByKeyWord,
    deleteRecipe,
    getTotalCalorie
} from "../controllers/recipe.controller";

import { protect } from "../middleware/auth"

const router = Router();

router.post("/recipe",addRecipe);
router.put("/recipe", editRecipe);
router.get("/recipe", getAllRecipe);
router.get("/recipe/user/:id", getAllRecipeByUsers);
router.get("/recipe/:id", getRecipeById);
router.get("/recipe/find/:keyword?", searchRecipeByKeyWord);
router.delete("/recipe",deleteRecipe);
router.get("/recipe/getcalorie/:id",getTotalCalorie);
export default router;