import localFont from "next/dist/compiled/@next/font/dist/local";


export const fontSans = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/IRANSansX-Thin.woff",
      weight: "100",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-UltraLight.woff",
      weight: "200",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Light.woff",
      weight: "300",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Regular.woff",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Medium.woff",
      weight: "500",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-DemiBold.woff",
      weight: "600",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Bold.woff",
      weight: "700",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Black.woff",
      weight: "900",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-ExtraBlack.woff",
      weight: "1000",
    },
  ],
  variable: "--font-ir-sans",
});
