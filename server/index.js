import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRouter from "./routes/authRoute.js";
import uploadRouter from "./routes/uploadRoutes.js";
import userRouter from "./routes/userRoute.js";
import { authenticateToken } from "./middleware/token-middleware.js";
import { createUploadsFolder } from "./security/helper.js";
import inviteRouter from "./routes/inviteRoute.js";
import projectTeamRoutes from "./routes/projecTeamRoute.js";
import blogRoutes from "./routes/blogRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use("/uploads", express.static("uploads"));
createUploadsFolder();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

console.log(process.env.PORT);

// Routes
app.get("/", (req, res) => {
  res.send("This is the home route");
});

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/blog", blogRoutes);
app.use(authenticateToken);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/file", uploadRouter);
app.use("/invite", inviteRouter);
app.use("/api/team", projectTeamRoutes);

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next();
});

// Server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export default app;
