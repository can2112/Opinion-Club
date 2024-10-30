import React from "react";
import Link from "next/link";
import NavLink from "../NavLink";
import { WalletConnection } from "./Wallet";
import { BackIcon } from "./Back";

function Navbar() {
  return (
    <div className=" bg-front p-3  flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <BackIcon />
        <Link
          className="flex text-black gap-2 items-center cursor-pointer"
          href={"/"}
        >
          <strong>OPINION</strong>
        </Link>
      </div>

      <section className="flex z-50 gap-16">
        <div className="md:flex gap-12 hidden">
          <NavLink label="MARKETS" route="/" />
          <NavLink label="CREATE" route="/market/create" />
          <NavLink label="PORTFOLIO" route="/user/portfolio" />
        </div>
        <WalletConnection />
      </section>
    </div>
  );
}

export default Navbar;
