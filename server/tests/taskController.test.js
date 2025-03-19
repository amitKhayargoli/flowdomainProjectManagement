import { PrismaClient } from "@prisma/client";
import {
  getTasks,
  getUserTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    task: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe("Task Controller", () => {
  const prisma = new PrismaClient();

  test("should get tasks for a specific project", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", description: "Task 1 description" },
      { id: 2, title: "Task 2", description: "Task 2 description" },
    ];

    prisma.task.findMany.mockResolvedValue(mockTasks);

    const req = { query: { projectId: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getTasks(req, res);

    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  test("should get tasks for a user", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", description: "Task 1 description" },
    ];

    prisma.task.findMany.mockResolvedValue(mockTasks);

    const req = { user: { userId: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getUserTasks(req, res);

    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  test("should return 404 if task not found", async () => {
    prisma.task.findUnique.mockResolvedValue(null);

    const req = { params: { taskId: "999" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getTaskById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });
  });

  test("should create a new task", async () => {
    const newTask = {
      title: "New Task",
      description: "Task description",
      status: "In Progress",
      priority: "High",
      tags: ["urgent"],
      startDate: new Date(),
      dueDate: new Date(),
      fileURL: "http://example.com/file.jpg",
      projectId: 1,
    };

    const mockCreatedTask = { ...newTask, id: 1 };

    prisma.task.create.mockResolvedValue(mockCreatedTask);

    const req = { body: newTask };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreatedTask);
  });

  test("should update task status", async () => {
    const updatedTask = {
      id: 1,
      title: "Updated Task",
      description: "Updated description",
      status: "Completed",
    };

    prisma.task.update.mockResolvedValue(updatedTask);

    const req = { params: { taskId: "1" }, body: { status: "Completed" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await updateTaskStatus(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedTask);
  });

  test("should delete a task", async () => {
    prisma.task.delete.mockResolvedValue({});

    const req = { params: { taskId: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test("should update an existing task", async () => {
    const updatedTask = {
      id: 1,
      title: "Updated Task",
      description: "Updated description",
      priority: "Medium",
      startDate: new Date(),
      dueDate: new Date(),
      fileURL: "http://example.com/updated-file.jpg",
    };

    prisma.task.update.mockResolvedValue(updatedTask);

    const req = {
      params: { taskId: "1" },
      body: updatedTask,
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await updateTask(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedTask);
  });
});
