import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const getProjects = async (req, res) => {
//   try {
//     const projects = await prisma.project.findMany(

//     );
//     res.json(projects);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error fetching projects: ${error.message}` });
//   }
// };

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

    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching projects: ${error.message}` });
  }
};

// export const createProject = async (req, res) => {
//   const { name, description, startDate, endDate, coverURL } = req.body;

//   try {
//     const newProject = await prisma.project.create({
//       data: {
//         name,
//         description,
//         startDate,
//         endDate,
//         coverURL,
//       },
//     });

//     res.status(201).json(newProject);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error creating project: ${error.message}` });
//   }
// };

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
