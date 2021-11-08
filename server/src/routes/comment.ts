import { Router } from "express";
import { addComment,deleteComment } from "../controllers/comment.controller";
import { protect } from "../middleware/auth";
const router = Router();

router.post("/comment",protect,addComment);
router.delete("/comment/:id",protect,deleteComment);

export default router;