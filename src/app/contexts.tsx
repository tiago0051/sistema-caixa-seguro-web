"use client";

import { Toaster } from "@/components/ui/toaster";

interface ContextsProps {
  children: React.ReactNode;
}

export function Contexts({ children }: ContextsProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
