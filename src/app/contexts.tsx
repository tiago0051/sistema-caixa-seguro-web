"use client";

import { Toaster } from "@/components/ui/toaster";
import { ReactElement } from "react";

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
