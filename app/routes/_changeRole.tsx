import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { updateUserRole } from "~/models/user.server";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) return redirect("/");
  return json({ id: user.id, role: user.role });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const role = formData.get("role") as string;
  if (!role || !id) return json({ errors: "No Data" });
  await updateUserRole(id, role);
  return json({});
}

export default function ChangeRole() {
  const { id, role } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto mt-16 w-96 rounded-xl bg-indigo-50 p-4">
      <p className="text-center text-2xl">Change Role</p>
      <p className="mb-2 bg-red-200 text-center">
        Current Role: <span className="font-bold">{role}</span>
      </p>
      <Form method="post" noValidate>
        <input required type="hidden" name="id" value={id} />
        <div className="flex flex-col">
          <input
            type="text"
            name="role"
            id="role"
            required
            className="border-0 border-b bg-transparent"
            placeholder="Type New Role"
          />
        </div>
        <button
          className="mt-4 w-full rounded-lg bg-indigo-500 p-4 text-indigo-50 duration-150 hover:bg-indigo-600"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
