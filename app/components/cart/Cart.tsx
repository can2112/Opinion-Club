import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
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
      className=" bg-white border-border border h-52 relative px-3 py-4  flex flex-col rounded-2xl  cursor-pointer  text-black "
      href={dynamicRoute}
    >
      <div className="text-sm ">
        <section className="flex w-full  items-center gap-3 ">
          <Avatar>
            <AvatarImage src={image || defaultImage} />
          </Avatar>
          <p className="text-textPrimary   w-[85%] font-bold text-md-custom">
            {title}
          </p>
          <CgChevronRight className="h-6 w-6 absolute top-3 right-1" />
        </section>
        <div className="flex flex-col gap-3 pb-5  w-full absolute top-[4.8rem] left-0 justify-between items-center  mt-7  ">
          <section className="  w-full flex px-3 gap-4">
            <Button
              variant={"outline"}
              size={"lg"}
              className="bg-green-500/20 text-green-400  w-full  border-none font-bold hover:bg-green-500/50"
            >
              Yes
            </Button>
            <Button
              variant={"outline"}
              size={"lg"}
              className="bg-red-500/20 w-full text-red-400 border-none font-bold hover:bg-red-500/50"
            >
              No
            </Button>
          </section>
          <section className="flex w-full px-3 text-textSecondary  h-full justify-between text-sm font-medium items-center mt-2">
            <p className="flex items-center gap-2  text-customPrimary">
              <Image src={"/Img.svg"} alt="trophy" width={"25"} height={"25"} />
              Liquidity: ${liqudity}
            </p>
            <p className="flex gap-2 ">
              TRADES:<span>{vol}</span>
            </p>
          </section>
        </div>
      </div>
    </Link>
  );
}

export default Cart;
