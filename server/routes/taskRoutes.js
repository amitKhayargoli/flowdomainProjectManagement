import express from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/create", createTask);

router.get("/getUserTasks", getUserTasks);
router.get("/:taskId", getTaskById);
router.patch("/:taskId/status", updateTaskStatus);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
export default router;
