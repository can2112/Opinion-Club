"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Action from "@/components/trade/Action";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

Chart.register(...registerables);

function Page() {
  const searchParams = useSearchParams();
  const eventId = searchParams?.get("mId");
  const [buySellState, setBuySellState] = useState("Buy");

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/question/?questionId=${eventId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the response as JSON
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["eventData", eventId],
    queryFn: fetchData,
    enabled: !!eventId,
  });

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
        label: "Probability ",
        data: [10, 12, 15, 17, 20, 25, 22, 19, 17],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };
  const { title, image, Costs, description } = data?.data || {};
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;

  return (
    <div className="p-5 md:p-20 bg-gray-900 text-white font-mono">
      <div className="flex flex-col md:flex-row justify-between gap-5 ">
        <section className="flex flex-col ">
          <Image
            src={image}
            width={100}
            height={100}
            alt="logo"
            className="rounded-lg mb-5 w-full md:w-1/3"
          />
          <h1 className="text-2xl">{title}</h1>
          <div className="flex justify-between gap-3">
            <div className="flex-1 w-full h-56 mt-3 md:mt-0">
              <Line data={eventData} />
            </div>
          </div>
        </section>

        <div className="w-full md:w-1/3">
          <Action
            price={Costs}
            setCurrentState={setBuySellState}
            currentState={buySellState}
            questionId={eventId}
          />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-lg">Description</h2>
        <div className="flex justify-between my-2 w-full text-pretty font-thin">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
