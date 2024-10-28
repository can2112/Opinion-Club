"use client";
import Action from "@/components/trade/Action";
import Image from "next/image";
import nextClient from "@/utils/clients/nextClient";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LineChart } from "@/components/charts/LineChart";

function Page() {
  const searchParams = useSearchParams();
  const eventId = searchParams?.get("mId");
  const [buySellState, setBuySellState] = useState("Buy");
  const [selected, setSelected] = useState("yes");

  const fetchData = async () => {
    const response = await nextClient.get(`/question/?questionId=${eventId}`);
    if (!response?.data) {
      toast.error("Something went wrong");
    }
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["eventData", eventId],
    queryFn: fetchData,
    enabled: !!eventId,
  });

  const { title, image, description } = data?.data || {};
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;

  return (
    <div className=" px-1 lg:px-20  text-white font-mono">
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
            <LineChart
              outcomeIndex={selected == "yes" ? 0 : 1}
              questionId={eventId || ""}
            />
          </div>
        </section>

        <div className="w-full md:w-1/2 xl:w-1/3">
          <Action
            // price={Costs}
            setCurrentState={setBuySellState}
            currentState={buySellState}
            questionId={eventId}
            selected={selected}
            setSelected={setSelected}
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
