import { json } from "@remix-run/server-runtime";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/models/user.server";

export async function loader() {
  const users = await getUsers();
  return json(users);
}

export default function AdminUsers() {
  const users = useLoaderData<typeof loader>();

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">ID</th>
            <th className="border border-gray-300 px-2 py-1">Name</th>
            <th className="border border-gray-300 px-2 py-1">Last Name</th>
            <th className="border border-gray-300 px-2 py-1">Phone</th>
            <th className="border border-gray-300 px-2 py-1">Email</th>
            <th className="border border-gray-300 px-2 py-1">Role</th>
            <th className="border border-gray-300 px-2 py-1">Cart</th>
            <th className="border border-gray-300 px-2 py-1">Registered at</th>
            <th className="border border-gray-300 px-2 py-1">
              Last Changed at
            </th>
            <th className="border border-gray-300 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-2 py-1">{user.id}</td>
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
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {new Date(user.updatedAt).toLocaleString()}
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
