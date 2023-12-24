import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  return json({
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  });
}

export default function Secrets() {
  const env = useLoaderData<typeof loader>();
  return (
    <div>
      <ul>
        <li>
          <span className="font-bold">DATABASE_URL:</span>{" "}
          <code>{env.DATABASE_URL}</code>
        </li>
        <li>
          <span className="font-bold">SESSION_SECRET:</span>{" "}
          <code>{env.SESSION_SECRET}</code>
        </li>
      </ul>
    </div>
  );
}
