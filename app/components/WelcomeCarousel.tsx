import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export default function WelcomeCarousel() {
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", loop: true }, [Autoplay({
    delay: 5000
  })]);

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
    <div className="relative w-11/12 ml-auto">
      <div className="relative z-10 overflow-hidden rounded-bl-[10rem] shadow-purple-900 shadow-xl" ref={emblaRef}>
        <div className="flex flex-col h-[36rem]">
          <div className="flex-[0_0_100%] flex items-center justify-center bg-purple-950 text-purple-50 text-2xl">
            Our models
          </div>
          <div className="flex-[0_0_100%] flex items-center justify-center bg-purple-950 text-purple-50 text-2xl">
            Custom models
          </div>
          <div className="flex-[0_0_100%] flex items-center justify-center bg-purple-950 text-purple-50 text-2xl">
            B2B
          </div>
        </div>
      </div>
      <ul className="absolute z-20 right-2 top-1/2 -translate-y-1/2">
        {scrollSnaps.map((_, index) =>
          <li key={index}
              onClick={() => scrollTo(index)}
              className={`w-1.5 opacity-50 cursor-pointer h-12 my-1 rounded-full ${index === selectedIndex ? "bg-indigo-50" : "bg-indigo-500"}`}>
          </li>
        )}
      </ul>
    </div>
  );
}