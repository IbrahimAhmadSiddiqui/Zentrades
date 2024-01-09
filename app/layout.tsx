import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/provider/data-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task 1",
  description: "Fetching API Data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
