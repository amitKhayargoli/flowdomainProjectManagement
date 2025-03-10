import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        comments: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error fetching tasks: ${error.message}` });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch tasks that belong to projects where the user is a team member
    const tasks = await prisma.task.findMany({
      where: {
        project: {
          projectTeams: {
            some: {
              userId: userId,
            },
          },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error fetching tasks: ${error.message}` });
  }
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
      include: {
        comments: true,
      },
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: `Error fetching task: ${error.message}` });
  }
};

export const createTask = async (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    fileURL,
    projectId,
  } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        fileURL,
        projectId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: `Error creating task: ${error.message}` });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  console.log(`Task ID: ${taskId}, Status: ${status}`);

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, startDate, dueDate, fileURL } =
    req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        title,
        description,
        priority,
        startDate,
        dueDate,
        fileURL,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await prisma.task.delete({
      where: {
        id: Number(taskId),
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: `Error deleting task: ${error.message}` });
  }
};
