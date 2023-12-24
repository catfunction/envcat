import "@src/globals.css";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@src/components/ui/toaster";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`${GeistSans.className} font-sans`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: "EnvCat",
};

export default RootLayout;
