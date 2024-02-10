import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="bg-slate-600 h-screen items-center justify-center hidden md:flex col-span-7">
        <Image
          src="/images/auth/group-business-people-having-meeting.jpg"
          alt="group-business-people-having-meeting"
          width={2000}
          height={1262}
          className="object-cover h-full opacity-80 shadow-sm"
        />
      </div>
      <div className="col-span-12 md:col-span-5">{children}</div>
    </div>
  );
}
