"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ApiResponse, CreateMarketBody } from "@/utils/Interfaces/market";
import useTransaction from "@/utils/hooks/transaction";
import Wait from "@/components/wait/Wait";

function Page() {
  const [title, setTitle] = useState("");
  const [fundingAmount, setFundingAmount] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [sourceOfTruth, setSourceOfTruth] = useState("");
  const [stepper, setStepper] = useState([
    { name: "MARKET DETAIL", state: true },
    { name: "UPLOAD IMAGE", state: false },
    { name: "CREATING MARKET", state: false },
  ]);

  const [titleErr, setTitleErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [imgErr, setImgErr] = useState("");
  const [srcErr, setSrcErr] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const { address } = useAccount();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Hold tight, magic in progress!"
  );
  const { sendTransaction } = useTransaction();

  const mutation = useMutation({
    mutationFn: async (createMarketBody: CreateMarketBody) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/create-market`,
        createMarketBody
      );
      return response.data;
    },
    onSuccess: async (data: ApiResponse) => {
      const approval = await sendTransaction({
        data: data.data.txns,
        setStatusMessage,
        setProgress,
      });
      setStatusMessage("Almost there, we're validating your payment!");
      // const approval = await sendTransaction({ data: data?.data });

      if (approval) {
        const { txnHash } = approval;
        const updateTxnHash = async () => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API}/update-txn`,
              { txnHash, questionId: data?.data?.questionId }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to locate transaction", error);
            setStepper([
              { name: "MARKET DETAIL", state: true },
              { name: "UPLOAD IMAGE", state: false },
              { name: "CREATING MARKET", state: false },
            ]);
          }
        };
        const status = await updateTxnHash();

        if (status.success) {
          setStatusMessage("Success! Funding approved!");

          setTimeout(() => {
            toast.success("Market created successfully!");
            router.push("/");
          }, 3000);
        }
      } else {
        setStepper([
          { name: "MARKET DETAIL", state: true },
          { name: "UPLOAD IMAGE", state: false },
          { name: "CREATING MARKET", state: false },
        ]);
        toast.error("Transaction failed. Please try again.");
      }
    },
    onError: () => {
      setStepper([
        { name: "MARKET DETAIL", state: true },
        { name: "UPLOAD IMAGE", state: false },
        { name: "CREATING MARKET", state: false },
      ]);
      toast.error("Error creating market. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (stepper[0].state && stepper[1].state) {
      if (!image) {
        return setImgErr("Required");
      }
    }
    if (!address) {
      return toast.info("Please connect your wallet!😳");
    }

    setStepper([
      { ...stepper[0] },
      { ...stepper[1] },
      { ...stepper[2], state: true },
    ]);
    const formattedDate = new Date(expiryDate).toISOString();

    const createMarketBody = {
      fromAddress: address,
      market: {
        title,
        image,
        options: [
          {
            option: "Yes",
            optionId: 0,
          },
          {
            option: "No",
            optionId: 1,
          },
        ],
        description,
        expiryDate: formattedDate,
        sourceOfTruth,
      },
      fundingAmount,
    };

    setProgress(10);
    setStatusMessage("Initiating market creation");

    mutation.mutate(createMarketBody);
  };

  const handleNext = () => {
    if (title.length < 5) {
      return setTitleErr("Market question must be at least 5 characters");
    }
    if (description.length < 5) {
      setTitleErr("");
      return setDescErr("Market question must be at least 5 characters");
    }

    if (!sourceOfTruth) {
      setTitleErr("");
      setDescErr("");
      return setSrcErr("Required");
    }

    if (!fundingAmount) {
      setTitleErr("");
      setDescErr("");
      setSrcErr("");
      return setAmountErr("Funding amount is Required");
    }
    if (!expiryDate) {
      setSrcErr("");
      setAmountErr("");
      setDescErr("");
      setTitleErr("");
      return setDateErr("Required");
    }

    setStepper([
      { ...stepper[0] },
      { ...stepper[1], state: true },
      { ...stepper[2] },
    ]);
  };

  return (
    <main className="py-3 px-3 md:px-52 mb-10">
      <section className="mt-10">
        <center className="text-2xl font-bold">CREATE MARKET</center>
        <div className="flex mt-5  gap-4 w-full">
          {stepper.map((res) => {
            return (
              <div className="w-full" key={res.name}>
                <p
                  className={`w-full h-1 ${
                    res.state ? "bg-primary" : " bg-gray-800"
                  }`}
                />
                <p className="mt-3 text-sm">{res.name}</p>
              </div>
            );
          })}
        </div>
      </section>
      {stepper[0].state && !stepper[1].state && (
        <div className="mt-10">
          <section className="mt-5 ">
            <div className=" mt-3 text-gray-600  font-semibold">
              <p className=" text-white font-semibold"> MARKET QUESTION</p>
              <p className="text-gray-400 font-sans mt-3">
                Ask a question about a future outcome
              </p>
              <input
                type="text"
                placeholder="Which of the following candidate will win the 2024 election?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-900 relative py-4 px-4 text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
              />
              <p className="absolute text-red-500 bottom mt-2">{titleErr}</p>
            </div>
            <div>
              <p className="mt-10 text-white font-semibold">
                RESOLUTION CRITERIA
              </p>
              <p className="text-gray-400 font-sans mt-3">
                Write down description and the conditions the market will
                resolve. This can&apos;t be changed once the market is created.
              </p>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-900 relative py-5 px-4 text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
              />
              <p className="absolute text-red-500 ">{descErr}</p>
            </div>

            <div>
              <p className="mt-10 text-white font-semibold">Source of truth</p>
              <p className="text-gray-400 font-sans mt-3">
                Enter a source of truth
              </p>
              <input
                type="text"
                placeholder="Stake Amount"
                value={sourceOfTruth}
                onChange={(e) => setSourceOfTruth(e.target.value)}
                required
                className="bg-gray-900 relative py-5 px-4 text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
              />
              <p className="absolute text-red-500 mt-1">{srcErr}</p>
            </div>
            <div>
              <p className="mt-10 text-white font-semibold">Stake amount</p>
              <p className="text-gray-400 font-sans mt-3">
                Enter a funding amount for your market
              </p>
              <input
                type="text"
                placeholder="Stake Amount"
                value={fundingAmount}
                onChange={(e) => setFundingAmount(e.target.value)}
                required
                className="bg-gray-900 relative py-5 px-4 text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
              />
              <p className="absolute text-red-500 mt-1">{amountErr}</p>
            </div>
            <div>
              <p className="mt-10 text-white font-semibold">EXPIRATION TIME</p>
              <p className="text-gray-400 font-sans mt-3">
                Listed in your local timezone. Market must resolve within 48
                hours post deadline.
              </p>
              <input
                type="date"
                placeholder="End Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="bg-gray-900 relative py-5 px-4 text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none"
              />
              <p className="absolute text-red-500 mt-1">{dateErr}</p>
            </div>
          </section>
          <section className="w-full flex justify-center mt-10">
            <button
              onClick={() => handleNext()}
              className="bg-primary hover:bg-primary/80 text-black w-full md:w-1/2 py-4 px-4 rounded-md font-semibold "
            >
              NEXT
            </button>
          </section>
        </div>
      )}

      {stepper[0].state && stepper[1].state && !stepper[2].state && (
        <div className="mt-10">
          <p className="mt-10 text-white font-semibold">UPLOAD IMAGE</p>
          <p className="text-gray-400 font-sans mt-3">
            Please enter the url the of image for your market.
          </p>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="bg-gray-900  border-dashed border border-gray-500 focus:border-none relative   px-4 text-white mt-3 focus:outline-primary text-sm rounded-md w-full outline-none py-8"
          />
          <p className="absolute text-red-500 mt-1">{imgErr}</p>
          <div>
            <p className="mt-10 text-white font-semibold">UPLOAD IMAGE</p>
            <p className="text-gray-400 font-sans mt-1">
              You will receive a 1.5% fee from markets you create. A small gas
              fee $0.2 will be charged upon market creation.
            </p>
          </div>
          <section className="flex gap-6 mt-10">
            <button
              className="bg-gray-300 hover:bg-gray-300/80 text-black w-1/2 py-4 px-4 rounded-md font-semibold "
              onClick={() => {
                setStepper([
                  { ...stepper[0] },
                  { ...stepper[1], state: false },
                  { ...stepper[2] },
                ]);
              }}
            >
              Back
            </button>
            <button
              className="bg-primary hover:bg-primary/80 text-black w-1/2 py-4 px-4 rounded-md font-semibold "
              onClick={() => handleSubmit()}
            >
              Next
            </button>
          </section>
        </div>
      )}

      {stepper[0].state && stepper[1].state && stepper[2].state && (
        <Wait progress={progress} statusMessage={statusMessage} />
      )}
    </main>
  );
}

export default Page;
