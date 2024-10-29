import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ClientI } from "@/types/client/client";
import { CompanyI } from "@/types/company/company";

interface NavSubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  items: NavSubItem[];
}

interface AppSidebarProps {
  client: ClientI;
  company: CompanyI;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ client, company }) => {
  const data: { navMain: NavItem[] } = {
    navMain: [
      {
        title: "Caixa",
        url: "#",
        items: [
          {
            title: "Balcão",
            url: "#",
          },
          {
            title: "Movimentações",
            url: "#",
          },
        ],
      },
      {
        title: "Produto",
        url: "#",
        isActive: true,
        items: [
          {
            title: "Centros de Distribuição",
            url: `/dashboard/${client.id}/company/${company.id}/distributionCenters`,
          },
        ],
      },
      {
        title: "Configurações",
        url: "#",
        items: [
          {
            title: "Usuários",
            url: `/dashboard/${client.id}/company/${company.id}/configuration/users`,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Image
                src="/images/logo.svg"
                alt="Logo Sistema caixa seguro"
                width={40}
                height={40}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
