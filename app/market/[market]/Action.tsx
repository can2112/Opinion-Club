import useLogic from "./useLogic";
import { ActionProps } from "./types";
import { Button } from "@/app/components/ui/button";
import SwipeButton from "./Swipe";
import { Loader2, Minus, Plus } from "lucide-react";

function Action({
  questionId,
  selected,
  setSelected,
  currentState,
  setCurrentState,
}: ActionProps) {
  const {
    amount,
    setAmount,
    quoteData,
    handleOrder,
    loading,
    prepBalance,
    price,
  } = useLogic({ questionId, currentState, selected, setSelected });

  const roundPotential =
    (amount && (parseFloat(quoteData?.value || "0") - amount) / amount) || 0;

  const trimPot = parseFloat(`${roundPotential * 100}`).toFixed(2);
  const avgPrice =
    parseFloat(`${amount}`) / parseFloat(quoteData?.value || "0");

  const trimAmount = amount && Math.floor(amount * 100) / 100;

  return (
    <div className="flex flex-col  border-2 border-white/10 bg-box rounded-xl w-full  ">
      <div className="flex justify-between">
        <section className="py-2 px-3  flex gap-3">
          <Button
            variant={`${currentState == "Buy" ? "outline" : "ghost"}`}
            className={`${
              currentState == "Buy" && " font-bold  bg-gray-100"
            } rounded-full text-lg hover:rounded-full`}
            onClick={() => setCurrentState("Buy")}
          >
            Buy
          </Button>
          <Button
            variant={`${currentState == "Sell" ? "outline" : "ghost"}`}
            className={`${
              currentState == "Sell" && " font-bold  bg-gray-100"
            } rounded-full text-lg hover:rounded-full`}
            onClick={() => setCurrentState("Sell")}
          >
            Sell
          </Button>
        </section>

        {/* <section className="p-3 flex items-center gap-2 cursor-pointer relative">
          <span
            className={`absolute top-12 left-1 rounded-md w-1/2 h-1 ${
              currentState === "Add" || currentState === "Remove"
                ? "opacity-100 bg-fdf-400"
                : "opacity-0"
            }`}
          />
          <select
            className="text-black cursor-pointer bg-box outline-none"
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
        </section> */}
      </div>
      <span className="w-full h-1 bg-white/10" />

      <div className="flex justify-between p-3 flex-col">
        <p className="text-normal">Outcome</p>

        <section className="flex relative  mt-2 gap-3">
          <Button
            className={` ${
              selected == "yes"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400/30 hover:bg-gray-400/50 text-black"
            } w-full py-6`}
            onClick={() => setSelected("yes")}
          >
            {`Yes ${(price && price?.[0]?.price) || ""}`}
          </Button>
          <Button
            className={` ${
              selected == "no"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-400/30 hover:bg-gray-400/50 text-black"
            } w-full py-6`}
            onClick={() => setSelected("no")}
          >
            {`No ${(price && price?.[1]?.price) || ""}`}
          </Button>
        </section>

        <div className="flex mt-8 mb-2 justify-between">
          <h2 className="">
            {currentState === "Buy" ? "You're Buying" : "You're Selling"}
          </h2>
          <div>
            {currentState === "Sell" && (
              <Button
                variant={"outline"}
                className="px-2 bg-gray-300 py-0 rounded-xl h-6"
                onClick={() => {
                  setAmount(prepBalance);
                }}
              >
                Max
              </Button>
            )}
          </div>
        </div>
        <section className="mt- relative">
          <div
            className="absolute left-4 bottom-2 text-2xl cursor-pointer z-50"
            onClick={() => {
              setAmount((prev) => (prev != null && prev > 0 ? prev - 1 : 0));
            }}
          >
            <Minus color="#9199B1" />
            <span className="h-[2px] w-7 rotate-90 left-4 bottom-3 rounded bg-[#DBDDE5] absolute" />
          </div>
          <div
            className="absolute right-4 bottom-2 text-2xl cursor-pointer z-50"
            onClick={() => setAmount((prev) => (prev != null ? ++prev : 1))}
          >
            <Plus color="black" />
            <span className="h-[2px] w-7 rotate-90 right-4 bottom-3 rounded bg-[#DBDDE5] absolute" />
          </div>

          <input
            type="number"
            placeholder={"$10.00"}
            value={trimAmount || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(parseFloat(value));
              }
            }}
            className="bg-white  text-center broder-border  border outline-black text-textPrimary placeholder:text-textPrimary font-normal w-full py-2 px-3 rounded-lg"
          />
        </section>
        <div className="flex mt-10 px-1 justify-between text-md-custom">
          <p className="text-textSecondary">Avg Price</p>
          <p className="text-black ">
            {" "}
            {quoteData?.value && amount
              ? parseFloat(`${avgPrice}` || "0").toFixed(2)
              : "0"}
          </p>
        </div>
        <div className="flex mt-1 px-1 justify-between text-md-custom">
          <p className="text-textSecondary">Shares</p>
          <p className="text-black ">
            {prepBalance ? Math.floor(prepBalance * 100) / 100 : "0"}
          </p>
        </div>
        <div className="flex mt-1 px-1 justify-between text-md-custom">
          <p className="text-textSecondary">Potential returns</p>
          <p className="text-green-400">
            $
            {quoteData?.value && amount
              ? parseFloat(quoteData?.value || "").toFixed(2)
              : "0"}{" "}
            ({trimPot})
          </p>
        </div>
        <div className="mt-5">
          <section className="md:hidden">
            <SwipeButton
              currentState={currentState}
              onSwipe={handleOrder}
              loading={loading}
            />
          </section>

          <section className="hidden md:flex">
            <Button
              className={`w-full  ${
                currentState === "Buy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={loading}
              onClick={() => handleOrder()}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <p> {currentState?.toUpperCase()}</p>
              )}
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Action;
