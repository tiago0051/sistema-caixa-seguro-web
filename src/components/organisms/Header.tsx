"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton: boolean;
  children?: ReactNode;
}

export const HeaderOrganism: FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton,
  children,
}) => {
  const router = useRouter();

  return (
    <header className="mb-8">
      {showBackButton && (
        <button
          onClick={() => router.back()}
          className="flex items-center text-xs"
        >
          <IoArrowBack className="mr-2" />
          Voltar
        </button>
      )}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm">{subtitle}</p>}
        </div>

        <div>{children}</div>
      </div>
      {/* Espaço vazio para manter o layout quando o botão não está presente */}
      {!showBackButton && <div className="w-10" />}
    </header>
  );
};
