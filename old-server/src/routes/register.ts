import { Router } from "express";
import { registerUser } from "../controllers/register.controller";

const router = Router();

router.post("/register", registerUser);

export default router;
