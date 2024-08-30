import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppContextProvider from "../context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Source It",
  description: "Make your project Open Source & Build in Public",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster />
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
