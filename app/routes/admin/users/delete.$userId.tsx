import { Dialog } from "@headlessui/react";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { deleteUserById, getUserById } from "~/models/user.server";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderArgs) {
  invariant(params.userId, "Expected params.userId");
  const user = await getUserById(params.userId);

  if (!user) return redirect("/admin/users");
  return json(user);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")!.toString();
  const role = formData.get("role")!.toString();
  if (role === "dev") return redirect("/admin/users");
  await deleteUserById(id);
  return redirect("/admin/users");
}

export default function DeleteUser() {
  const navigate = useNavigate();
  const user = useLoaderData<typeof loader>();

  const closeDestination = "/admin/users";

  return (
    <Dialog
      open={true}
      onClose={() => navigate(closeDestination)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
        <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-indigo-50 px-6 py-4">
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
            Delete User
          </Dialog.Title>
          <Form method="post">
            <input type="hidden" name="id" value={user.id} />
            <button
              type="submit"
              disabled={user.role === "dev"}
              className={`mt-4 block w-full rounded-md bg-red-500 py-2 text-red-50 duration-150 hover:bg-red-600 disabled:bg-gray-400`}
            >
              {user.role === "dev" ? "You can't delete dev account" : "Delete"}
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
