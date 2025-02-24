import express from "express";
import {
  generateInvite,
  handleInvite,
} from "../controllers/InviteController.js";

const router = express.Router();

router.post("/", generateInvite);
router.get("/", handleInvite);

export default router;
