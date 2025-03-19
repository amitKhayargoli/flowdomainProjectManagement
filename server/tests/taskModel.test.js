const { PrismaClient } = require("@prisma/client");
const { mockDeep } = require("jest-mock-extended");

// Mock Prisma Client
const prisma = mockDeep(PrismaClient);

describe("Task Model Tests", () => {
  test("should create a new task", async () => {
    const mockTaskData = {
      title: "New Task",
      description: "Description of the new task",
      startDate: new Date(),
      dueDate: new Date(),
      projectId: 1, // Linking task to a project
      fileURL: "https://example.com/task-file.pdf",
    };

    // Mock the behavior of Prisma Client's create method
    prisma.task.create.mockResolvedValue({
      id: 1,
      ...mockTaskData,
    });

    const newTask = await prisma.task.create({
      data: mockTaskData,
    });

    // Assertions
    expect(newTask).toHaveProperty("id");
    expect(newTask.title).toBe("New Task");
    expect(newTask.description).toBe("Description of the new task");
    expect(newTask.fileURL).toBe("https://example.com/task-file.pdf");
  });

  test("should retrieve a task by ID", async () => {
    const mockTask = {
      id: 1,
      title: "Existing Task",
      description: "Description of the existing task",
      startDate: new Date(),
      dueDate: new Date(),
      projectId: 1, // Linked to a project
      fileURL: "https://example.com/existing-task-file.pdf",
    };

    // Mock the behavior of Prisma Client's findUnique method
    prisma.task.findUnique.mockResolvedValue(mockTask);

    const task = await prisma.task.findUnique({
      where: { id: 1 },
    });

    // Assertions
    expect(task).toHaveProperty("id", 1);
    expect(task.title).toBe("Existing Task");
    expect(task.description).toBe("Description of the existing task");
    expect(task.fileURL).toBe("https://example.com/existing-task-file.pdf");
  });

  test("should update a task", async () => {
    const updatedTaskData = {
      title: "Updated Task Title",
      description: "Updated task description",
      dueDate: new Date(),
    };

    // Mock the behavior of Prisma Client's update method
    prisma.task.update.mockResolvedValue({
      id: 1,
      ...updatedTaskData,
    });

    const updatedTask = await prisma.task.update({
      where: { id: 1 },
      data: updatedTaskData,
    });

    // Assertions
    expect(updatedTask.title).toBe("Updated Task Title");
    expect(updatedTask.description).toBe("Updated task description");
  });

  test("should delete a task", async () => {
    const mockTaskToDelete = {
      id: 1,
      title: "Task to Delete",
      description: "This task will be deleted",
    };

    // Mock the behavior of Prisma Client's delete method
    prisma.task.delete.mockResolvedValue(mockTaskToDelete);

    const deletedTask = await prisma.task.delete({
      where: { id: 1 },
    });

    // Assertions
    expect(deletedTask).toHaveProperty("id", 1);
    expect(deletedTask.title).toBe("Task to Delete");
  });

  test("should list all tasks for a specific project", async () => {
    const mockTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "Description of Task 1",
        projectId: 1,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description of Task 2",
        projectId: 1,
      },
    ];

    // Mock the behavior of Prisma Client's findMany method
    prisma.task.findMany.mockResolvedValue(mockTasks);

    const tasks = await prisma.task.findMany({
      where: { projectId: 1 },
    });

    // Assertions
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe("Task 1");
    expect(tasks[1].title).toBe("Task 2");
  });
});
