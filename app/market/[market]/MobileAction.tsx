import BottomModal from "@/app/components/modal/Bottom";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Action from "./Action";
import { ActionProps } from "./types";

function MobileAction({
  questionId,
  setCurrentState,
  setSelected,
  currentState,
  selected,
}: ActionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <Card className="mt-5 py-2  text-heading md:hidden gap">
        <CardContent className="flex justify-between gap-4 py-4 w-full">
          <Button
            className="w-full font-bold text-lg bg-green-600/20 text-green-600 hover:bg-green-700/20"
            onClick={() => {
              setSelected("yes");
              return setOpen(true);
            }}
          >
            Yes
          </Button>
          <Button
            className="w-full font-bold text-lg bg-red-600/20 text-red-500 hover:bg-red-700/20"
            onClick={() => {
              setSelected("no");
              return setOpen(true);
            }}
          >
            No
          </Button>
        </CardContent>
      </Card>
      <section>
        <BottomModal isOpen={open} onClose={() => setOpen(false)}>
          <Action
            questionId={questionId}
            currentState={currentState}
            selected={selected}
            setCurrentState={setCurrentState}
            setSelected={setSelected}
          />
        </BottomModal>
      </section>
    </div>
  );
}

export default MobileAction;
