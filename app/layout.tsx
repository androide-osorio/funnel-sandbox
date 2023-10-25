import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Funnel Inspector",
  description: "Preview your exported funnels in a Breeze!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen dark:bg-slate-800`}>
        {children}
      </body>
    </html>
  );
}
