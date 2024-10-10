import { Transaction } from "../Interfaces/market";
import { ConnectMutate } from "wagmi/query";
import { Config, Connector } from "wagmi";
import { JsonRpcSigner } from "ethers";

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
}
