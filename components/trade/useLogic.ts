import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Iprops {
  questionId: string | null | undefined;
  currentState: string;
}

interface QuoteData {
  formattedQuote: string;
  quote: string;
}

const useLogic = ({ questionId, currentState }: Iprops) => {
  const [selected, setSelected] = useState("yes");
  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState("");
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [quoteErr, setQuoteErr] = useState("");
  const [prevVal, setPrevVal] = useState({
    amount: "",
    selected: "",
    currentState: "",
  });

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const fetchQuotation = async () => {
    setQuoteErr("");
    const body = {
      questionId: questionId,
      side: selected == "yes" ? 0 : 1,
      outcomeIndex: currentState == "Buy" ? 0 : 1,
      amount: amount,
    };
    const url = `${process.env.NEXT_PUBLIC_API}/quote`;
    const response = await axios.post(url, body);

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
    mutationFn: async (body) => {
      const response = await axios.post("/");
      return response.data;
    },
    onSuccess: (data) => {
			console.log(data);
			
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleOrder = async () => {
    if (!amount) return toast.warning("Please enter amount");
  };

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
  };
};

export default useLogic;
