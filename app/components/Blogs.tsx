import { type Blog } from "@prisma/client";
import BlogCard from "./BlogCard";

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  return (
    <section>
      <h1 className="mb-8 text-center text-4xl text-indigo-100">Our blogs</h1>
      <div className="space-y-8 px-4">
        {blogs.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>
    </section>
  );
}
