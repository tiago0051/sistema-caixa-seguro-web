import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="bg-secondary h-screen flex items-center justify-center col-span-7"></div>
      <div className="col-span-5">{children}</div>
    </div>
  );
}
