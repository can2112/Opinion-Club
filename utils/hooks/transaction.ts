import { parseUnits } from "ethers";
import { useAccount, useConnect } from "wagmi";
import { SentTxn } from "@/utils/Interfaces/common";
import { useEthersSigner } from "./ethers";

const useTxn = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const signer = useEthersSigner();

  const prepareTxn = (data: any) => {
    const txnBody = {
      type: 2,
      chainId: data.chainId ? parseInt(data?.chainId, 16) : 1,
      nonce: data.nonce ? parseInt(data?.nonce, 16) + 1 : 0,
      to: data.to || undefined,
      gasLimit: data.gas ? parseInt(data?.gas, 16) : undefined,
      maxPriorityFeePerGas: data?.maxPriorityFeePerGas
        ? parseUnits(String(parseInt(data?.maxPriorityFeePerGas, 16)), "wei")
        : parseUnits("0", "wei"),
      maxFeePerGas: data.maxFeePerGas
        ? parseUnits(String(parseInt(data?.maxFeePerGas, 16)), "wei")
        : parseUnits("0", "wei"),
      value: data.value
        ? parseUnits(String(parseInt(data?.value, 16)), "ether")
        : parseUnits("0", "ether"),
      data: data?.input || "0x",
      accessList: data?.accessList || [],
    };

    return txnBody;
  };

  const sendTransaction = async ({
    data,
  }: SentTxn): Promise<{ txnHash: string | undefined } | null | undefined> => {
    try {
      if (!isConnected) {
        const connector = connectors[0];
        connect({ connector });
      }
      const transactionData = data[0];
      const approveBody = prepareTxn(transactionData);
      const sentTx = await signer?.sendTransaction(approveBody);

      // TODO: read this sentTx object and get the txnHash and update the loader

      // waiting logic in case timeout logic doesn't work
      // const confirm = await signer?.provider.waitForTransaction(
      //   sentTx?.hash || "",
      //   1
      // );
      //

      const wait = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 5000);
        });
      };

      const waiting = await wait();

      if (waiting) {
        const fundData = data?.[1];
        const fundTxBody = prepareTxn(fundData);
        const fundTxHx = await signer?.sendTransaction(fundTxBody);
        return {
          txnHash: fundTxHx?.hash || "",
        };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { sendTransaction };
};
export default useTxn;
