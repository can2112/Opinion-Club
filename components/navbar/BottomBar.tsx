"use client";
import React from "react";
import NavLink from "./NavLink";
import { IoIosCreate } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function BottomBar() {
  return (
    <footer className="fixed md:hidden  bottom-0 bg-black/10  backdrop-filter bg-opacity-30 backdrop-blur-md  w-screen border-t-[0.5px] right-0 border-gray-400">
      <div className={"py-2 px-3 flex justify-between z-40"}>
        <NavLink Icon={FaListAlt} label="Market" route="/" />
        <NavLink Icon={IoIosCreate} label="Create" route="/market/create" />
        <NavLink Icon={CgProfile} label="Profile" route="/profile" />
      </div>
    </footer>
  );
}
export default BottomBar;
