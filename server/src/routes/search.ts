import { Router } from "express";
import { search,searchByCalorie } from "../controllers/search.controller";

const router = Router();

router.post("/search",search);
router.get("/search/calories",searchByCalorie);
export default router;