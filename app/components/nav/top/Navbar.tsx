import React from "react";
import Link from "next/link";
import { WalletConnection } from "./Wallet";
import Image from "next/image";
import Routes from "./Route";
import NavLink from "../NavLink";

function Navbar() {
  return (
    <div className=" bg-front p-3  flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <Link
          className="flex text-black gap-2 items-center cursor-pointer"
          href={"/"}
        >
          <Image src={"/dark_logo.svg"} alt="logo" width={100} height={100} />
        </Link>
      </div>

      <section className="flex z-50 gap-16">
        <div className="md:flex gap-12 hidden">
          <NavLink label="MARKETS" route="/" />
          <NavLink label="CREATE" route="/market/create" />
          <Routes />
        </div>
        <WalletConnection />
      </section>
    </div>
  );
}

export default Navbar;
