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
}

interface Option {
  option: string;
  optionId: number;
}

export interface SentTxn {
  data: Transaction[];
  setStatusMessage?: (arg: string) => void;
  setProgress?: (arg: number) => void;
}
