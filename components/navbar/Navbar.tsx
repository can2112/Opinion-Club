"use client";
import { useAppKit } from "@reown/appkit/react";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { CiHome } from "react-icons/ci";
import Link from "next/link";

function Navbar() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="bg-black/10  backdrop-filter bg-opacity-30 backdrop-blur-md p-3 shadow-md shadow-violet-400 flex justify-between sticky top-0 z-40 ">
      <div className="flex items-center gap-5">
        <Link className="flex items-center cursor-pointer" href={"/"}>
          <CiHome size={44} />
        </Link>
        <Link
          className="flex items-center cursor-pointer"
          href={"/market/create"}
        >
          Create Question
        </Link>
      </div>

      <section className="flex">
        {isConnected ? (
          <>
            <span className="px-4 gradient-text p-3">{`${address?.slice(
              0,
              4
            )}....${address?.slice(-4)}`}</span>
            <p
              className="text-red-500 cursor-pointer p-3"
              onClick={() => disconnect()}
            >
              {" "}
              Disconnect
            </p>
          </>
        ) : (
          <p
            className="gradient-text cursor-pointer p-3 z-50"
            onClick={() => open()}
          >
            Connect Wallet
          </p>
        )}
      </section>
    </div>
  );
}

export default Navbar;
