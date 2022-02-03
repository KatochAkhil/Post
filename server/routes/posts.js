import express from "express";
import {
  createPost,
  updatePost,
  getPost,
  deletePost,
  likePost
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch('/:id', likePost)

export default router;
