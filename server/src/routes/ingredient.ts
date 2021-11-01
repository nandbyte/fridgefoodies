import { getIngredientById,listIngredients, addIngredient,editIngredient } from "../controllers/ingredient.controller";
import { Router } from "express";


const router = Router();

router.get("/ingredients", listIngredients);
router.get("/ingredient/:id", getIngredientById);
router.post("/ingredient", addIngredient);
router.put("/ingredient",editIngredient);
export default router;
