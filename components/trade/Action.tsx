import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface IProps {
  setCurrentState: (arg: string) => void;
  currentState: string;
}

function Action({ setCurrentState, currentState }: IProps) {
  const [selected, setSelected] = useState("yes");
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col border-2 border-white/10 rounded-xl w-full font-mono ">
      <div className="flex gap-10 p-3">
        <p
          className={`cursor-pointer relative`}
          onClick={() => setCurrentState("buy")}
        >
          Buy
          <span
            className={`absolute top-9 left-0 rounded-md w-8 h-1 ${
              currentState === "buy" ? "opacity-100 bg-blue-600" : "opacity-0"
            }`}
          />
        </p>
        <p
          onClick={() => setCurrentState("sell")}
          className={`cursor-pointer relative `}
        >
          Sell
          <span
            className={`absolute top-9 left-0 rounded-md w-8 h-1 ${
              currentState === "sell" ? "opacity-100 bg-blue-600" : "opacity-0"
            }`}
          />
        </p>
      </div>

      <span className="w-full h-1 bg-white/10" />

      <div className="flex justify-between p-3 flex-col">
        <section className="flex gap-2 items-center">
          <p>Outcome</p>
          <CiCircleInfo />
        </section>

        <section className="flex  mt-4 gap-2">
          <button
            className={` w-1/2  px-2 py-2  rounded-lg ${
              selected == "yes" ? "bg-green-500" : "bg-gray-400/30"
            }`}
            onClick={() => setSelected("yes")}
          >
            Yes 17.9$
          </button>
          <button
            className={` w-1/2  px-2 py-2  rounded-lg ${
              selected == "no" ? "bg-red-500" : "bg-gray-400/30"
            }`}
            onClick={() => setSelected("no")}
          >
            No 81.6$
          </button>
        </section>

        <section className="mt-5 ">
          <h2 className="text-lg">Limit Price</h2>
          <input
            type="number"
            placeholder="Amount"
            // value={amount}
            // onChange={(e) => setAmount(e.target.value)}
            className="mt-2 p-2 border border-gray-600 rounded bg-gray-800 text-white w-full"
          />

          <h2 className="text-lg mt-3">Limit Price</h2>
          <input
            type="number"
            placeholder="Limit Price"
            // value={limitPrice}
            // onChange={(e) => setLimitPrice(e.target.value)}
            className="mt-2 p-2 border border-gray-600 rounded bg-gray-800 text-white w-full"
          />
          <div className="flex justify-between mt-7 items-center">
            <p>Set Expiration</p>
            <div onClick={toggleCheckbox} className="cursor-pointer">
              {isChecked ? (
                <MdCheckBox size={20} />
              ) : (
                <MdOutlineCheckBoxOutlineBlank size={20} />
              )}
            </div>
          </div>
        </section>
        <div className="flex flex-col">
          <button className="mt-4 bg-blue-500 py-2 px-4 rounded-md w-full">
            Log In
          </button>
          <section className="mt-3">
            <div className="flex justify-between">
              <p>Total</p>
              <p className="text-blue-400">$0.00</p>
            </div>
            <div className="flex justify-between mt-1">
              <p>Potential return </p>
              <p className="text-green-400">$0.00 </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Action;
