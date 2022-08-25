import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import mainStylesheetUrl from "./styles/index.css";
import { getUser } from "./session.server";
import Header from "./components/Header";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: mainStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "3D Space",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-8 rounded-xl bg-indigo-50 p-8 text-center shadow-xl">
            <h1 className="text-2xl">
              Oops, we encountered a{" "}
              <span className="font-bold">{caught.status}</span> error
            </h1>
            <h2 className="text-xl">
              which means page was{" "}
              <span className="font-bold">{caught.statusText}</span>
            </h2>
            <Link
              to="/"
              className="mt-4 block rounded-xl bg-indigo-500 py-2 text-center text-indigo-50 shadow-xl duration-150 hover:bg-indigo-600"
            >
              Go To Home
            </Link>
          </div>
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
