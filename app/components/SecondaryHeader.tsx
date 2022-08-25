import { Link } from "@remix-run/react";

export default function SecondaryHeader() {
  return (
    <header className="h-16 w-full bg-indigo-50">
      <div className="mx-2 flex h-full max-w-7xl items-center gap-x-4 p-2 xl:mx-auto">
        <Link
          to="/sales"
          className="rounded-sm px-2 py-1 font-bold uppercase duration-150 hover:bg-indigo-100"
        >
          Sale
        </Link>
        <Link
          to="/service"
          className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
        >
          Service
        </Link>
        <Link
          to="/suggest-gift"
          className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
        >
          Suggest Gift
        </Link>
      </div>
    </header>
  );
}
