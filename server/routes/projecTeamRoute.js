import express from "express";
import { getCurrentUserProjectTeams } from "../controllers/projectTeamcontroller.js";

const router = express.Router();

router.get("/", getCurrentUserProjectTeams);

export default router;
