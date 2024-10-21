"use client";

import React, { ReactNode } from "react";
import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider, type Config } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
import {
  arbitrum,
  base,
  baseSepolia,
  mainnet,
  polygon,
  allChains,
} from "@reown/appkit/networks";

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "appkit-example-scroll",
  description: "AppKit Example - Scroll",
  url: "https://scrollapp.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: allChains,
  defaultNetwork: base,
  metadata: metadata,
  features: {
    swaps: false,
    onramp: false,
    email: false,
    socials: false,
  },
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
