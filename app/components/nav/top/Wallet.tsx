"use client";
import { useAppKit } from "@reown/appkit/react";
import React, { useRef, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { CgChevronDown } from "react-icons/cg";
import DropDown from "./DropDown";

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const [isDropDown, setIsDropDown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!isConnected) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropDown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsDropDown(false), 1000);
  };
  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        !isConnected && open();
      }}
    >
      <Button variant="outline" className={"rounded-full px-2"}>
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
      {isDropDown && (
        <DropDown
          isOpen={isDropDown}
          onClose={() => setIsDropDown(false)}
          address={address}
        />
      )}
    </div>
  );
}
