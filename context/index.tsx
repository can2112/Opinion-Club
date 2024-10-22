"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";

import { config, projectId } from "@/config/rainbow";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

export default function Provider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}> {children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
