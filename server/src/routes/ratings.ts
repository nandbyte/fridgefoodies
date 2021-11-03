import { Router } from "express";
import { addRating,getAllRatingsByRecipe,checkRating,deleteRating } from "../controllers/ratings.controller";
import { protect } from "../middleware/auth";


const router = Router();

router.post("/ratings",protect,addRating);
router.get("/ratings/:id",getAllRatingsByRecipe);
router.post("/checkrating",checkRating);
router.delete("/ratings",protect,deleteRating);
export default router;