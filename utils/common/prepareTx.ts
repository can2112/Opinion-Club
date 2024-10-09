import { parseUnits } from "ethers";

export const prepareTxn = (data: any) => {
  const txnBody = {
    type: 2,
    chainId: data.chainId ? parseInt(data?.chainId, 16) : 1,
    nonce: data.nonce ? parseInt(data?.nonce, 16) + 1 : 0,
    to: data.to || undefined,
    gasLimit: data.gas ? parseInt(data?.gas, 16) : undefined,
    maxPriorityFeePerGas: data?.maxPriorityFeePerGas
      ? // data?.maxPriorityFeePerGas
        parseUnits(String(parseInt(data?.maxPriorityFeePerGas, 16)), "wei")
      : parseUnits("0", "wei"),
    maxFeePerGas: data.maxFeePerGas
      ? // data.maxFeePerGas
        parseUnits(String(parseInt(data?.maxFeePerGas, 16)), "wei")
      : parseUnits("0", "wei"),
    value: data.value
      ? parseUnits(String(parseInt(data?.value, 16)), "ether")
      : parseUnits("0", "ether"),
    data: data?.input || "0x",
    accessList: data?.accessList || [],
  };

  return txnBody;
};
