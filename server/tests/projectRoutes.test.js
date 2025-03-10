import request from "supertest";
import express from "express";
import projectRoute from "../routes/projectRoutes";
import * as projectController from "../controllers/projectController";
import { authenticateToken } from "../middleware/token-middleware";

const app = express();
app.use(express.json());
app.use("/projects", authenticateToken, projectRoute);

jest.mock("../controllers/projectController");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2LCJ1c2VybmFtZSI6IkFtaXQiLCJlbWFpbCI6ImFtaXQ5OUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVQaWN0dXJlVXJsIjpudWxsLCJpYXQiOjE3NDA0MDYzMDUsImV4cCI6MTc0MDY2NTUwNX0.Vpu3MYsTm8Mh934qb8r3gXxiY_AcrtOXWyIhCL3gasw";

describe("Project Routes", () => {
  it("should get all projects", async () => {
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
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: projects });
  });

  it("should get all projects (all route)", async () => {
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
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: allProjects });
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
      .set("Authorization", `Bearer ${token}`)
      .send(newProject);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: newProject,
      message: "Project created successfully",
    });
  });

  it("should get a project by ID", async () => {
    const project = {
      projectId: 1,
      title: "Test Project",
      description: "Test Project Description",
      status: "In Progress",
      userId: 1,
      categoryId: 1,
    };

    projectController.getProjectbyId.mockResolvedValue(project);

    const response = await request(app)
      .get("/projects/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: project });
  });

  it("should update a project", async () => {
    const updatedProject = {
      projectId: 1,
      title: "Updated Project",
      description: "Updated Project Description",
      status: "Completed",
      userId: 1,
      categoryId: 1,
    };

    projectController.updateProject.mockResolvedValue([1]); // [1] indicates one row updated

    const response = await request(app)
      .put("/projects/1")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedProject);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Project updated successfully",
    });
  });

  it("should delete a project", async () => {
    projectController.deleteProject.mockResolvedValue(1); // 1 indicates the project was deleted

    const response = await request(app)
      .put("/projects/delete/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Project deleted successfully" });
  });

  it("should return 404 if project not found", async () => {
    projectController.getProjectbyId.mockResolvedValue(null);

    const response = await request(app)
      .get("/projects/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Project not found" });
  });

  it("should return error if project creation fails", async () => {
    const newProject = {
      title: "New Project",
      description: "New Project Description",
      status: "Pending",
      userId: 1,
      categoryId: 1,
    };

    projectController.createProject.mockRejectedValue(
      new Error("Database Error")
    );

    const response = await request(app)
      .post("/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send(newProject);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to create project" });
  });
});
