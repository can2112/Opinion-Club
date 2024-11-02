import { Dispatch, SetStateAction } from "react";

export interface Price {
  optionId: number;
  cost: number;
}
export interface LogicProps {
  questionId: string | undefined | null;
  currentState: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
export interface ActionProps extends LogicProps {
  setCurrentState: Dispatch<SetStateAction<string>>;
}

export interface QuoteData {
  formattedQuote: string;
  quote: string;
}

export interface OrderBody {
  questionId: string | undefined | null;
  side: number;
  outcomeIndex: number;
  amount: string;
  fromAddress: string;
}

export interface Ticker {
  outcomeIndex: number;
  buy: string;
  sell: string;
  timestamp: Date;
}
