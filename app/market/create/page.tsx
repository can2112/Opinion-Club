"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ApiResponse, CreateMarketBody } from "@/utils/Interfaces/market";
import useTransaction from "@/utils/hooks/transaction";
import nextClient from "@/utils/clients/nextClient";
import DatePicker from "@/app/components/date/Date";
import { Button } from "@/app/components/ui/button";
import { Info, Loader2 } from "lucide-react";

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [fundingAmount, setFundingAmount] = useState<string>("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusMessage, setStatusMessage] = useState(
    "Hold tight, magic in progress!"
  );
  const { sendTransaction } = useTransaction();
  const [date, setDate] = React.useState<Date>();
  const { address } = useAccount();

  const mutation = useMutation({
    mutationFn: async (createMarketBody: CreateMarketBody) => {
      const response = await nextClient.post(
        "/create-market",
        createMarketBody
      );
      return response.data;
    },
    onSuccess: async (data: ApiResponse) => {
      const approval = await sendTransaction({
        data: data?.data?.txns,
        setStatusMessage,
        setProgress,
      });
      setStatusMessage("Almost there, we're validating your payment!");

      if (approval) {
        const { txnHash } = approval;
        const updateTxnHash = async () => {
          try {
            const body = { txnHash, questionId: data?.data?.questionId };
            const response = await nextClient.post(`/update-txn`, body);
            return response.data;
          } catch (error) {
            setLoading(false);
            toast.error("Failed to locate transaction");
            console.error("Failed to locate transaction", error);
          }
        };
        const status = await updateTxnHash();

        if (status.success) {
          setStatusMessage("Success! Funding approved!");
          setTimeout(() => {
            toast.success("Market created successfully!");
            router.push("/");
            setLoading(false);
          }, 3000);
        }
      } else {
        setLoading(false);
        toast.error("Transaction failed. Please try again.");
      }
    },
    onError: () => {
      setLoading(false);
      toast.error("Error creating market. Please try again.");
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    if (!address) {
      setLoading(false);
      return toast.warning("Please connect your wallet!😳");
    }

    if (!title) {
      setLoading(false);
      return toast.warning("Title is required");
    }
    if (!description) {
      setLoading(false);
      return toast.warning("Rules are required");
    }
    if (!date) {
      setLoading(false);
      return toast.warning("Date are required");
    }
    if (!fundingAmount) {
      setLoading(false);
      return toast.warning("Commitment is required");
    }
    if (!image) {
      setLoading(false);
      return toast.warning("Image is required");
    }

    const formattedDate = new Date(date).toISOString();

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
        sourceOfTruth: "CNN,BBC",
      },
      fundingAmount,
    };

    setProgress(10);
    setStatusMessage("Initiating market creation");

    mutation.mutate(createMarketBody);
  };

  const inputClasses = `bg-white broder-border  border outline-black text-textPrimary placeholder:text-textPrimary font-normal w-full py-2 px-3 rounded-lg`;

  return (
    <main className=" text-black md:px-[8%]">
      <center className="text-2xl font-bold py-4">Add Market/Question</center>
      <div className="mt-8">
        <section className="mt-5 flex flex-col gap-3 ">
          <input
            type="text"
            placeholder="Enter Question/Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
          />
          <textarea
            placeholder="Enter Market Rules here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClasses}
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="LP commitment"
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
              required
              className={inputClasses}
            />
            <DatePicker date={date} setDate={setDate} />
          </div>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputClasses}
          />
          <center className="flex items-center  text-md-custom gap-5  justify-center text-textSecondary mt-7">
            <section className="flex items-center gap-2 ">
              Cost to Post <Info />
            </section>
            :<span className="text-textPrimary font-bold">100 USDC</span>
          </center>
          <Button
            className="bg-green-600 py-7 text-lg font-bold hover:bg-green-800 rounded-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Post"}
          </Button>
        </section>
      </div>
    </main>
  );
}

export default Page;
