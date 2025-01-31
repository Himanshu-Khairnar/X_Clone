import { Router } from "express";
import {
  getComments,
  createComment,
} from "../controllers/Comment.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
const router = Router();

router.route("/").get(getComments).post(verifyJWT, createComment);
router.route("/:userId").get(verifyJWT, getCommentByUser);
router
  .route("/:commentId")
  .delete(verifyJWT, deleteComment)
  .post(verifyJWT, commnetonComment)
  .put(verifyJWT, updateComment);

export default router;
