import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import { generateToken } from "../security/jwt-util.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token including all user details
    const token = generateToken({
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePictureUrl: user.profilePictureUrl,
    });

    return res.status(200).send({
      data: { access_token: token, role: user.role, userId: user.userId },
      message: "Successfully logged in",
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const init = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = req.user;
    delete user.password;
    res
      .status(201)
      .send({ data: user, message: "successfully fetched current  user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
