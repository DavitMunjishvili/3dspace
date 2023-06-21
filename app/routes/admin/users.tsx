import { json } from "@remix-run/server-runtime";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/models/user.server";
import { prisma } from "~/db.server";

export async function action() {
  const users = await prisma.user.updateMany({
    data: {
      cart: '[{"name": "lastName"}]'
    }
  })

  return json(users)
}

export async function loader() {
  const users = await getUsers();
  return json(users);
}

export default function AdminUsers() {
  const users = useLoaderData<typeof loader>();

  return (
    <>
      <form method="post">
        <button
          className="px-3 py-2 my-2 bg-violet-300 rounded border border-violet-400"
          type="submit"
        >
          Reset carts for everyone
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Name</th>
            <th className="border border-gray-300 px-2 py-1">Last Name</th>
            <th className="border border-gray-300 px-2 py-1">Phone</th>
            <th className="border border-gray-300 px-2 py-1">Email</th>
            <th className="border border-gray-300 px-2 py-1">Role</th>
            <th className="border border-gray-300 px-2 py-1">Cart</th>
            <th className="border border-gray-300 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-2 py-1">{user.name}</td>
              <td className="border border-gray-300 px-2 py-1">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-2 py-1">{user.phone}</td>
              <td className="border border-gray-300 px-2 py-1">{user.email}</td>
              <td className="border border-gray-300 px-2 py-1">{user.role}</td>
              <td className="border border-gray-300 px-2 py-1">
                {JSON.parse(user?.cart || "[]").length}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <Link to={`delete/${user.id}`}>❌</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </>
  );
}
