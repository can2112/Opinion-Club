"use client";
import React from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

import NavLink from "./NavLink";
import { useAppKit } from "@reown/appkit/react";
import { Button } from "../ui/button";
import { CgChevronDown } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  return (
    <div className="backdrop-filter bg-opacity-30 backdrop-blur-md p-3  flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <Link className="flex items-center cursor-pointer" href={"/"}>
          {/* <Image src={"/oc.png"} width={150} height={0} alt="logo" /> */}
          <strong>OPINION</strong>
        </Link>
      </div>

      <section className="flex z-50 gap-16">
        <div className="md:flex gap-12 hidden">
          <NavLink label="MARKETS" route="/" />
          <NavLink label="CREATE" route="/market/create" />
        </div>

        <Button
          variant="outline"
          onClick={() => open()}
          className={"rounded-full"}
        >
          {isConnected && (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}

          {isConnected
            ? `${address?.slice(0, 4)}....${address?.slice(-4)}`
            : " Connect Wallet"}
          <CgChevronDown className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}

export default Navbar;
