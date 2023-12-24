import { Dialog } from "@headlessui/react";
import { Form, useNavigate } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import CloseButton from "~/components/common/CloseButton";
import { deleteBlogById, getBlogById } from "~/models/blog.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.blogId, "Expected params.blogId");
  const blog = await getBlogById(parseInt(params.blogId));

  if (!blog) return redirect("/admin/blogs");
  return json(blog);
}

export async function action({ params }: ActionArgs) {
  invariant(params.blogId, "Expected params.blogId");
  await deleteBlogById(parseInt(params.blogId));
  return redirect("/admin/blogs");
}

export default function DeleteBlog() {
  const navigate = useNavigate();

  const closeDestination = "/admin/blogs";

  return (
    <Dialog
      open={true}
      onClose={() => navigate(closeDestination)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
        <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-indigo-50 px-6 py-4">
          <CloseButton
            className="absolute left-4 top-4"
            onClick={() => navigate(closeDestination)}
          />
          <Dialog.Title className="text-center text-2xl">
            Delete Blog
          </Dialog.Title>
          <Form method="post">
            <button
              type="submit"
              className={`mt-4 block w-full rounded-md bg-red-500 py-2 text-red-50 duration-150 hover:bg-red-600 disabled:bg-gray-400`}
            >
              Delete
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
