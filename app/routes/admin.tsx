import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { canAccess } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  if (await canAccess(request, true)) return json({});
  return redirect("/");
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  const pages = ["products", "blogs", "orders"];
  return (
    <div className="mx-auto mt-8 w-full max-w-7xl rounded-xl bg-indigo-50 px-8 py-8">
      <div className="mb-4 flex space-x-4 rounded-xl bg-indigo-900/50 p-1">
        {pages.map((page) => (
          <NavLink
            key={page}
            to={page}
            className={({ isActive }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 text-indigo-700 duration-75",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                isActive
                  ? "bg-white shadow"
                  : "text-indigo-100 hover:bg-indigo-50/[0.12] hover:text-indigo-50"
              )
            }
          >
            {page}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
