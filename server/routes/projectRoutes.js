import express from "express";
import {
  getProjects,
  createProject,
  getProjectbyId,
} from "../controllers/projectController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/create", authenticateToken, createProject);
router.get("/:id", getProjectbyId);

export default router;
