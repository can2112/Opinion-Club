import { parseUnits } from "ethers";
import { useAccount, useConnect } from "wagmi";
import { SentTxn } from "@/utils/Interfaces/common";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useMemo } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { type Config, useConnectorClient } from "wagmi";
import { Transaction } from "../Interfaces/market";

const useTransaction = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const signer = useEthersSigner();

  const prepareTxn = (data: Transaction) => {
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
export default useTransaction;
