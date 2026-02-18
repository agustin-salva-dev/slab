import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../app/globals.css";

export const inter = Inter({
    subsets: ["latin"],
    weight: ["200", "400", "700"],
    variable: "--font-inter",
});

export const neuePower = localFont({
  src: [
    {
      path: "../fonts/NeuePower-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/NeuePower-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NeuePower-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/NeuePower-Ultra.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-power",
});