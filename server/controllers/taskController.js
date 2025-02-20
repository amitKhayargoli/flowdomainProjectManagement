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
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
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
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
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
    points,
    projectId,
    authorUserId,
    assignedUserId,
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
        points,
        projectId,
        authorUserId,
        assignedUserId,
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

export const getTaskComments = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await prisma.taskComment.findMany({
      where: {
        taskId: Number(taskId),
      },
      include: {
        author: true,
      },
    });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching comments: ${error.message}` });
  }
};

export const createTaskComment = async (req, res) => {
  const { taskId } = req.params;
  const { content, authorUserId } = req.body;

  try {
    const comment = await prisma.taskComment.create({
      data: {
        content,
        taskId,
        authorUserId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating comment: ${error.message}` });
  }
};

export const updateTaskComment = async (req, res) => {
  const { taskId, commentId } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await prisma.taskComment.update({
      where: {
        taskId: Number(taskId),
        id: Number(commentId),
      },
      data: {
        content: content,
      },
    });
    res.json(updatedComment);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res
      .status(500)
      .json({ message: `Error updating comment: ${error.message}` });
  }
};

export const deleteTaskComment = async (req, res) => {
  const { taskId, commentId } = req.params;

  try {
    await prisma.taskComment.delete({
      where: {
        taskId: Number(taskId),
        id: Number(commentId),
      },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting comment: ${error.message}` });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    attachments,
  } = req.body;

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
        // comments,
        // attachments,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};
