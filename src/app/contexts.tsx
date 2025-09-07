"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ContextsProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Contexts({ children }: ContextsProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
