import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBlog = (req, res) =>
  prisma.blog
    .create({
      data: req.body,
    })
    .then((blog) => res.status(201).json(blog))
    .catch((error) => res.status(400).json({ error }));

export const getBlogs = (req, res) =>
  prisma.blog
    .findMany()
    .then((blogs) => res.json(blogs))
    .catch((error) => res.status(400).json({ error }));

export const getBlogById = (req, res) =>
  prisma.blog
    .findUnique({
      where: { id: parseInt(req.params.id) },
    })
    .then((blog) => res.json(blog))
    .catch((error) => res.status(400).json({ error }));

// Update blog
export const updateBlog = (req, res) =>
  prisma.blog
    .update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    })
    .then((updatedBlog) => res.json(updatedBlog))
    .catch((error) => res.status(400).json({ error }));

// Delete blog
export const deleteBlog = (req, res) =>
  prisma.blog
    .delete({
      where: { id: parseInt(req.params.id) },
    })
    .then(() => res.status(204).send())
    .catch((error) => res.status(400).json({ error }));
