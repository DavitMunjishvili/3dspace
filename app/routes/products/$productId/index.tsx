import { json, redirect } from "@remix-run/server-runtime";
import { useLoaderData, useNavigate } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/server-runtime";

import { getProductById } from "~/models/product.server";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { getProductThumbnail } from "~/filesystem.server";
import { generateProductColor, useOptionalUser } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  if (!params || !params?.productId) {
    return redirect("/products");
  }
  const productInfo = await getProductById(parseInt(params.productId));
  if (!productInfo) return redirect("/products");
  const productImages = await getProductThumbnail(parseInt(params.productId));

  // GUIDE If you want to get all images use this code snippet:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // const productImages = getProductImages(params.productId);
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

  if (productImages.error || !productImages.publicURL) {
    console.error(productImages.error);
    return redirect("/products");
  }
  return json({
    // images: productImages.images,
    images: [productImages.publicURL],
    product: productInfo,
    // availableSizes: ["Small", "Standard", "Large"] as const,
    availableColors: ["yellow", "red", "green", "black"] as const,
  });
}

export default function ProductPage() {
  const { images, product, availableColors } = useLoaderData<typeof loader>();
  const [selectedColor, setSelectedColor] =
    useState<(typeof availableColors)[number]>("black");
  const user = useOptionalUser();
  const navigate = useNavigate();

  const addToCart = () => {
    if (user) {
      fetch(`/cart/add/${product.id}?color=${selectedColor}`).then((response) =>
        console.log(response.statusText)
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-indigo-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 sm:grid-cols-2 sm:px-4">
        <div>
          {images &&
            images.length > 0 &&
            images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                className="aspect-square w-full rounded-lg object-cover"
                alt={product.name}
              />
            ))}
        </div>
        <div className="flex flex-col space-y-8">
          {/* Name */}
          <p className="text-3xl">{product.name}</p>

          {/* Price */}
          <p className="text-lg">
            Price:{" "}
            {product.currentPrice ? (
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

          {/* Colors */}
          <div>
            Color: <span className="font-bold">{selectedColor}</span>
            <RadioGroup value={selectedColor} onChange={setSelectedColor}>
              <RadioGroup.Label className="sr-only">Color</RadioGroup.Label>
              <div className="mt-2 flex gap-2">
                {availableColors.map((color) => (
                  <RadioGroup.Option
                    key={color}
                    value={color}
                    className={({ checked }) =>
                      `
                  ${checked ? "outline-none" : "outline-1 outline-offset-2 "}
                    flex cursor-pointer outline-indigo-900 ${generateProductColor(
                        color
                      )} rounded-full border border-black/50 p-3 shadow-md`
                    }
                  ></RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          <p className="border-b border-t border-neutral-300/50 py-4">
            {product.description}
          </p>
          <div>
            <button
              onClick={addToCart}
              className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-indigo-50 shadow-md duration-150 hover:bg-indigo-600"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
