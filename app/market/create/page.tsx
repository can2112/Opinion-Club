"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

function page() {
  const [title, setTitle] = useState("");
  const [fundingAmount, setFundingAmount] = useState<string | number>("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [sourceOfTruth, setSourceOfTruth] = useState("");
  const { address } = useAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      return toast.info("Please connect your wallet! 😳");
    }
    const createMarketBody = {
      fromAddress: address,
      market: {
        title,
        image,
        description,
        fundingAmount,
      },
    };
    console.log(createMarketBody, "body-->");
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col md:w-1/2 gap-3 px-2 py"
      >
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="bg-gray-700 py-2 px-4 rounded-md w-full outline-none"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-gray-700 py-2 px-4 rounded-md w-full outline-none"
        />
        <input
          type="text"
          placeholder="Stake Amount"
          value={fundingAmount}
          onChange={(e) => setFundingAmount(Number(e.target.value))}
          required
          className="bg-gray-700 py-2 px-4 rounded-md w-full outline-none"
        />
        <input
          type="date"
          placeholder="End Date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="bg-gray-700 py-2 px-4 rounded-md w-full outline-none"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-gray-700 py-2 px-4 rounded-md w-full outline-none"
        />
        <input
          type="text"
          placeholder="Source of Truth"
          value={sourceOfTruth}
          onChange={(e) => setSourceOfTruth(e.target.value)}
          required
          className="bg-gray-700 py-2 px-4 rounded-md w-full outline-none"
        />
        <button type="submit" className="bg-blue-500 py-2 px-3 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default page;
