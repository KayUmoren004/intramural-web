"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "sonner";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={null}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={true}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <Sonner />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
