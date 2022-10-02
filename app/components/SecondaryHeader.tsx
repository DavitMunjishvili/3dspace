import { Link } from "@remix-run/react";

export default function SecondaryHeader() {
  return (
    <header className="h-16 w-full bg-indigo-900 text-indigo-50">
      <div className="mx-2 flex h-full max-w-7xl items-center gap-x-4 p-2 xl:mx-auto">
        <Link
          to="/products/sale"
          className="rounded-sm px-2 py-1 font-bold uppercase duration-150 hover:bg-indigo-800"
        >
          Sale
        </Link>
        <Link
          to="/service"
          className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-800"
        >
          Service
        </Link>
        <Link
          to="/suggest-gift"
          className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-800"
        >
          Suggest Gift
        </Link>
      </div>
    </header>
  );
}
