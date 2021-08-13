import { getIngredientById } from "../controllers/ingredient.controller";
import { Router } from "express";
import { listIngredients } from "../controllers/ingredient.controller";

const router = Router();

router.get("/ingredients", listIngredients);
router.get("/ingredient/:id", getIngredientById);

export default router;
