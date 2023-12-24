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
import Button from "~/components/common/Button";
import CloseButton from "~/components/common/CloseButton";

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
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  // TODO: this needs to be change for <Form> component and /cart/add/ component
  const addToCart = async () => {
    setLoading(true);
    console.log(loading);
    if (user) {
      await fetch(`/cart/add/${product.id}?color=${color?.value}`);
      setAddedToCart(true);
    } else {
      navigate("/login");
    }
    setLoading(false);
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
          <button
            className="absolute left-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-indigo-900 bg-indigo-200/50 p-1 text-indigo-900 shadow backdrop-blur-sm duration-150 hover:bg-indigo-200"
            onClick={scrollPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            className="absolute right-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-indigo-900 bg-indigo-200/50 p-1 text-indigo-900 shadow backdrop-blur-sm duration-150 hover:bg-indigo-200"
            onClick={scrollNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
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
          {addedToCart && (
            <div className="flex items-center justify-between rounded-md bg-green-400 p-4">
              <p>პროდუქტი დაემატა კალათაში</p>
              <CloseButton onClick={() => setAddedToCart(false)} />
            </div>
          )}
          <div>
            <Button
              onClick={addToCart}
              loading={loading}
              disabled={!isFormValid}
            >
              კალათაში დამატება
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
