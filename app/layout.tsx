import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/context";
import Navbar from "./components/nav/top/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import BottomBar from "./components/nav/BottomBar";
import Footer from "./components/footer/Footer";

export const metadata: Metadata = {
  title: "Opinion Club | Biggest Opinion Market ",
  description:
    "Empower your community with Opinion Club by creating a personalized marketplace. Customize a platform where users can share, explore, and connect over unique opinions, products, or services that resonate with their interests.",
  applicationName: "Opinion Club",
  keywords: [
    "prediction market",
    "crypto-based prediction market",
    "sport-based prediction market",
    "decentralized marketplace",
    "community-driven platform",
    "create your own market",
    "opinion trading",
    "blockchain predictions",
    "social trading",
    "crypto-enabled marketplace",
    "financial prediction market",
    "user-generated markets",
    "crypto predictions",
    "customizable market platform",
    "opinion betting",
    "tokenized marketplace",
    "web3 prediction platform",
    "crowdsourced predictions",
    "future event trading",
    "event outcome prediction",
    "peer-to-peer predictions",
  ],
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700", "400"],
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider>
          <Navbar />
          <div className=" pt-4  pb-[5%] px-4">{children}</div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <BottomBar />
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
