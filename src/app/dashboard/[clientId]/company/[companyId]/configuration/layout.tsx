"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ReactNode } from "react";

interface ConfigurationLayoutProps {
  children: ReactNode;
  params: { clientId: string; companyId: string };
}

export default function ConfigurationLayout({
  children,
  params,
}: ConfigurationLayoutProps) {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink href="`/dashboard/${params.clientId}/company/${params.companyId}/configuration/users`">
            Usuários
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>

      <div>{children}</div>
    </div>
  );
}
