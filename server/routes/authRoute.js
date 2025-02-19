import express from "express";
import { login, init } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/init", init);
router.post("/login", login);

export default router;
