"use client";
import React from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

import NavLink from "./NavLink";
import { useAppKit } from "@reown/appkit/react";
import { Button } from "../ui/button";
import { CgChevronDown } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function Navbar() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const router = useRouter();
  const path = usePathname();

  return (
    <div className=" bg-front p-3  flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <Link
          className="flex text-black gap-2 items-center cursor-pointer"
          href={"/"}
        >
          {path != "/" && (
            <IoArrowBackCircleOutline
              size={32}
              className="cursor-pointer hover:bg-slate-300"
              onClick={() => router.back()}
            />
          )}
          <strong>OPINION</strong>
        </Link>
      </div>

      <section className="flex z-50 gap-16">
        <div className="md:flex gap-12 hidden">
          <NavLink label="MARKETS" route="/" />
          <NavLink label="CREATE" route="/market/create" />
          <NavLink label="PORTFOLIO" route="/user/portfolio" />
        </div>

        <Button
          variant="outline"
          onClick={() => open()}
          className={"rounded-full px-1"}
        >
          {isConnected && (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}

          {isConnected
            ? `${address?.slice(0, 4)}....${address?.slice(-4)}`
            : " CONNECT WALLET"}
          <CgChevronDown className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}

export default Navbar;
