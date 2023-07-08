import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { BlogCard } from "~/components/Admin/BlogCard";

export async function loader() {
  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      archive: true,
      content: true,
      title: true,
      views: true,
    },
  });
  return json(blogs);
}

export default function Blogs() {
  const blogs = useLoaderData<typeof loader>();

  return (
    <>
      <Link
        to="new"
        className="mb-6 flex h-12 items-center justify-center rounded-md bg-green-400 text-xl text-green-900 duration-150 hover:bg-green-500"
      >
        Write new blog
      </Link>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <Outlet />
    </>
  );
}
