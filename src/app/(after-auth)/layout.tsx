import type { Metadata } from "next";

import "../globals.css";
import Navbar from "@/components/Navbar";




export const metadata: Metadata = {
  title: "Vidyarthi",
  description: "Buy and sell academic materials",
};

export default function AfterAuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (


    <div className="dark flex flex-col h-screen w-screen">

      <div className="h-1/10"><Navbar /></div>
      <div><hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" /></div>

      <div className="h-full m-5">{children}</div>

    </div >


  );
}
