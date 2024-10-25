import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import useTransaction from "@/utils/hooks/transaction";
import { LogicProps, OrderBody, QuoteData } from "./types";
import nextClient from "@/utils/clients/nextClient";

const useLogic = ({ questionId, currentState }: LogicProps) => {
  const [selected, setSelected] = useState("yes");
  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState("");
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [quoteErr, setQuoteErr] = useState("");
  const [isLoader, setLoader] = useState(false);
  const { waitForBlock } = useTransaction();

  const [prevVal, setPrevVal] = useState({
    amount: "",
    selected: "",
    currentState: "",
  });
  const { address, isConnected } = useAccount();
  const { sendTransaction } = useTransaction();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const fetchBalance = async () => {
    const response = await nextClient.post("/fetch-balance", {
      questionId,
      address,
    });

    if (!response?.data) {
      toast.error("Something went wrong");
    }
    return response?.data?.data;
  };

  const { data: price, refetch: reFetchPrice } = useQuery({
    queryKey: ["fetchPrice"],
    queryFn: async () => {
      const response = await nextClient.post("price", questionId);

      if (!response?.data) {
        toast.error("Something went wrong");
      }
      return response.data.data;
    },
    enabled: !!questionId,
  });

  const { data: balance, refetch } = useQuery({
    queryKey: ["fetchBalance"],
    queryFn: fetchBalance,
    enabled: !!address,
  });
  const prepBalance =
    selected == "yes" ? balance?.[0] : selected == "no" ? balance?.[1] : "";

  const fetchQuotation = async () => {
    setQuoteErr("");
    const body = {
      questionId: questionId,
      side: currentState == "Buy" ? 0 : 1,
      outcomeIndex: selected == "yes" ? 0 : 1,
      amount: amount,
    };
    const response = await nextClient.post("/quote", body);

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: fetchQuotation,
    onSuccess: (data) => {
      setQuoteData(data?.data);
    },
    onError: (err) => {
      console.log(err);
      setQuoteErr("Unable to fetch quotation");
      toast.error("Unable to fetch quotation");
    },
  });
  useEffect(() => {
    if (amount) {
      if (
        prevVal?.amount != amount ||
        prevVal.currentState != currentState ||
        prevVal.selected != selected
      ) {
        mutation.mutate();
        setPrevVal({ amount, currentState, selected });
      }
      const interval = setInterval(() => {
        mutation.mutate();
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [amount, selected, currentState]);

  const orderMutation = useMutation({
    mutationFn: async (body: OrderBody) => {
      const response = await nextClient.post("/create-order", { body });
      return response.data;
    },

    onSuccess: async (data) => {
      const txnStatus = await sendTransaction({
        data: data.data,
      });
      const txnReceipt = await waitForBlock({
        txnHash: txnStatus?.txnHash,
        number: 1,
      });
      if (txnReceipt) {
        const balance = await refetch();
        if (balance) {
          setLoader(false);
          toast.success("Transaction successful");
        } else {
          setLoader(false);
          toast.error("Something went wrong");
        }
      }
    },
    onError: () => {
      setLoader(false);
      toast.error("Something went wrong");
    },
  });

  const handleOrder = async () => {
    setLoader(true);
    if (!address || !isConnected) {
      setLoader(false);
      return toast.warning("Please connect your wallet");
    }

    if (currentState === "Sell" && amount < prepBalance) {
      setLoader(false);
      return toast.warning("Not enough balance ");
    }

    if (!amount) {
      setLoader(false);
      return toast.warning("Please enter amount");
    }
    const orderBody = {
      questionId: questionId,
      side: currentState == "Buy" ? 0 : 1,
      outcomeIndex: selected == "yes" ? 0 : 1,
      amount: amount,
      fromAddress: address,
    };
    const lpBody = {
      questionId: questionId,
      fundingAmount: amount,
      fromAddress: address,
    };
    const lpUrl =
      currentState === "Add"
        ? "add-fund"
        : questionId === "Remove"
        ? "remove-fund"
        : "";

    if (!lpUrl) {
      return orderMutation.mutate(orderBody);
    } else if (lpUrl) {
      return LPMutation.mutate({ url: lpUrl, body: lpBody });
    }
  };

  const LPMutation = useMutation({
    mutationFn: async ({
      url,
      body,
    }: {
      url: string;
      body: {
        questionId: string | undefined | null;
        fundingAmount: string;
        fromAddress: string;
      };
    }) => {
      const response = await nextClient.post(url, body);
      return response.data;
    },

    onSuccess: async (data) => {
      const txnStatus = await sendTransaction({
        data: data.data,
      });

      if (txnStatus) {
        setLoader(false);
        toast.success("Transaction successful");
      } else {
        setLoader(false);
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      setLoader(false);
      toast.error("Something went wrong");
    },
  });

  return {
    handleOrder,
    selected,
    setSelected,
    isChecked,
    toggleCheckbox,
    amount,
    setAmount,
    quoteErr,
    quoteData,
    isLoader,
    prepBalance,
    price,
    reFetchPrice,
  };
};

export default useLogic;
