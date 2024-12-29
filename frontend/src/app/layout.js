import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Menu Task",
  description: "Menu Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative h-[100vh]  pr-0   flex md:flex-row flex-col  gap-1 overflow-hidden`}
      >
        <Sidebar />
        <div className="overflow-auto   w-full p-1 pt-0 ">
          <Suspense fallback={<Loading />}>
           
            <Providers>{children}</Providers>
          </Suspense>

        </div>
        <Toaster />
      </body>
    </html>
  );
}
