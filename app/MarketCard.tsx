import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { CgChevronRight } from "react-icons/cg";
import { FaRegStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

interface MarketProp {
  title: string;
  eventId: string;
  image: string;
  endDate?: Date;
  vol?: string;
  liqudity: string;
}

export const getCommentCount = async (marketId: string): Promise<number> => {
  const commentsRef = collection(firestore, "markets", marketId, "comments");

  try {
    const snapshot = await getDocs(commentsRef);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching comment count:", error);
    return 0;
  }
};

async function MarketCard({ title, eventId, image, liqudity }: MarketProp) {
  const dynamicRoute = `market/${eventId}`;
  const commentCount = await getCommentCount(eventId);

  return (
    <Link
      className=" bg-white border-border border h-52 relative px-3 py-4  flex flex-col rounded-2xl  cursor-pointer  text-black "
      href={dynamicRoute}
    >
      <div className="text-sm ">
        <section className="flex w-full  items-center gap-3 ">
          <Avatar>
            <AvatarImage src={image} />
          </Avatar>
          <p className="text-textPrimary   w-[85%] font-bold text-md-custom">
            {title}
          </p>
          <CgChevronRight className="h-6 w-6 absolute top-4 right-1" />
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
              ${liqudity} Vol.
            </p>
            {/* <p className="flex gap-2 ">
              <span>{vol} + Placed Bet</span>
            </p> */}
            <div className="flex gap-3 items-center">
              <section className="hover:bg-gray-300 p-4">
                <FaRegStar className="" />
              </section>

              <section className="flex items-center gap-1">
                <FaRegComment /> {commentCount}
              </section>
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}

export default MarketCard;
