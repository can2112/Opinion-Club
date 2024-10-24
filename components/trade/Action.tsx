import { CiCircleInfo } from "react-icons/ci";
import useLogic from "./useLogic";
import { ActionProps } from "./types";
import Button from "../button/Button";
import Image from "next/image";

function Action({
  setCurrentState,
  currentState,
  price,
  questionId,
}: ActionProps) {
  const {
    selected,
    setSelected,
    amount,
    setAmount,
    quoteData,
    handleOrder,
    isLoader,
    prepBalance,
  } = useLogic({ questionId, currentState });

  return (
    <div className="flex flex-col border-2 border-white/10 bg-box rounded-xl w-full font-mono ">
      <div className="flex justify-between">
        <section className="flex gap-10 p-3">
          <p
            className={`cursor-pointer relative`}
            onClick={() => setCurrentState("Buy")}
          >
            Buy
            <span
              className={`absolute top-9 left-0 rounded-md w-8 h-1 ${
                currentState === "Buy" ? "opacity-100 bg-primary" : "opacity-0"
              }`}
            />
          </p>
          <p
            onClick={() => setCurrentState("Sell")}
            className={`cursor-pointer relative `}
          >
            Sell
            <span
              className={`absolute top-9 left-0 rounded-md w-8 h-1 ${
                currentState === "Sell" ? "opacity-100 bg-primary" : "opacity-0"
              }`}
            />
          </p>
        </section>

        <section className="p-3 flex items-center gap-2 cursor-pointer relative">
          <span
            className={`absolute top-12 left-1 rounded-md w-1/2 h-1 ${
              currentState === "Add" || currentState === "Remove"
                ? "opacity-100 bg-primary"
                : "opacity-0"
            }`}
          />
          <select
            className="text-white cursor-pointer bg-box outline-none"
            value={""}
            onChange={(e) => {
              setCurrentState(e.target.value);
            }}
          >
            <option disabled value={""}>
              LP
            </option>
            <option value={"Add"}>Add</option>
            <option value={"Remove"}>Remove</option>
          </select>
        </section>
      </div>

      <span className="w-full h-1 bg-white/10" />

      <div className="flex justify-between p-3 flex-col">
        <section className="flex gap-2 items-center">
          <p>OUTCOME</p>
          <CiCircleInfo />
        </section>

        <section className="flex  mt-4 gap-2">
          <Button
            style={` w-1/2  font-light !text-md ${
              selected == "yes" ? "bg-green-500" : "bg-gray-400/30"
            }`}
            click={() => setSelected("yes")}
            text={`  Yes ${price && price?.[0].cost.toFixed(2)}`}
          />
          <Button
            style={` w-1/2 !text-md font-light  ${
              selected == "no" ? "bg-red-500" : "bg-gray-400/30"
            }`}
            click={() => setSelected("no")}
            text={` No ${price && price?.[1].cost.toFixed(2)}`}
          />
        </section>
        {currentState == "Sell" && (
          <div className="py-2 px-2 flex justify-between ">
            <p
              className={`${
                selected === "no" ? "text-red-500" : "text-green-500"
              }`}
            >
              {prepBalance ? parseFloat(prepBalance).toFixed(2) : "0"} shares
            </p>
          </div>
        )}

        <section className="mt-5 relative">
          <h2 className="text-lg">AMOUNT</h2>
          <input
            type="string"
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
              } else {
              }
            }}
            className="bg-gray-400/30 relative py-4 px-4 border-none text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
          />
          <Image
            src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035"
            height={20}
            width={20}
            alt="usdtLogo"
            className="absolute right-2 bottom-4 "
          />
        </section>
        <div className="mt-10">
          <Button
            style="bg-primary  text-black  hover:bg-primary/80 "
            click={() => handleOrder()}
            text={currentState.toUpperCase()}
            isLoading={isLoader}
          />
          <section className="mt-3">
            {currentState == "Buy" && (
              <div className="flex justify-between">
                <p>RETURN</p>
                <p className="text-green-400">
                  $
                  {amount
                    ? parseFloat(quoteData?.formattedQuote || "").toFixed(2)
                    : "0"}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Action;
