import { Dialog } from "@headlessui/react";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { getBlogById, updateBlogById } from "~/models/blog.server";
import invariant from "tiny-invariant";
import RichTextEditor from "~/components/RichTextEditor";
import { useState } from "react";

export async function loader({ params }: LoaderArgs) {
  invariant(params.blogId, "Expected params.blogId");
  const blog = await getBlogById(parseInt(params.blogId));

  if (!blog) return redirect("/admin/users");
  return json(blog);
}

export async function action({ params, request }: ActionArgs) {
  invariant(params.blogId, "Expected params.blogId");
  const formData = await request.formData();
  const title = formData.get("title")!.toString();
  const content = formData.get("content")!.toString();
  await updateBlogById(parseInt(params.blogId), title, content);
  return redirect("/admin/blogs");
}

export default function DeleteUser() {
  const navigate = useNavigate();
  const blog = useLoaderData<typeof loader>();
  const [content, setContent] = useState(blog.content);
  const closeDestination = "/admin/blogs";

  return (
    <Dialog
      open={true}
      onClose={() => navigate(closeDestination)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
        <Dialog.Panel className="relative w-full max-w-5xl rounded-xl bg-indigo-50 px-6 py-4">
          <button
            onClick={() => navigate(closeDestination)}
            className="absolute left-4 top-4 rounded-md border-0 bg-red-300 p-0.5 text-white duration-150 hover:bg-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Dialog.Title className="text-center text-2xl">
            Update Blog
          </Dialog.Title>
          <Form method="post">
            <label
              htmlFor="title"
              className="mt-4 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              required
              autoFocus={true}
              type="text"
              name="title"
              id="title"
              defaultValue={blog.title}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="mt-4 rounded bg-white p-4 shadow">
              <RichTextEditor
                content={content}
                setContent={setContent}
                viewer={false}
              />
              <input name="content" value={content} readOnly hidden />
            </div>
            <button
              type="submit"
              className="mt-4 block w-full rounded-md bg-blue-500 py-2 text-blue-50 duration-150 hover:bg-blue-600 disabled:bg-gray-400"
            >
              Edit
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
