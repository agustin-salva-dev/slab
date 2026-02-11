import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../app/globals.css";

export const inter = Inter({
    subsets: ["latin"],
    weight: ["200", "400", "700"],
    variable: "--font-inter",
});

export const neuePower = localFont({
    src: "../fonts/NeuePower-Ultra.woff2",
    variable: "--font-neue-power",
});