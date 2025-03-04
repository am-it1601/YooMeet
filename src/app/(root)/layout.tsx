import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import React from "react";
import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
      <Toaster richColors />
    </main>
  );
};

export default RootLayout;
