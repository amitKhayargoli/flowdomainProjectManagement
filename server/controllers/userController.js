import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);

    if (!body?.username || !body?.email || !body?.password) {
      return res.status(500).send({ message: "Invalid" });
    }

    const users = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    res.status(201).send({ data: users, message: "successfully created user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to create user" });
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
