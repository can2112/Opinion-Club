import React from "react";

function CartSk() {
  return (
    <div className="bg-gray-400/10 w-full  px-5 py-7 flex flex-col rounded-md shadow-xl shadow-black cursor-pointer h-48 animate-pulse">
      <section className="overflow-hidden items-center gap-4 flex ">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <div className="flex-1 w-4/5">
          <div className="h-6 bg-gray-300 rounded w-full"></div>
        </div>
      </section>

      <div className=" flex gap-5  w-full justify-between items-center mt-14">
        <div className="w-full h-8 bg-gray-300 rounded"></div>
        <div className="w-full h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default CartSk;
