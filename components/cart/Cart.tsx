import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

// import { formatDate } from "@/utils/common/formatDate";
import { Button } from "../ui/button";
import { CgChevronRight } from "react-icons/cg";

interface CartProp {
  title: string;
  eventId: string;
  image: string;
  endDate?: Date;
  vol?: string;
  liqudity: string;
}

function Cart({ title, eventId, image, vol, liqudity }: CartProp) {
  const dynamicRoute = `market/${eventId}`;
  const defaultImage =
    "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Fus-election-tipping-point-state-QaKzIk2CFwii.png&w=96&q=75";

  return (
    <Link
      className=" bg-white border-border border h-52 relative px-5 py-2  flex flex-col rounded-xl  cursor-pointer  text-black "
      href={dynamicRoute}
    >
      <div className=" py-3">
        <section className="overflow-hidden items-center  gap-2 flex  ">
          <div className="text-sm ">
            <section className="flex w-full items-center gap-4 ">
              <Avatar>
                <AvatarImage src={image || defaultImage} />
              </Avatar>
              <p className="text-textPrimary  flex-1 w-[80%] font-bold text-md-custom">
                {title}
              </p>
              <CgChevronRight className="h-6 w-6 absolute top-5 right-1" />
            </section>
            <div className="flex gap-3 pb-5  px-2 left-2  justify-between items-center  mt-7  ">
              <section className="absolute top-[4.8rem] left-5  w-[97%] flex gap-4">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="bg-green-500/20 text-green-400 font-bold hover:bg-green-500/50"
                >
                  Yes
                </Button>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="bg-red-500/20 text-red-400 font-bold hover:bg-red-500/50"
                >
                  No
                </Button>
              </section>
            </div>
            <section className="flex w-full text-textSecondary  h-full justify-between text-sm font-medium items-center mt-10">
              <p className="flex items-center gap-2  text-customPrimary">
                <Image
                  src={"/Img.svg"}
                  alt="trophy"
                  width={"25"}
                  height={"25"}
                />
                Liquidity: ${liqudity}
              </p>
              <p className="flex gap-2 ">
                TRADES:<span>{vol}</span>
              </p>
            </section>
          </div>
        </section>
      </div>
    </Link>
  );
}

export default Cart;
