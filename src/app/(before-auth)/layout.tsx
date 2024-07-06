import type { Metadata } from "next";

import "../globals.css";
import Navbar from "@/components/Navbar";




export const metadata: Metadata = {
    title: "Vidyarthi",
    description: "Buy and sell academic materials",
};

export default function BeforeAuthLayout({
    children,
}: { children: React.ReactNode }) {
    return (


        <div className="dark">
            <div >{children}</div>
        </div>




    );
}
