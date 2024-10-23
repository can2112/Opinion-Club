import React from "react";
import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import { formatDate } from "@/utils/common/formatDate";

interface CartProp {
  title: string;
  eventId: string;
  image: string;
  endDate?: Date;
  vol?: string;
}

function Cart({ title, eventId, image, endDate, vol }: CartProp) {
  const dynamicRoute = `market/${encodeURIComponent(title)}?mId=${eventId}`;
  const defaultImage =
    "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Fus-election-tipping-point-state-QaKzIk2CFwii.png&w=96&q=75";

  return (
    <Link
      className=" bg-gray-400/20 relative px-5   flex flex-col rounded-lg shadow-[0_1px_10px_rgb(26,213,199)] cursor-pointer h-72 font-sans hover:bg-gray-300/30"
      href={dynamicRoute}
    >
      <div className="py-4 flex justify-end">
        <section className="text-white gap-2 flex rounded items-center border-dashed border px-2">
          <span className="w-2 h-2 animate-pulse bg-red-500 rounded-full" />
          <p>ENDS ON {formatDate(endDate)}</p>
        </section>
      </div>

      <div className=" py-3">
        <section className="overflow-hidden items-center  gap-2 flex h-[85%] ">
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
              <p className="flex items-center gap-2 text-primary">
                Liquidity: {vol} <FaEthereum color="#1ad5c7" />
              </p>
              <p className="flex gap-2">
                TRADES:<span>{vol}</span>
              </p>
            </section>
          </div>
        </section>
        <div className="flex gap-3  w-full  justify-between items-center h-[20%] mt-7  font-mono">
          <Button
            click={() => console.log("Clicked")}
            text={"Yes"}
            style="bg-green-500 px-10 w-full  hover:bg-green-400"
          />
          <Button
            click={() => console.log("Clicked")}
            text={"No"}
            style="bg-red-500 px-11 w-full  hover:bg-red-400"
          />
        </div>
      </div>
    </Link>
  );
}

export default Cart;
