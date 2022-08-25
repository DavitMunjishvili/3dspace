import type { Product } from "@prisma/client";
import { Link } from "@remix-run/react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative isolation-auto rounded-xl p-4 text-indigo-50 duration-150 hover:scale-105 hover:bg-indigo-50 hover:text-indigo-900"
    >
      <img
        src={`https://picsum.photos/seed/${product.name}/200/500`}
        className="relative -z-10 aspect-square w-full rounded-lg object-cover"
        alt={product.name}
      />
      <p className="mt-2 text-center text-lg">{product.name}</p>
      <p className="mt-2 text-center text-lg">
        {product.originalPrice ? (
          <>
            {product.currentPrice + "₾"}{" "}
            <span className="text-sm text-red-500 line-through">
              {product.originalPrice + "₾"}
            </span>
          </>
        ) : (
          product.originalPrice + "₾"
        )}
      </p>
      {/* <div className="absolute left-0 bottom-0 block w-full rounded-b-xl bg-indigo-50 p-4 opacity-0 duration-150 group-hover:translate-y-14 group-hover:opacity-100">
        <button className="mx-auto block rounded-lg bg-indigo-500 px-6 py-2 duration-150 hover:bg-indigo-600 focus:bg-indigo-400 group-hover:text-indigo-50">
          Add to cart
        </button>
      </div> */}
    </Link>
  );
}
