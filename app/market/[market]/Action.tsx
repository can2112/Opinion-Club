"use client";
import useLogic from "./useLogic";
import { ActionProps } from "./types";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import SwipeButton from "./Swipe";

function Action({ questionId }: ActionProps) {
  const [currentState, setCurrentState] = useState("Buy");
  const [selected, setSelected] = useState("yes");

  const {
    amount,
    setAmount,
    quoteData,
    handleOrder,
    // loading,
    prepBalance,
    price,
  } = useLogic({ questionId, currentState, selected, setSelected });

  return (
    <div className="flex flex-col  border-2 border-white/10 bg-box rounded-xl w-full  ">
      <div className="flex justify-between">
        <section className="py-2 px-3  flex gap-3">
          <Button
            variant={`${currentState == "Buy" ? "outline" : "ghost"}`}
            className={`${
              currentState == "Buy" && " font-bold  bg-gray-300"
            } rounded-full text-lg hover:rounded-full`}
            onClick={() => setCurrentState("Buy")}
          >
            Buy
          </Button>
          <Button
            variant={`${currentState == "Sell" ? "outline" : "ghost"}`}
            className={`${
              currentState == "Sell" && " font-bold  bg-gray-300"
            } rounded-full text-lg hover:rounded-full`}
            onClick={() => setCurrentState("Sell")}
          >
            Sell
          </Button>
        </section>

        <section className="p-3 flex items-center gap-2 cursor-pointer relative">
          <span
            className={`absolute top-12 left-1 rounded-md w-1/2 h-1 ${
              currentState === "Add" || currentState === "Remove"
                ? "opacity-100 bg-fdf-400"
                : "opacity-0"
            }`}
          />
          <select
            className="text-black cursor-pointer bg-box outline-none"
            value={""}
            onChange={(e) => {
              setCurrentState(e.target.value);
            }}
          >
            <option disabled value={""}>
              LP
            </option>
            <option value={"Add"}>Add</option>
            <option value={"Remove"}>Remove</option>
          </select>
        </section>
      </div>

      <span className="w-full h-1 bg-white/10" />

      <div className="flex justify-between p-3 flex-col">
        <p className="text-normal">Outcome</p>

        <section className="flex  mt-2 gap-2">
          <Button
            className={` ${
              selected == "yes"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400/30 hover:bg-gray-400/50 text-black"
            } w-full`}
            onClick={() => setSelected("yes")}
          >
            {`Yes ${price && price?.[0]?.price}`}
          </Button>
          <Button
            className={` ${
              selected == "no"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400/30 hover:bg-gray-400/50 text-black"
            } w-full`}
            onClick={() => setSelected("no")}
          >
            {`No ${price && price?.[0]?.price}`}
          </Button>
        </section>
        {currentState == "Sell" && (
          <div className="py-2  flex justify-between ">
            <p
              className={`${
                selected === "no" ? "text-red-500" : "text-green-500"
              }`}
            >
              {prepBalance ? parseFloat(prepBalance).toFixed(2) : "0"} shares
            </p>
          </div>
        )}

        <section className="mt-5 relative">
          <h2 className="mb-1">
            {currentState === "Buy" ? "You are Buying" : "You are Selling"}
          </h2>
          <input
            type="string"
            placeholder="$10.00"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
              } else {
              }
            }}
            className="bg-white broder-border  border outline-black text-textPrimary placeholder:text-textPrimary font-normal w-full py-2 px-3 rounded-lg"
          />
          <Image
            src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035"
            height={20}
            width={20}
            alt="usdtLogo"
            className="absolute right-2 bottom-[0.7rem] "
          />
        </section>
        <div className="flex mt-10 px-1 justify-between text-md-custom">
          <p className="text-textSecondary">Potential returns</p>
          <p className="text-green-400">
            $
            {amount
              ? parseFloat(quoteData?.formattedQuote || "").toFixed(2)
              : "0"}
          </p>
        </div>
        <div className="mt-5">
          <SwipeButton
            currentState={currentState}
            onSwipe={handleOrder}
          ></SwipeButton>
          <section className="mt-3"></section>
        </div>
      </div>
    </div>
  );
}

export default Action;
