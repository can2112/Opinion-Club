"use client";
import { useState } from "react";

function Portfolio() {
  const [currentVal, setCurrentVal] = useState("Position");
  return (
    <div className="mt-8 w-full relative">
      <section className="flex gap-10">
        <p
          className="relative flex flex-col cursor-pointer"
          onClick={() => setCurrentVal("Position")}
        >
          Position
          {currentVal == "Position" && (
            <span className="bg-black absolute h-1 w-full -bottom-3 rounded-md" />
          )}
        </p>
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

      <p className="mt-10">No {currentVal} found</p>
    </div>
  );
}
export default Portfolio;
