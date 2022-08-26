import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { getAllProduct } from "~/models/product.server";

export async function loader() {
  const products = await getAllProduct();
  return json(products);
}

export default function AdminProducts() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="relative">
      {products.length ? (
        <table></table>
      ) : (
        <div className="flex items-center justify-center gap-2 text-xl">
          No Products Found 😨 Add new product?
          <Link
            to="new"
            className="block rounded-md bg-green-400 p-1 text-green-900 duration-150 hover:bg-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m7-7H5"
              />
            </svg>
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  );
}
