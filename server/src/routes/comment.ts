import { Router } from "express";
import { addComment,deleteComment } from "../controllers/comment.controller";

const router = Router();

router.post("/comment",addComment);
router.delete("/comment/:id",deleteComment);

export default router;