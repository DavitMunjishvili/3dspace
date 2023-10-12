import type { Blog } from "@prisma/client";

export default function Blogs({ blogs }: {
  blogs: Blog[]
}) {
  return (
    <section>
      <h1 className="mb-8 text-center text-4xl text-indigo-100">Our blogs</h1>
      <div className="space-y-8 px-4">
        {blogs.map((blog) => (
          <article key={blog.id} className="prose mx-auto max-w-6xl rounded-xl bg-indigo-300 p-4">
            <header>
              <h1 className="mb-8 text-5xl">
                {blog.title}
                <span className="ml-4 align-middle text-xl font-light text-gray-500">
                  {new Date(blog.updatedAt).toLocaleDateString("ka-GE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </h1>
            </header>
            <main dangerouslySetInnerHTML={{ __html: blog.content }}></main>
          </article>
        ))}
      </div>
    </section>
  );
}
