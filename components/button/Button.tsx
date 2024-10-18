import React from "react";
import Loading from "../loading/Loader";

interface ButtonProp {
  style: string;
  text: string;
  click: () => void;
  isLoading?: boolean;
}

function Button({ style, text, click, isLoading }: ButtonProp) {
  return (
    <div
      className={`${style} backdrop-blur-md cursor-pointer flex justify-center items-center  hover:text-white text-center py-2 w-full rounded-xl text-xl font-bold`}
      onClick={click}
    >
      {isLoading ? <Loading /> : <span> {text}</span>}
    </div>
  );
}

export default Button;
