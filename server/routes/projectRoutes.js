import express from "express";
import {
  getProjects,
  createProject,
  getProjectbyId,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/all", getAllProjects);
router.post("/create", createProject);
router.get("/:id", getProjectbyId);
router.put("/:projectId", updateProject);
router.put("/delete/:projectId", deleteProject);

export default router;
