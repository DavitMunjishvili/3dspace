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
  useNavigate,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import mainStylesheetUrl from "./styles/index.css";
import { getUser } from "./session.server";
import Navbar from "./components/Navbar";
import Footer from "~/components/Footer";
import Button from "./components/common/Button";

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
        <title>3D Space</title>
      </head>
      <body>
        <Navbar />
        <div className="min-h-[calc(100dvh-4rem)]">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const navigate = useNavigate();

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
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
            <div className="mt-4 flex gap-2">
              <Button onClick={() => navigate(-1)}>უკან დაბრუნება</Button>
              <Button onClick={() => navigate("/")}>
                მთავარ გვერდზე დაბრუნება
              </Button>
            </div>
          </div>
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
