import { Tab } from "@headlessui/react";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";
import { getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/");
  }
  return json({});
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  let [categories] = useState({
    Product: "<Product />",
    Users: "<Users />",
    Orders: "<Trending />",
  });

  return (
    <div className="mx-auto mt-8 w-full max-w-md rounded-xl bg-indigo-50 px-2 py-8 sm:px-8 md:max-w-7xl">
      <Tab.Group>
        <Tab.List className="flex space-x-4 rounded-xl bg-indigo-900/50 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-indigo-100 hover:bg-indigo-50/[0.12] hover:text-indigo-50"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2"
              )}
            >
              <div>{posts}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
