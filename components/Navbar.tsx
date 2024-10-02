"use client";
import { useAppKit } from "@reown/appkit/react";
import React from "react";

function Navbar() {
  const { open } = useAppKit();
  return (
    <div className="bg-black/10 bg-opacity-10 backdrop-blur-md p-3 shadow-md shadow-violet-400 flex justify-end">
      <p className="gradient-text cursor-pointer p-3" onClick={() => open()}>
        Connect Wallet
      </p>
    </div>
  );
}

export default Navbar;
