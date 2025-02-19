import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching projects: ${error.message}` });
  }
};

export const createProject = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating project: ${error.message}` });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;

  const { name, description, startDate, endDate } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating project: ${error.message}` });
  }
};
