import express from "express";
import {
  create,
  update,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
const router = express.Router();

// Define routes
router.post("/", create);

router.put("/:id", update);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
