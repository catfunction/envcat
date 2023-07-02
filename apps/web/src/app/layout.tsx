import "@src/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "EnvCat",
};

export default RootLayout;
