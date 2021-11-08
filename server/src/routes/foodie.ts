import { Router } from "express";
import { registerUser,loginUser,foodieDetails } from "../controllers/foodie.controller";

const router = Router();

router.post("/register", registerUser).post("/login",loginUser);
router.post("/profile",foodieDetails);
export default router;
