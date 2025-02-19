import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcryptjs";

export const create = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    console.log(req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Store hashed password
      },
    });

    res.status(201).json({ data: users, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;

    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: body,
    });

    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send({ message: "User not found" });
    }
    console.log(error);
    res.status(500).json({ error: "failed to update the user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await prisma.user.delete({
      where: { id: Number(userId) },
    });

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send({ message: "User not found" });
    }
    console.log(error);
    res.status(500).json({ error: "failed to delete user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch user" });
  }
};
