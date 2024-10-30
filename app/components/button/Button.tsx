"use client";
import React from "react";
import Loading from "../loading/Loader";

interface ButtonProp {
  style: string;
  text: string;
  click?: () => void;
  isLoading?: boolean;
}

function Button({ style, text, click, isLoading }: ButtonProp) {
  return (
    <div
      className={` backdrop-blur-md cursor-pointer flex justify-center items-center   text-center py-2 w-full rounded-xl text-xl font-bold ${style}`}
      onClick={() => {
        if (!isLoading && click) click();
      }}
    >
      {isLoading ? <Loading /> : <span> {text}</span>}
    </div>
  );
}

export default Button;
