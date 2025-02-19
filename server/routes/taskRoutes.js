import express from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/create", createTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;
