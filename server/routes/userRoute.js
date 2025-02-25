import express from "express";
import {
  create,
  update,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsersbyTeam,
} from "../controllers/userController.js";
const router = express.Router();

// Define routes
router.post("/", create);

router.put("/", update);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.get("/team", getUsersbyTeam);
router.get("/:id", getUserById);

export default router;
