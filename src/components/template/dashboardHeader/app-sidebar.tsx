import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { FiChevronRight, FiEdit, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { DropDownContent } from "./components/DropDownContent";

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
  user: UserI;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  client,
  company,
  user,
}) => {
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

      <SidebarFooter>
        <Link
          href="/"
          className="flex justify-between items-center hover:text-primary"
        >
          <p className="text-base">{company.name}</p>
          <FiEdit />
        </Link>
        <Separator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Avatar className="border border-separate">
                  <AvatarFallback>{user.nameInitials}</AvatarFallback>
                  <AvatarImage />
                </Avatar>
                <p className="text-base truncate text-left w-full">
                  {user.name}
                </p>
              </div>
              <FiChevronRight className="text-base" />
            </Button>
          </DropdownMenuTrigger>
          <DropDownContent />
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
