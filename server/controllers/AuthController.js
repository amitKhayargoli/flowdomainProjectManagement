import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

import { generateToken } from "../security/jwt-util.js";

// export const login = async (req, res) => {
//   try {
//     //fetching all the data from users table
//     if (req.body.email == null) {
//       return res.status(500).send({ message: "email is required" });
//     }
//     if (req.body.password == null) {
//       return res.status(500).send({ message: "password is required" });
//     }
//     const user = await prisma.user.findOne({
//       where: { email: req.body.email },
//     });
//     if (!user) {
//       return res.status(500).send({ message: "user not found" });
//     }
//     if (user.password == req.body.password) {
//       const token = generateToken({ user: user.toJSON() });
//       return res.status(200).send({
//         data: { access_token: token, role: user.role, userId: user.userId },
//         message: "successfully logged in",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ error: "Failed to login" });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id, role: user.role });

    return res.status(200).send({
      data: { access_token: token, role: user.role, userId: user.id },
      message: "Successfully logged in",
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res.status(201).send({
      data: user,
      message: "successfully fetched current user",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
