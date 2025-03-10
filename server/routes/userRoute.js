import express from "express";
import {
  create,
  update,
  getAllUsers,
  getUserById,
  getUsersbyTeam,
  deleteUserbyId,
  deleteAccount,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
const router = express.Router();

// Define routes
router.post("/", create);

router.put("/", update);
router.put("/deleteAccount", authenticateToken, deleteAccount);
router.put("/delete/:id", deleteUserbyId);
router.get("/", authenticateToken, getAllUsers);
router.get("/team", authenticateToken, getUsersbyTeam);
router.get("/:id", authenticateToken, getUserById);

export default router;
