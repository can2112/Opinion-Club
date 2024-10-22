// import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "Opinion Club",
  projectId: projectId || "",
  chains: [baseSepolia, base],
  ssr: true,
});

