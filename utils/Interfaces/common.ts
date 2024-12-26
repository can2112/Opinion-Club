import { Transaction } from "../Interfaces/market";

export interface Icart {
  Id: string;
  title: string;
  image: string;
  options: Option[];
  questionId: string;
  description: string;
  expiryDate: Date;
  status: string;
  liquidity: string;
  tradeCount: string;
}

interface Option {
  option: string;
  optionId: number;
}

export interface SentTxn {
  data: Transaction[];
  setStatusMessage?: (arg: string) => void;
  setProgress?: (arg: number) => void;
  setLoading?: (arg: boolean) => void;
}

export interface IMarkets {
  type: "markets";
  title: string;
  image: string;
  questionId: string;
  description?: string;
  expiryDate: Date;
  status?: string;
  createdAt?: Date;
  id: number;
  liquidity: string;
  tradeVolume: string;
  tradeCount: string;
}
