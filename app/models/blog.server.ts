import type { Blog, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getBlogById(id: Blog["id"]) {
  return prisma.blog.findUnique({ where: { id } });
}

export async function updateBlogById(
  id: Blog["id"],
  title: Blog["title"],
  content: Blog["content"]
) {
  return prisma.blog.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}

export async function deleteBlogById(id: Blog["id"]) {
  return prisma.blog.delete({ where: { id } });
}

export async function addNewBlog(
  title: Blog["title"],
  content: Blog["content"],
  authorId: User["id"]
) {
  return prisma.blog.create({
    data: {
      title,
      content,
      authorId,
    },
  });
}
