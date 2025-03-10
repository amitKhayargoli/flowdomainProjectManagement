import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import request from "supertest";
import express from "express";
import projectRoute from "../routes/projectRoutes";
import * as projectController from "../controllers/projectController";
import { authenticateToken } from "../middleware/token-middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/projects", authenticateToken, projectRoute);

jest.mock("../controllers/projectController");

const generateToken = (payload) => {
  const options = { expiresIn: process.env.expiresIn };
  return jwt.sign(payload, process.env.secretkey, options);
};

const mockUserPayload = {
  userId: 1,
  username: "Amit",
  email: "amit@gmail.com",
  role: "user",
};
const mockToken = generateToken(mockUserPayload);

describe("Project Routes", () => {
  it("should get all projects for a user", async () => {
    const projects = [
      {
        projectId: 1,
        title: "Test Project",
        description: "Test Project Description",
        status: "In Progress",
        userId: 1,
        categoryId: 1,
      },
    ];

    projectController.getProjects.mockResolvedValue(projects);

    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ projects });
  });

  it("should get all projects for admin", async () => {
    const allProjects = [
      {
        projectId: 1,
        title: "All Test Project",
        description: "All Test Project Description",
        status: "Completed",
        userId: 1,
        categoryId: 1,
      },
    ];

    projectController.getAllProjects.mockResolvedValue(allProjects);

    const response = await request(app)
      .get("/projects/all")
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ projects: allProjects });
  });

  it("should create a new project", async () => {
    const newProject = {
      title: "New Project",
      description: "New Project Description",
      status: "Pending",
      userId: 1,
      categoryId: 1,
    };

    projectController.createProject.mockResolvedValue(newProject);

    const response = await request(app)
      .post("/projects/create")
      .set("Authorization", `Bearer ${mockToken}`)
      .send(newProject);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: newProject,
      message: "Project created successfully",
    });
  });

  it("should delete a project", async () => {
    projectController.deleteProject.mockResolvedValue(1);

    const response = await request(app)
      .delete("/projects/delete/1")
      .set("Authorization", `Bearer ${mockToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Project deleted successfully" });
  });
});
