import { json, redirect } from "@remix-run/server-runtime";
import { useLoaderData, useNavigate } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/server-runtime";

import { getProductById } from "~/models/product.server";
import { useCallback, useEffect, useState } from "react";
import { getProductImages } from "~/filesystem.server";
import { useOptionalUser } from "~/utils";
import ProductColorPicker, {
  type ColorOptionType,
} from "~/components/ProductPage/ColorPicker";
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export async function loader({ params }: LoaderArgs) {
  if (!params || !params?.productId) {
    return redirect("/products");
  }

  const productInfo = await getProductById(Number(params.productId));
  if (!productInfo) return redirect("/products");

  // const productImages = await getProductThumbnail(params.productId);
  const productImages = await getProductImages(params.productId);

  return json({
    images: productImages,
    product: productInfo,
  });
}

export default function ProductPage() {
  const { images, product } = useLoaderData<typeof loader>();
  const [color, setColor] = useState<ColorOptionType | null>(null);
  const user = useOptionalUser();
  const navigate = useNavigate();

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 7000 }),
  ]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const addToCart = () => {
    if (user) {
      fetch(`/cart/add/${product.id}?color=${color}`).then((response) =>
        console.log(response.statusText)
      );
    } else {
      navigate("/login");
    }
  };

  const isFormValid = !!color;

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-indigo-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 sm:grid-cols-2 sm:px-4">
        <div className="relative">
          <div className="relative z-10 overflow-hidden" ref={emblaRef}>
            <div className="flex h-[32rem]">
              {images &&
                images.length > 0 &&
                images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    className="mr-2 w-full rounded-lg object-contain"
                    alt={product.name}
                  />
                ))}
            </div>
          </div>
          <ul className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {scrollSnaps.map((_, index) => (
              <li
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-8 cursor-pointer rounded-full border border-indigo-900 opacity-80 transition-colors duration-150 ${
                  index === selectedIndex ? "bg-indigo-200" : "bg-indigo-500"
                }`}
              ></li>
            ))}
          </ul>
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

          <ProductColorPicker value={color} onChange={setColor} />

          <p className="border-b border-t border-neutral-300/50 py-4">
            {product.description}
          </p>
          <div>
            <button
              onClick={addToCart}
              disabled={!isFormValid}
              className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-indigo-50 shadow-md duration-150 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              კალათაში დამატება
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
