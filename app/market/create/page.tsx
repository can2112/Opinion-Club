"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect } from "wagmi";
import { parseUnits } from "ethers";
import { useEthersSigner } from "@/hooks/ethers";
import { useRouter } from "next/navigation";

function Page() {
  const [title, setTitle] = useState("");
  const [fundingAmount, setFundingAmount] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [sourceOfTruth, setSourceOfTruth] = useState("");
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  const router = useRouter();

  const signer = useEthersSigner();

  const sendTransaction = async ({
    data,
  }: any): Promise<
    | { txnHash: string | undefined; questionId: string | undefined }
    | null
    | undefined
  > => {
    try {
      if (!isConnected) {
        const connector = connectors[0];
        connect({ connector });
      }
      const transactionData = data?.txns?.[0];

      const tx = {
        type: 2,
        chainId: transactionData.chainId
          ? parseInt(transactionData.chainId, 16)
          : 1,
        nonce: transactionData.nonce ? parseInt(transactionData.nonce, 16) : 0,
        to: transactionData.to || undefined,
        gasLimit: transactionData.gas
          ? parseInt(transactionData.gas, 16)
          : undefined,
        maxPriorityFeePerGas: transactionData.maxPriorityFeePerGas
          ? parseUnits(
              String(parseInt(transactionData.maxPriorityFeePerGas, 16)),
              "wei"
            )
          : parseUnits("0", "wei"),
        maxFeePerGas: transactionData.maxFeePerGas
          ? parseUnits(
              String(parseInt(transactionData.maxFeePerGas, 16)),
              "wei"
            )
          : parseUnits("0", "wei"),
        value: transactionData.value
          ? parseUnits(String(parseInt(transactionData.value, 16)), "ether")
          : parseUnits("0", "ether"),
        data: transactionData.input || "0x",
        accessList: transactionData.accessList || [],
      };

      const sentTx = await signer?.sendTransaction(tx);
      const confirm = await signer?.provider.waitForTransaction(
        sentTx?.hash || "",
        1
      );

      if (confirm) {
        const fundData = data?.txns?.[1];
        const fundTx = {
          type: 2,
          chainId: fundData.chainId ? parseInt(fundData.chainId, 16) : 1,
          nonce: fundData.nonce ? parseInt(fundData.nonce, 16) + 1 : 0,
          to: fundData.to || undefined,
          gasLimit: fundData.gas ? parseInt(fundData.gas, 16) : undefined,
          maxPriorityFeePerGas: fundData.maxPriorityFeePerGas
            ? parseUnits(
                String(parseInt(fundData.maxPriorityFeePerGas, 16)),
                "wei"
              )
            : parseUnits("0", "wei"),
          maxFeePerGas: fundData.maxFeePerGas
            ? parseUnits(String(parseInt(fundData.maxFeePerGas, 16)), "wei")
            : parseUnits("0", "wei"),
          value: fundData.value
            ? parseUnits(String(parseInt(fundData.value, 16)), "ether")
            : parseUnits("0", "ether"),
          data: fundData.input || "0x",
          accessList: fundData.accessList || [],
        };

        const fundTxHx = await signer?.sendTransaction(fundTx);
        return { txnHash: fundTxHx?.hash || "", questionId: data?.questionId };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const mutation = useMutation({
    mutationFn: async (createMarketBody: any) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/create-market`,
        createMarketBody
      );
      return response.data;
    },
    onSuccess: async (data) => {
      const approval = await sendTransaction({ data: data?.data });

      if (approval) {
        const { txnHash, questionId } = approval;
        const updateTxnHash = async () => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API}/update-txn`,
              { txnHash, questionId }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to update TxnHash", error);
          }
        };
        const status = await updateTxnHash();

        if (status.success) {
          toast.success("Market created successfully!");
          router.push("/");
        }
      } else {
        toast.error("Transaction failed. Please try again.");
      }
    },
    onError: () => {
      toast.error("Error creating market. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      return toast.info("Please connect your wallet!😳");
    }

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

    mutation.mutate(createMarketBody);
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
          onChange={(e) => setFundingAmount(e.target.value)}
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

export default Page;
