import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";

import { generateProductColor } from "~/utils";
import CirclingLoader from "./Loaders/Circling";
import type { CartType } from "~/utils";

export default function CartProductCard({
  id,
  size,
  color,
  quantity,
}: {
  id: Product["id"];
  size: CartType[0]["size"];
  color: CartType[0]["color"];
  quantity: CartType[0]["quantity"];
}) {
  const [image, setImage] = useState<File>();
  const [details, setDetails] = useState<Product>();

  useEffect(() => {
    // Get Product Image
    fetch(`/products/${id}/image`)
      .then((response) => {
        if (response.ok) return response.json();
        throw response.statusText;
      })
      .then((data) => setImage(data))
      .catch((error) => console.error("ERROR", error));

    // Get Product Details
    fetch(`/products/${id}/details`)
      .then((response) => {
        if (response.ok) return response.json();
        throw response.statusText;
      })
      .then((data) => setDetails(data))
      .catch((error) => console.error("ERROR", error));
  }, [id]);

  if (!details) return <CirclingLoader />;
  return (
    <div className="flex items-center p-4">
      <img
        src={`data:image/jpeg;base64,${image}`}
        className="w-48 rounded-lg"
        alt={id}
      />
      <div className="flex flex-1 justify-between px-4">
        <div>
          <Link to={`/products/${id}`} className="text-2xl font-bold">
            {details?.name}
          </Link>
          <div className="mt-4 flex flex-col gap-4">
            <label htmlFor="quantity" className="flex items-center gap-2">
              <p>Quantity:</p>
              <select
                disabled
                value={quantity}
                name="quantity"
                id="quantity"
                className="appearance-none rounded-lg border bg-transparent px-4 py-1 focus:border-indigo-500 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-2">
              Color:
              <div
                className={`aspect-square w-6 cursor-pointer rounded-full shadow-md ${generateProductColor(
                  color
                )} `}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              Size:
              <div className="flex cursor-pointer rounded-lg border border-indigo-900 bg-indigo-500 px-2 py-1 text-indigo-50 shadow-md">
                {size}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xl font-bold">
          {details?.currentPrice ? (
            <>
              {details?.currentPrice + "₾"}{" "}
              <span className="text-sm font-normal text-red-500 line-through">
                {details?.originalPrice + "₾"}
              </span>
            </>
          ) : (
            details?.originalPrice + "₾"
          )}
        </p>
      </div>
    </div>
  );
}
