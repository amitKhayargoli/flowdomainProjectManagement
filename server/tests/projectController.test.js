import { PrismaClient } from "@prisma/client";
import {
  getProjects,
  createProject,
  getProjectbyId,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    project: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe("Project Controller", () => {
  const prisma = new PrismaClient();

  test("should get all projects", async () => {
    const mockProjects = [
      {
        id: 22,
        name: "Spotify Web design",
        description: "Spotify Website Design",
      },
      {
        id: 23,
        name: "Travel Website Design",
        description: "Travel Website Design with Figma",
      },
    ];
    prisma.project.findMany.mockResolvedValue(mockProjects);

    const req = { user: { userId: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ projects: mockProjects });
  });

  // Test getAllProjects function (Admin only)
  test("should get all projects if user is admin", async () => {
    const mockProjects = [
      {
        id: 22,
        name: "Spotify Web design",
        description: "Spotify Website Design",
      },
      {
        id: 23,
        name: "Travel Website Design",
        description: "Travel Website Design with Figma",
      },
    ];

    prisma.project.findMany.mockResolvedValue(mockProjects);

    const req = { user: { role: "admin" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ projects: mockProjects });
  });

  test("should return 403 if user is not admin", async () => {
    const req = { user: { role: "user" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllProjects(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Access denied. Admins only.",
    });
  });

  // Test createProject function
  test("should create a new project", async () => {
    const newProject = {
      name: "New Project",
      description: "Description of new project",
      startDate: new Date(),
      endDate: new Date(),
      coverURL: "http://example.com/cover.jpg",
    };

    const mockCreatedProject = {
      ...newProject,
      id: 1,
    };

    prisma.project.create.mockResolvedValue(mockCreatedProject);

    const req = { body: newProject, userId: 1 };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreatedProject);
  });

  // Test updateProject function
  test("should update an existing project", async () => {
    const updatedProject = {
      id: 1,
      name: "Updated Project",
      description: "Updated description",
      startDate: new Date(),
      endDate: new Date(),
      coverURL: "http://example.com/updated-cover.jpg",
    };

    prisma.project.update.mockResolvedValue(updatedProject);

    const req = {
      params: { projectId: "1" },
      body: updatedProject,
    };
    const res = {
      json: jest.fn(),
    };

    await updateProject(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedProject);
  });

  // Test deleteProject function
  test("should delete an existing project", async () => {
    prisma.project.delete.mockResolvedValue({});

    const req = {
      params: { projectId: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await deleteProject(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  // Test getProjectbyId function
  test("should get project by id", async () => {
    const mockProject = {
      id: 1,
      name: "Project 1",
      description: "Description 1",
    };

    prisma.project.findUnique.mockResolvedValue(mockProject);

    const req = { params: { id: "1" } };
    const res = {
      json: jest.fn(),
    };

    await getProjectbyId(req, res);

    expect(res.json).toHaveBeenCalledWith(mockProject);
  });

  test("should return 404 if project not found", async () => {
    prisma.project.findUnique.mockResolvedValue(null);

    const req = { params: { id: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getProjectbyId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Project not found" });
  });
});
