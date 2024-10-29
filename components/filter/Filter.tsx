"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

function Filter() {
  const [currentfilter, setCurrentFilter] = useState<string>("All");
  const filters = [
    "All",
    "Sports",
    "Politics",
    "Finance",
    "News",
    "Entertainment",
  ];

  return (
    <div className="w-full mt-7 overflow-hidden">
      <div className="overflow-y-auto flex justify-between gap-2 no-horizontal-scrollbar ">
        {filters.map((res: string, index: number) => {
          return (
            <Button
              key={index}
              className={`${
                currentfilter == res && "bg-[#D5CFAD] hover:bg-[#D5CFAD]/80"
              } rounded-full px-6`}
              variant={"ghost"}
              onClick={() => setCurrentFilter(res)}
            >
              {res}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default Filter;
