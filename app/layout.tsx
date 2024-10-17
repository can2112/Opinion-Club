import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import AppKitProvider from "@/context";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/navbar/Footer";

export const metadata: Metadata = {
  title: "WalletConnect App",
  description: "WalletConnect App Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className="">
        <AppKitProvider initialState={initialState}>
          <Navbar />
          <div className="py-20  px-3  ">{children}</div>

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
          <Footer />
        </AppKitProvider>
      </body>
    </html>
  );
}
