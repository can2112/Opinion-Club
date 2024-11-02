"use client";
import React, { useState } from "react";
import MobileAction from "./MobileAction";
import { Analaytics } from "./Analytics";
import Action from "./Action";
import { Card } from "@/components/ui/card";

function Client({ questionId }: { questionId: string }) {
  const [selected, setSelected] = useState("yes");
  const [currentState, setCurrentState] = useState("Buy");

  return (
    <div>
      <MobileAction
        questionId={questionId}
        selected={selected}
        setSelected={setSelected}
        currentState={currentState}
        setCurrentState={setCurrentState}
      />

      <section className="flex gap-5 mt-5">
        <div className="w-full">
          <Analaytics
            questionId={questionId}
            outcomeIndex={selected == "yes" ? 0 : 1}
          />
        </div>

        <Card className="w-full col-span-1  hidden md:flex">
          <Action
            questionId={questionId}
            selected={selected}
            setSelected={setSelected}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        </Card>
      </section>
    </div>
  );
}

export default Client;
