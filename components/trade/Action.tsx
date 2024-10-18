import { CiCircleInfo } from "react-icons/ci";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import useLogic from "./useLogic";
import { ActionProps } from "./types";
import Button from "../button/Button";

function Action({
  setCurrentState,
  currentState,
  price,
  questionId,
}: ActionProps) {
  const {
    selected,
    setSelected,
    isChecked,
    toggleCheckbox,
    amount,
    setAmount,
    quoteData,
    handleOrder,
    isLoader,
  } = useLogic({ questionId, currentState });

  return (
    <div className="flex flex-col border-2 border-white/10 bg-box rounded-xl w-full font-mono ">
      <div className="flex gap-10 p-3">
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
      </div>

      <span className="w-full h-1 bg-white/10" />

      <div className="flex justify-between p-3 flex-col">
        <section className="flex gap-2 items-center">
          <p>Outcome</p>
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

        <section className="mt-5 ">
          <h2 className="text-lg">Limit Price</h2>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-400/30 relative py-4 px-4 border-none text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
          />

          <div className="flex  justify-between mt-7 items-center">
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
        <div className="mt-2">
          <Button
            style="bg-primary text-center  hover:bg-primary/80 text-black hover:text-black"
            click={() => handleOrder()}
            text={currentState.toUpperCase()}
            isLoading={isLoader}
          />
          <section className="mt-3">
            <div className="flex justify-between">
              <p>Total</p>
              <p className="text-green-400">
                ${amount ? quoteData?.quote : "0"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Action;
