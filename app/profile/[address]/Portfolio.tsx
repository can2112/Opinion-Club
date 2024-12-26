"use client";
import Scroll from "@/app/components/scroll/Scroll";
import { getTimeAgo } from "@/utils/common/formatDate";
import { useState } from "react";
import { Activity } from "./types";

function Portfolio({
  address,
  initialData,
}: {
  address: string;
  initialData: Activity[];
}) {
  const [currentVal, setCurrentVal] = useState("Activity");
  const renderActivity = (data: Activity) => {
    const price = data?.collateralAmount / data?.outcomeTokenTraded;

    return (
      <div key={data.id}>
        <section className="flex border gap-3 justify-between items-center border-border border-x-0 border-t-0 py-2">
          <div className="flex items-center gap-3">
            <div>
              <p>
                {data?.side === "buy" ? "Bought" : "Sold"}{" "}
                <span
                  className={`${
                    data?.side === "buy" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {parseFloat(`${data?.outcomeTokenTraded}`).toFixed(2)}{" "}
                  {data?.outcomeIndex === 0 ? "Yes" : "No"}
                </span>{" "}
                at {parseFloat(`${price}`).toFixed(2)}$
              </p>
            </div>
          </div>
          <p>{getTimeAgo(`${data.created_at}`)}</p>
        </section>
      </div>
    );
  };
  return (
    <div className="mt-8 w-full relative">
      <section className="flex gap-10 mb-4">
        {/* <p
          className="relative flex flex-col cursor-pointer"
          onClick={() => setCurrentVal("Position")}
        >
          Position
          {currentVal == "Position" && (
            <span className="bg-black absolute h-1 w-full -bottom-3 rounded-md" />
          )}
        </p> */}
        <p
          className="relative flex flex-col cursor-pointer"
          onClick={() => setCurrentVal("Activity")}
        >
          Activity
          {currentVal == "Activity" && (
            <span className="bg-black absolute h-1 w-full -bottom-3 rounded-md" />
          )}
        </p>

        <span className="w-full mt-2 h-[1px] top-7 bg-gray-400 absolute" />
      </section>

      <Scroll
        apiRoute="/api/user-activity"
        renderFun={renderActivity}
        objName="activities"
        bodyVal={{ address }}
        initialData={initialData}
      />
    </div>
  );
}
export default Portfolio;
