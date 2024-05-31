import Image from "next/image";
import Link from "next/link";
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
      <div className="col-span-12 md:col-span-5">
        <div className="flex flex-col justify-between h-screen items-center p-8">
          <div className="flex justify-end w-full">
            <Link href="/suporte">Suporte</Link>
          </div>
          <div className="items-center justify-center gap-8 flex flex-col max-w-sm w-full">
            <div className="mx-auto bg-secondary/80 w-24 h-24 rounded-full flex justify-center items-center shadow-md shadow-black/10">
              <Image
                src="/images/logo.svg"
                alt="Logo Sistema caixa seguro"
                width={60}
                height={60}
              />
            </div>

            {children}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
