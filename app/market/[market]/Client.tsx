"use client";
import React, { ReactNode, useState } from "react";
import MobileAction from "./MobileAction";
import { Analaytics } from "./Analytics";
import Action from "./Action";
import { Card } from "@/components/ui/card";
import Activity from "./Activity";

function Client({
  questionId,
  children,
}: {
  questionId: string;
  children: ReactNode;
}) {
  const [selected, setSelected] = useState("yes");
  const [currentState, setCurrentState] = useState("Buy");

  return (
    <div className="">
      <div className=" fixed bottom-[3.7rem] md:bottom-0 w-screen right-0 z-50">
        <MobileAction
          questionId={questionId}
          selected={selected}
          setSelected={setSelected}
          currentState={currentState}
          setCurrentState={setCurrentState}
        />
      </div>

      <div className="flex flex-col w-full lg:w-3/5">
        {children}
        <section className="flex gap-5 mt-5">
          <div className="w-full">
            <Analaytics
              questionId={questionId}
              outcomeIndex={selected == "yes" ? 0 : 1}
            />
          </div>
        </section>
        <Activity questiondId={questionId} />

        <Card className="fixed right-36 top-[18.7rem] col-span-1 shadow-none w-1/4  hidden lg:flex">
          <Action
            questionId={questionId}
            selected={selected}
            setSelected={setSelected}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        </Card>
      </div>
    </div>
  );
}

export default Client;
