import { Router } from "express";
import { registerUser } from "../controllers/foodie.controller";

const router = Router();

router.post("/register", registerUser);

export default router;
