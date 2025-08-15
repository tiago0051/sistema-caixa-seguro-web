"use client";

import { FC, ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export const HeaderOrganism: FC<HeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <header>
      <div className="flex justify-between items-start mb-8 flex-col md:flex-row gap-2">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm">{subtitle}</p>}
        </div>

        <div>{children}</div>
      </div>
    </header>
  );
};
