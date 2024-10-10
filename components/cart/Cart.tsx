"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../button/Button";

interface CartProp {
  title: string;
  eventId: string;
  image: string;
}

function Cart({ title, eventId, image }: CartProp) {
  const router = useRouter();
  const ModifiedTitle = title.replace(/\s/g, "-");
  const dynamicRoute = `market/${ModifiedTitle}?mId=${eventId}`;
  const defaultImage =
    "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Fus-election-tipping-point-state-QaKzIk2CFwii.png&w=96&q=75";

  return (
    <div
      className=" bg-gray-400/20 relative px-5 py-7 flex flex-col rounded-md shadow-xl shadow-black cursor-pointer h-48 font-sans hover:bg-gray-300/30"
      onClick={() => router.push(dynamicRoute)}
    >
      <section className="overflow-hidden items-center gap-4 flex ">
        <div className=" ">
          <Image
            src={image || defaultImage}
            width={30}
            height={30}
            alt="martket"
            className="rounded"
          />
        </div>
        <p className=" font-mono flex-1 w-4/5">{title}</p>
      </section>
      <div className=" absolute flex gap-5 bottom-4  justify-between items-center mt-5 font-mono">
        <Button
          click={() => console.log("Clicked")}
          text={"Yes"}
          style="bg-green-300 text-green-400 hover:bg-green-500"
        />
        <Button
          click={() => console.log("Clicked")}
          text={"No"}
          style="bg-red-300 text-red-400 hover:bg-red-500"
        />
      </div>
    </div>
  );
}

export default Cart;
