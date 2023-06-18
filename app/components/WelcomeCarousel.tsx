import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export default function WelcomeCarousel() {
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true }, [
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

  return (
    <div className="relative ml-auto w-11/12">
      <div
        className="relative z-10 overflow-hidden rounded-bl-[10rem] shadow-xl shadow-indigo-900"
        ref={emblaRef}
      >
        <div className="flex h-[36rem] flex-col">
          <div className="flex flex-[0_0_100%] items-center justify-center bg-indigo-950 text-2xl text-indigo-50">
            Our models
          </div>
          <div className="flex flex-[0_0_100%] items-center justify-center bg-indigo-950 text-2xl text-indigo-50">
            Custom models
          </div>
          <div className="flex flex-[0_0_100%] items-center justify-center bg-indigo-950 text-2xl text-indigo-50">
            B2B
          </div>
        </div>
      </div>
      <ul className="absolute right-2 top-1/2 z-20 -translate-y-1/2">
        {scrollSnaps.map((_, index) => (
          <li
            key={index}
            onClick={() => scrollTo(index)}
            className={`my-1 h-12 w-1.5 cursor-pointer rounded-full border border-indigo-950 opacity-50 transition-colors duration-300 ${
              index === selectedIndex ? "bg-indigo-50" : "bg-indigo-500"
            }`}
          ></li>
        ))}
      </ul>
    </div>
  );
}
