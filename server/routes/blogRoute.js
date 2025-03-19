import express from "express";

import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/BlogController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.post("/", authenticateToken, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", authenticateToken, updateBlog);
router.put("/delete/:id", authenticateToken, deleteBlog);

export default router;
