import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCurrentUserProjectTeams = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find the current user's projects
    const userProjects = await prisma.projectTeam.findMany({
      where: {
        userId: userId,
      },
      include: {
        project: true,
      },
    });

    if (!userProjects || userProjects.length === 0) {
      return res
        .status(404)
        .json({ error: "No project teams found for this user" });
    }

    const projectIds = userProjects.map((team) => team.project.id);

    //Get users related to the same project
    const projectTeams = await prisma.projectTeam.findMany({
      where: {
        projectId: { in: projectIds },
      },
      include: {
        project: true,
        user: true,
      },
    });

    if (!projectTeams || projectTeams.length === 0) {
      return res
        .status(404)
        .json({ error: "No project teams found for these projects" });
    }

    return res.status(200).json(projectTeams);
  } catch (error) {
    console.error("Error fetching current user's project teams:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch current user's project teams" });
  }
};
