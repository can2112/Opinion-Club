"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icart } from "@/utils/Interfaces/common";

export function CarouselPlugin({ data }: { data: Icart[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        {data?.map((res: Icart, index: number) => {
          const url = `market/${encodeURIComponent(res.title)}?mId=${
            res.questionId
          }`;
          return (
            <CarouselItem key={index} className="basis-[88%] md:basis-[95%]">
              <Card>
                <CardContent
                  className={`flex overflow-hidden  aspect-square relative rounded-lg h-44 md:h-72  w-full items-center justify-center p-6 ${
                    index % 2 ? "bg-black" : "bg-red-500"
                  } text-white`}
                >
                  <div className="w-full ">
                    <section className="flex justify-between w-full gap-2 items-center">
                      <div>
                        <h1 className="font-bold text-xl w-[65%]">
                          {res?.title}
                        </h1>
                        <Button
                          variant="outline"
                          className="text-black  font-bold rounded-2xl mt-6"
                        >
                          <Link href={url}> Trade Now</Link>
                        </Button>
                      </div>
                      <div className=" absolute -right-7 top-6 md:top-11 h-full">
                        <Image
                          src={res?.image}
                          alt={"market_image"}
                          width={200}
                          height={200}
                          className="w-full h-[130px] md:h-[200px] max-w-[150px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] rounded-l-full border-4 border-[#473C3C]/60 object-cover "
                        />
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
