"use client";
import { useAppKit } from "@reown/appkit/react";
import React from "react";
import { useAccount } from "wagmi";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { CgChevronDown } from "react-icons/cg";

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  return (
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
  );
}
