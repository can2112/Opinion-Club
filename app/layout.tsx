import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/context";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import BottomBar from "@/components/navbar/BottomBar";

export const metadata: Metadata = {
  title: "WalletConnect App",
  description: "WalletConnect App Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className="">
        <Provider >
          <Navbar />
          <div className="pb-28 pt-4 md:py-20  px-3  ">{children}</div>

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
      </body>
    </html>
  );
}
