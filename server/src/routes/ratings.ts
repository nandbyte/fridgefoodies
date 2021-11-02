import { Router } from "express";
import { addRating,getAllRatingsByRecipe,checkRating,deleteRating } from "../controllers/ratings.controller";

const router = Router();

router.post("/ratings",addRating);
router.get("/ratings/:id",getAllRatingsByRecipe);
router.post("/checkrating",checkRating);
router.delete("/ratings",deleteRating);
export default router;