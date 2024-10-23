"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConfigurationLayoutProps {
  children: ReactNode;
}

export default function ConfigurationLayout({
  children,
}: ConfigurationLayoutProps) {
  const pathname = usePathname();
  const params = useParams();

  const links = [
    {
      title: "Usuários",
      href: `/dashboard/${params.clientId}/company/${params.companyId}/configuration/users`,
    },
    {
      title: "Contas do caixa",
      href: `/dashboard/${params.clientId}/company/${params.companyId}/configuration/accounts`,
    },
  ];

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Configurações</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link
              href={link.href}
              data-active={link.href === pathname}
              className="data-[active=true]:font-semibold data-[active=true]:text-primary"
              key={link.title}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  );
}
