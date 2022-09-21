import { Link } from "@remix-run/react";
import { generateProductColor } from "~/utils";

import type { Product } from "@prisma/client";
import type { CartType } from "~/utils";

export default function CartProductCard({
  id,
  name,
  image,
  originalPrice,
  currentPrice,
  size,
  color,
  quantity,
}: {
  id: Product["id"];
  name: CartType[0]["name"];
  image: CartType[0]["image"];
  originalPrice: CartType[0]["originalPrice"];
  currentPrice: CartType[0]["currentPrice"];
  size: CartType[0]["size"];
  color: CartType[0]["color"];
  quantity: CartType[0]["quantity"];
}) {
  return (
    <div className="flex items-center p-4">
      <img
        src={`data:image/jpeg;base64,${image}`}
        className="w-48 rounded-lg"
        alt={name}
      />
      <div className="flex flex-1 justify-between px-4">
        <div>
          <Link to={`/products/${id}`} className="text-2xl font-bold">
            {name}
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
          {currentPrice ? (
            <>
              {currentPrice + "₾"}{" "}
              <span className="text-sm font-normal text-red-500 line-through">
                {originalPrice + "₾"}
              </span>
            </>
          ) : (
            originalPrice + "₾"
          )}
        </p>
      </div>
    </div>
  );
}
