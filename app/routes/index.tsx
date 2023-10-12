import { type Blog } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Blogs from "~/components/Blogs";
import WelcomeCarousel from "~/components/WelcomeCarousel";
import { getBlogs } from "~/models/blog.server";

export async function loader() {
  const blogs = await getBlogs();
  return json({ blogs });
}

export default function Index() {
  const { blogs } = useLoaderData<typeof loader>();

  return (
    <main className="space-y-64">
      <WelcomeCarousel />
      {blogs.length > 0 && <Blogs blogs={blogs as Blog[]} />}
    </main>
  );
}
