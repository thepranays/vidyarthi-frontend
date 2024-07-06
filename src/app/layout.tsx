import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "../components/wrapper/SessionProviderWrapper";
export const metadata: Metadata = {
    title: "Vidyarthi",
    description: "Buy and sell academic materials",
};
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>

                <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
            </head>
            <body className={inter.className}>
                <SessionProviderWrapper>
                    <div className="dark h-screen w-screen">{children}</div>

                </SessionProviderWrapper>

            </body>
        </html>
    )
}