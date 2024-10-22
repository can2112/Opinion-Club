"use client";
import React from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import Image from "next/image";
import NavLink from "./NavLink";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

function Navbar() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();

  return (
    <div className="bg-black/10  backdrop-filter bg-opacity-30 backdrop-blur-md p-3 shadow-md shadow-primary flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <Link className="flex items-center cursor-pointer" href={"/"}>
          <Image src={"/oc.png"} width={150} height={0} alt="logo" />
        </Link>
      </div>

      <section className="flex z-50 gap-16">
        <div className="md:flex gap-12 hidden">
          <NavLink label="MARKETS" route="/" />
          <NavLink label="CREATE" route="/market/create" />
        </div>
        {isConnected ? (
          <div
            className="p-3 gap-2 flex items-center cursor-pointer z-50 justify-between bg-white rounded-lg bg-opacity-10 backdrop-blur-md shadow-lg"
            onClick={openAccountModal}
          >
            <p className="gradient-text">{`${address?.slice(
              0,
              4
            )}....${address?.slice(-4)}`}</p>
            <IoIosArrowDown />
          </div>
        ) : (
          <button
            className=" bg-primary rounded-lg text-black cursor-pointer p-2"
            type="button"
            onClick={openConnectModal}
          >
            CONNECT WALLET
          </button>
        )}
      </section>
    </div>
  );
}

export default Navbar;
