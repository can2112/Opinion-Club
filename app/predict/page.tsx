"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Action from "@/components/trade/Action";

Chart.register(...registerables);

function page() {
  const [buySellState, setBuySellState] = useState("buy");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const data = {
    labels: [
      "Sep 24",
      "Sep 25",
      "Sep 26",
      "Sep 27",
      "Sep 28",
      "Sep 29",
      "Sep 30",
      "Oct 1",
      "Oct 2",
    ],
    datasets: [
      {
        label: "Probability of Military Action",
        data: [10, 12, 15, 17, 20, 25, 22, 19, 17],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-20 bg-gray-900 text-white flex justify-between gap-5 font-mono">
      <section className="flex flex-col ">
        <h1 className="text-2xl">
          U.S. military action against Iran before November?
        </h1>
        <p className="text-xl my-2">17% chance</p>
        <div className="flex justify-between gap-3">
          <div className="flex-1 w-full">
            <Line data={data} />
          </div>
        </div>

        

        <div className="mt-5">
          <h2 className="text-lg">Order Book</h2>
          <div className="flex justify-between my-2">
            <div>
              <p>Trade Yes</p>
              <p>Price: 17.9</p>
            </div>
            <div>
              <p>Trade No</p>
              <p>Price: 84.1</p>
            </div>
          </div>
        </div>
      </section>

      {/* // right side section */}
      <div className="w-1/3">
        <Action setCurrentState={setBuySellState} currentState={buySellState} />
      </div>
    </div>
  );
}

export default page;
