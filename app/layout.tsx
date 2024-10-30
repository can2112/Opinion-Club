import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/context";
import Navbar from "./components/nav/top/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import BottomBar from "./components/nav/BottomBar";

export const metadata: Metadata = {
  title: "Opinion Club",
  description:
    "Opinion Club empowers you to create and customize your own marketplace, offering users the ability to share and explore unique opinions, products, or services tailored to their preferences.",
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
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <div className="pb-44 pt-4 md:py-20  ">{children}</div>
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
