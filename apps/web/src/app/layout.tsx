import "@src/globals.css";
import { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@src/components/ui/toaster";
import { Toaster as SonnerToaster } from "@src/components/ui/sonner";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`${GeistMono.className} font-sans`}>
        <main>{children}</main>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "EnvCat",
};

export default RootLayout;
