import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await prisma.project.findMany({
      where: {
        projectTeams: {
          some: {
            userId: userId,
          },
        },
      },
    });

    res.status(200).json({ projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching projects: ${error.message}` });
  }
};

//Admin only

export const getAllProjects = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const projects = await prisma.project.findMany();

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req, res) => {
  const { name, description, startDate, endDate, coverURL } = req.body;
  const userId = req.userId;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        coverURL,
        projectTeams: {
          create: [
            {
              userId,
            },
          ],
        },
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
  const { name, description, startDate, endDate, coverURL } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: {
        name,
        description,
        startDate,
        endDate,
        coverURL,
      },
    });

    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating project: ${error.message}` });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    await prisma.project.delete({
      where: { id: parseInt(projectId) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        projectTeams: true,
        projectInvites: true,
      },
    });
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching project: ${error.message}` });
  }
};
