import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const generateInviteToken = (projectId) => {
  const baseToken = crypto.randomBytes(8).toString("hex");
  const tokenData = JSON.stringify({ baseToken, projectId });
  return Buffer.from(tokenData).toString("base64");
};

export const generateInvite = async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    // Generate a secure token that includes projectId
    const token = generateInviteToken(projectId);
    const expiresAt = new Date(Date.now() + 3600 * 1000); // Token expires in 1 hour

    await prisma.projectInvite.create({
      data: {
        token,
        projectId,
        expiresAt,
      },
    });

    return res.status(200).json({
      token,
      expiresAt,
    });
  } catch (error) {
    console.error("Error generating invite token:", error);
    return res.status(500).json({ error: "Failed to generate invite token" });
  }
};

export const handleInvite = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }
  try {
    const decodedToken = Buffer.from(token, "base64").toString("utf-8");
    const { baseToken, projectId } = JSON.parse(decodedToken);
    const invite = await prisma.projectInvite.findUnique({
      where: { token },
      include: { project: true },
    });

    if (!invite || invite.projectId !== projectId) {
      return res.status(400).json({ error: "Invalid invite token" });
    }

    const now = new Date();
    if (invite.expiresAt < now) {
      return res.status(400).json({ error: "Invite token has expired" });
    }

    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Please sign in to join the project" }); //Err
    }

    const userInProject = await prisma.projectTeam.findFirst({
      where: {
        AND: [{ userId: userId }, { projectId: projectId }],
      },
    });

    if (userInProject) {
      return res
        .status(400)
        .json({ error: "User already a member of the project" });
    }

    await prisma.projectTeam.create({
      data: {
        userId,
        projectId,
      },
    });

    res.json({ message: "Successfully joined the project" });
  } catch (error) {
    console.error("Error handling invite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
