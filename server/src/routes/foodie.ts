import { Router } from "express";
import { registerUser,loginUser,foodieDetails } from "../controllers/foodie.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/register", registerUser).post("/login",loginUser);
router.post("/profile",foodieDetails);
export default router;
