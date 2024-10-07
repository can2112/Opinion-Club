"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Action from "@/components/trade/Action";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

Chart.register(...registerables);

function Page() {
  const searchParams = useSearchParams();
  const eventId = searchParams?.get("mId");
  const [buySellState, setBuySellState] = useState("buy");

  console.log(eventId);
  console.log(searchParams, "searchParams");

  // const [amount, setAmount] = useState("");
  // const [limitPrice, setLimitPrice] = useState("");

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3000/api/event-detail/?mId=${eventId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ["eventData", eventId],
    queryFn: fetchData,
    enabled: !!eventId,
  });

  console.log(data);

  const eventData = {
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
            <Line data={eventData} />
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

      <div className="w-1/3">
        <Action setCurrentState={setBuySellState} currentState={buySellState} />
      </div>
    </div>
  );
}

export default Page;
