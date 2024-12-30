import { Transaction } from "../types/market";

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

export interface TooltipB {
  text: string;
  action?: () => void;
  icon: React.ComponentType<{ size: number; className?: string }>;
  styles?: string;
  actionText: string;
}

export interface PollQuestionProp {
  title: string;
  postedBy: string;
  createdAt: Date | string;
  description: string;
  expiryDate?: Date | string;
  id: number;
  image?: string;
  questionId: string;
  status?: `${"IN-ACTIVE" | "ACTIVE" | "DISPUTED" | "RESOLVED"}`;
}
