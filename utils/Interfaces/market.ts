export interface Transaction {
  type: string;
  chainId: string;
  nonce: string;
  to: string;
  gas: string;
  gasPrice: string | null;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
  value: string;
  input: string;
  accessList: any[];
  v: string;
  r: string;
  s: string;
  yParity: string;
  hash: string;
}

export interface Data {
  txns: Transaction[];
  questionId: string;
}

export interface ApiResponse {
  data: Data;
  success: boolean;
}

interface Option {
  option: string;
  optionId: number;
}

interface Market {
  title: string;
  image: string;
  options: Option[];
  description: string;
  expiryDate: string;
  sourceOfTruth: string;
}

export interface CreateMarketBody {
  fromAddress: string;
  market: Market;
  fundingAmount: string;
}
