import express from "express";
import { login, init } from "../controllers/AuthController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.get("/init", authenticateToken, init);
router.post("/login", login);

export default router;
