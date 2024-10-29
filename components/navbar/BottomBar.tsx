"use client";
import React from "react";
import NavLink from "./NavLink";
import { useAccount } from "wagmi";
import { ExploreIcon, HomeIcon, PortfolioIcon } from "./icons/icons";

function BottomBar() {
  const { address, isConnected } = useAccount();
  return (
    <footer className="fixed md:hidden  bottom-0 bg-black/10  backdrop-filter bg-opacity-30 backdrop-blur-md  w-screen border-t-[0.5px] right-0 border-gray-400">
      <div className={"py-2 px-3 flex justify-between z-40"}>
        <NavLink Icon={HomeIcon} label="Home" route="/" />
        <NavLink Icon={ExploreIcon} label="Create" route="/market/create" />
        {isConnected && (
          <NavLink
            Icon={PortfolioIcon}
            label="Portfolio"
            route={`/Portfolio/${address}`}
          />
        )}
      </div>
    </footer>
  );
}
export default BottomBar;
