import React from "react";
import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";
import { CiDollar } from "react-icons/ci";

import { formatDate } from "@/utils/common/formatDate";

interface CartProp {
  title: string;
  eventId: string;
  image: string;
  endDate?: Date;
  vol?: string;
  liqudity: string;
}

function Cart({ title, eventId, image, endDate, vol, liqudity }: CartProp) {
  const dynamicRoute = `market/${encodeURIComponent(title)}?mId=${eventId}`;
  const defaultImage =
    "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Fus-election-tipping-point-state-QaKzIk2CFwii.png&w=96&q=75";

  return (
    <Link
      className=" bg-gray-400/20 relative px-5   flex flex-col rounded-lg shadow-[0_1px_10px_rgb(26,213,199)] cursor-pointer h-60 font-sans hover:bg-gray-300/30"
      href={dynamicRoute}
    >
      <div className="py-4 flex justify-end">
        <section className="text-white gap-2 flex rounded items-center border-dashed border px-2">
          <span className="w-2 h-2 animate-pulse bg-red-500 rounded-full" />
          <p>ENDS ON {formatDate(endDate)}</p>
        </section>
      </div>

      <div className=" py-3">
        <section className="overflow-hidden items-center  gap-2 flex  ">
          <Image
            src={image || defaultImage}
            width={80}
            height={120}
            alt="martket"
            className="rounded-lg"
          />
          <div className="text-sm ">
            <p className=" font-mono flex-1 w-full">{title}</p>
            <section className="flex justify-between mt-2">
              <p className="flex items-center gap-2 text-customPrimary">
                Liquidity: {liqudity} <CiDollar color="#1ad5c7" />
              </p>
              <p className="flex gap-2">
                TRADES:<span>{vol}</span>
              </p>
            </section>
          </div>
        </section>
        <div className="flex gap-3 absolute bottom-4  w-[95%] px-2 left-2  justify-between items-center  mt-7  font-mono">
          <section className="w-full flex gap-4">
            <Button
              // click={() => console.log("")}
              text={"Yes"}
              style="bg-green-500    hover:bg-green-400"
            />
            <Button
              // click={() => console.log("")}
              text={"No"}
              style="bg-red-500 w-full  hover:bg-red-400"
            />
          </section>
        </div>
      </div>
    </Link>
  );
}

export default Cart;
