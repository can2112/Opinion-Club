"use client";
import { useAppKit } from "@reown/appkit/react";
import React from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import Image from "next/image";

function Navbar() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  return (
    <div className="bg-black/10  backdrop-filter bg-opacity-30 backdrop-blur-md p-3 shadow-md shadow-primary flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <Link className="flex items-center cursor-pointer" href={"/"}>
          <Image src={"/oc.png"} width={150} height={100} alt="logo" />
        </Link>
        <Link
          className=" hidden md:flex  items-center cursor-pointer"
          href={"/market/create"}
        >
          <span className=" font-bold text-lg">Create Question</span>
        </Link>
      </div>

      <section className="flex z-50">
        {isConnected ? (
          <div
            className="p-3 gap-2 flex items-center cursor-pointer z-50 justify-between bg-white rounded-lg bg-opacity-10 backdrop-blur-md shadow-lg"
            onClick={() => open()}
          >
            <p className="gradient-text">{`${address?.slice(
              0,
              4
            )}....${address?.slice(-4)}`}</p>
            <IoIosArrowDown />
          </div>
        ) : (
          <button
            className=" bg-primary rounded-lg text-black cursor-pointer p-3"
            onClick={() => open()}
          >
            Connect Wallet
          </button>
        )}
      </section>
    </div>
  );
}

export default Navbar;
