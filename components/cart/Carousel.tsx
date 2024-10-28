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
      <CarouselContent>
        {data?.map((res: Icart, index: number) => {
          const url = `market/${encodeURIComponent(res.title)}?mId=${
            res.questionId
          }`;
          return (
            <CarouselItem key={index}>
              <Card>
                <CardContent
                  className={`flex aspect-square rounded-lg h-44 md:h-full  w-full items-center justify-center p-6 ${
                    index % 2 ? "bg-black" : "bg-red-400"
                  } text-white`}
                >
                  <div className="w-full">
                    <section className="flex justify-between w-full gap-2 items-center">
                      <h1>{res.title}</h1>
                      <div className="overflow-hidden  rounded-lg max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[300px]">
                        <Image
                          src={res?.image}
                          alt={"market_image"}
                          width={80}
                          height={80}
                          className="w-full h-auto max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[300px] rounded-lg object-cover"
                          layout="responsive"
                        />
                      </div>
                    </section>
                    <Button
                      variant="outline"
                      className="text-black rounded-2xl mt-6"
                    >
                      <Link href={url}> Trade Now</Link>
                    </Button>
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
