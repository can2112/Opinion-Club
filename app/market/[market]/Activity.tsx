"use client";
import { useState } from "react";
import CommentSection from "./Comments";

function Activity({ questiondId }: { questiondId: string }) {
  const [currentVal, setCurrentVal] = useState("Comments");
  return (
    <main className="flex flex-col">
      <div className="mt-8 w-full relative">
        <section className="flex gap-10">
          <p
            className="relative flex flex-col cursor-pointer"
            onClick={() => setCurrentVal("Comments")}
          >
            Comments
            {currentVal === "Comments" && (
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
      </div>
      <section className="mt-10">
        {currentVal === "Comments" ? (
          <CommentSection marketId={questiondId} />
        ) : currentVal === "Activity" ? (
          "No Activity found"
        ) : (
          ""
        )}
      </section>
    </main>
  );
}
export default Activity;
