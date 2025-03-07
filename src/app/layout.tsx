import type { Metadata } from "next";
import { Nunito, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "sonner";
const geistSans = Nunito({
  variable: "--font-geist-sans",
  weight: "variable",
  preload: true,
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  preload: true,
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YooMeet",
  description: "Seamless Video Conferencing & Collaboration",
  applicationName: "YooMeet",
  icons: "/images/logo_icon.png",
  authors: [
    {
      name: "Amit Agarwal",
      url: "https://github.com/am-it1601",
    },
  ],
  creator: "Amit Agarwal",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  keywords: [
    "Video conferencing platform",
    "Zoom alternative",
    "Online meetings",
    "Virtual collaboration tool",
    "Next.js video chat",
    "Screen sharing software",
    "Secure video calls",
    "Instant video meetings",
    "Remote team communication",
    "Scheduled video conferencing",
    "Web-based video meetings",
    "High-quality video calls",
    "Business conferencing solution",
    "Online meeting software",
    "Video call recording feature",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/images/logo_icon.png",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
