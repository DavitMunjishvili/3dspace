import { Dialog } from "@headlessui/react";
import { Form, useNavigate } from "@remix-run/react";
import RichTextEditor from "~/components/RichTextEditor";
import { useEffect, useState } from "react";
import { type ActionArgs } from "@remix-run/node";
import { getUser } from "~/session.server";
import { addNewBlog } from "~/models/blog.server";
import { redirect } from "@remix-run/server-runtime";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title")!.toString();
  const content = formData.get("content")!.toString();
  const user = await getUser(request);

  await addNewBlog(title, content, user!.id);
  return redirect("/admin/blogs");
}

export default function NewBlog() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false);
  const closeDestination = "/admin/blogs";

  function validateForm() {
    if (title && content) return setValid(true);
    return setValid(false);
  }

  useEffect(validateForm, [content, title]);

  return (
    <Dialog
      open={true}
      onClose={() => navigate(closeDestination)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
        <Dialog.Panel className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-indigo-50 px-6 py-4">
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
          <Dialog.Title className="text-center text-2xl">New Blog</Dialog.Title>
          <Form method="post">
            <label
              htmlFor="name"
              className="mt-4 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              required
              autoFocus={true}
              value={title}
              name="title"
              id="name"
              onChange={(e) => setTitle(e.currentTarget.value)}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="mt-4 rounded bg-white p-4 shadow">
              <RichTextEditor
                content={content}
                setContent={setContent}
                viewer={false}
              />
            </div>
            <input name="content" value={content} readOnly hidden />
            <button
              type="submit"
              disabled={!valid}
              className="mt-4 block w-full rounded-md bg-indigo-500 py-2 text-indigo-50 duration-150 hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-50"
            >
              Add
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
