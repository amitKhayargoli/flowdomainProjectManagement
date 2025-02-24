const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const addMemberToProject = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    if (!projectId || !userId) {
      return res
        .status(400)
        .json({ error: "Project ID and User ID are required" });
    }

    const projectTeamMember = await prisma.projectTeam.create({
      data: {
        userId,
        projectId,
      },
    });

    return res.status(201).json(projectTeamMember);
  } catch (error) {
    console.error("Error adding member to project:", error);
    return res.status(500).json({ error: "Failed to add member to project" });
  }
};

const removeMemberFromProject = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    if (!projectId || !userId) {
      return res
        .status(400)
        .json({ error: "Project ID and User ID are required" });
    }

    const projectTeamMember = await prisma.projectTeam.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    return res.status(200).json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Error removing member from project:", error);
    return res
      .status(500)
      .json({ error: "Failed to remove member from project" });
  }
};

module.exports = {
  addMemberToProject,
  removeMemberFromProject,
};
