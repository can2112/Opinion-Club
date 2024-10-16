import { parseUnits } from "ethers";
import { useAccount, useConnect } from "wagmi";
import { SentTxn } from "@/utils/Interfaces/common";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";
import { Transaction } from "../Interfaces/market";
import { toast } from "react-toastify";

const useTransaction = () => {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();

  const prepareTxn = async (data: Transaction) => {
    let nonce = await signer?.provider.getTransactionCount(address || "");
    if (nonce === undefined) {
      toast.error("Something went wrong");
      return console.log("unable to fetch nonce");
    }
    nonce = nonce;
    let txnNonce = "0x" + nonce.toString(16);
    const txnBody = {
      type: 2,
      chainId: data.chainId ? parseInt(data?.chainId, 16) : 1,
      nonce: parseInt(txnNonce),
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

  function clientToSigner(client: Client<Transport, Chain, Account>) {
    const { account, chain, transport } = client;

    const network = {
      chainId: chain?.id,
      name: chain?.name,
      ensAddress: chain?.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address);
    return signer;
  }

  /** Hook to convert a viem Wallet Client to an ethers.js Signer. */
  function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: client } = useConnectorClient<Config>({ chainId });
    return useMemo(
      () => (client ? clientToSigner(client) : undefined),
      [client]
    );
  }

  const sendTransaction = async ({
    data,
    setStatusMessage,
    setProgress,
  }: SentTxn): Promise<{ txnHash: string | undefined } | null | undefined> => {
    try {
      let signedTxn = false;
      if (setStatusMessage)
        setStatusMessage("Hang on, we’re sending the wallet request!");
      if (setProgress) setProgress(20);
      if (!isConnected) {
        const connector = connectors[0];
        connect({ connector });
      }
      if (data.length == 1) {
        signedTxn = true;
      }
      let confirm;
      if (!signedTxn) {
        const transactionData = data[0];
        const approveBody = await prepareTxn(transactionData);
        if (approveBody) {
          const sentTx = await signer?.sendTransaction(approveBody);
          if (sentTx) {
            if (setProgress) setProgress(50);
            if (setStatusMessage)
              setStatusMessage("You’re halfway through, keep going!");
          }

          confirm = await signer?.provider.waitForTransaction(
            sentTx?.hash || "",
            1
          );
        }
      }

      if (confirm || signedTxn) {
        if (setProgress) setProgress(50);
        if (setStatusMessage) {
          setStatusMessage("So close! Almost complete!");
        }

        const fundData = signedTxn ? data[0] : data[1];
        const fundTxBody = await prepareTxn(fundData);

        if (fundTxBody) {
          const fundTxHx = await signer?.sendTransaction(fundTxBody);
          return {
            txnHash: fundTxHx?.hash || "",
          };
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { sendTransaction };
};
export default useTransaction;
