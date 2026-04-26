/* Third-party imports. */
import localFont from "next/font/local";

/**
 * The sans-serif font, used in annotations.
 * Should be: Satoshi.
 */
export const sansSerifFont = localFont({
  src: [
    /* Light 300. */
    {
      path: "./satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    /* Regular 400. */
    {
      path: "./satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    /* Medium 500. */
    {
      path: "./satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    /* Bold 700.*/
    {
      path: "./satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    /* Black 900. */
    {
      path: "./satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans-serif",
});
