import type { Blog, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getBlogById(id: Blog["id"]) {
  return prisma.blog.findUnique({ where: { id } });
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
