import { Router } from "express";
import { registerUser,loginUser } from "../controllers/foodie.controller";

const router = Router();

router.post("/register", registerUser).post("/login",loginUser);

export default router;
