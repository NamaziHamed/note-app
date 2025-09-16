import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import Provider from "@/components/providers/Provider";

const roboto = Roboto_Serif({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auth Template",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
