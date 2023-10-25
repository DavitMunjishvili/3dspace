import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { showFacebookDialog } from "~/utils";

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
          <div className="flex flex-[0_0_100%] flex-col items-center justify-center gap-2 bg-indigo-950 p-6 text-2xl text-indigo-50">
            <div className="flex w-full flex-1 items-stretch justify-center gap-4">
              <Link
                to="/products/lithophane"
                className="flex w-full flex-1 cursor-pointer items-center justify-center rounded-xl bg-indigo-900 duration-150 hover:text-3xl"
              >
                <h2>ლიტოფეინი</h2>
              </Link>
            </div>
          </div>
          <div className="flex flex-[0_0_100%] flex-col items-center justify-center gap-2 bg-indigo-950 p-6 text-2xl text-indigo-50">
            <h1>სპეციალური შეკვეთა</h1>
            <div className="flex w-full flex-1 items-stretch justify-center gap-4">
              <Link
                to="/products/custom"
                className="flex w-full flex-1 cursor-pointer items-center justify-center rounded-xl bg-indigo-900 duration-150 hover:text-3xl"
              >
                <h2>მაქვს ფაილი</h2>
              </Link>
              <div
                onClick={showFacebookDialog}
                className="flex w-full flex-1 cursor-pointer items-center justify-center rounded-xl bg-indigo-900 duration-150 hover:text-3xl"
              >
                <h2>დიზაინერის დახმარება მჭირდება</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-[0_0_100%] flex-col items-center justify-center gap-4 bg-indigo-950 text-2xl text-indigo-50">
            <h1 className="text-4xl">B2B</h1>
            <p className="max-w-3xl text-center text-lg">
              ჩვენ ვთანამშრომლობთ ბიზნესებთან თითქმის ყველა არსებულ სექტორში.
              ჩვენი სერვისები მოიცავს როგორც ფართო წარმოებას მოთხოვნის მიხედვით,
              ასევე უშუალოდ დიზაინების შექმნასა და წარმოებას. დეტალებისთვის
              მოგვწერეთ იმელზე ან დაგვირეკეთ ნომერზე, რომელიც მითითებულია
              მთავარი გვერდის ბოლოში.
            </p>
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
