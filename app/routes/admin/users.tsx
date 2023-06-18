import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getUser } from "~/session.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  return json(user);
}
export default function AdminUsers() {
  const user = useLoaderData<typeof loader>();
  return <pre className="bg-red-500 p-4">{JSON.stringify(user, null, " ")}</pre>;
}
