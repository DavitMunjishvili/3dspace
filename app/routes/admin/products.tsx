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
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300">Name</th>
              <th className="border border-gray-300">Description</th>
              {/* FIX confirm column naming */}
              <th className="border border-gray-300">Original Price</th>
              <th className="border border-gray-300">Current Price</th>
              <th className="border border-gray-300">Categories</th>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={product.archive ? "bg-red-100" : "bg-green-100"}
              >
                <td className="border border-gray-300 px-2 py-1">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {product.originalPrice}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {product.currentPrice}
                </td>

                <td className="border border-gray-300 px-2 py-1">
                  <ul className="list-inside list-disc">
                    {product.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                </td>

                <td className="border border-gray-300 px-2 py-1">
                  <Link
                    to={`edit/${product.id}`}
                    className="flex justify-center text-indigo-800 duration-150 hover:text-indigo-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center gap-2 text-xl">
          No Products Found 😨 Add new product?
          <Link
            to="new"
            className="block rounded-md bg-green-400 p-0.5 text-green-900 duration-150 hover:bg-green-500"
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
