"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ParamsI } from "@/types/params";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function DashboardHeader() {
  const { clientId, companyId } = useParams<ParamsI>();
  const pathname = usePathname();
  const selectedPage = pathname.split("/")[2];

  return (
    <div className="py-3 px-6 bg-secondary flex justify-between items-center shadow-sm">
      <div className="flex gap-8">
        <Image
          src="/images/logo.svg"
          alt="Logo Sistema caixa seguro"
          width={40}
          height={40}
        />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-8">
            <Link
              href={`/dashboard/${clientId}/company/${companyId}/counter`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "counter" && "underline"
              }`}
            >
              <NavigationMenuItem>Caixa</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${clientId}/company/${companyId}/transactionsList`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "transactionsList" && "underline"
              }`}
            >
              <NavigationMenuItem>Transações</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${clientId}/company/${companyId}/products`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "products" && "underline"
              }`}
            >
              <NavigationMenuItem>Produtos</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${clientId}/company/${companyId}/customers`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "customers" && "underline"
              }`}
            >
              <NavigationMenuItem>Clientes</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${clientId}/company/${companyId}/configuration`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "configuration" && "underline"
              }`}
            >
              <NavigationMenuItem>Configuração</NavigationMenuItem>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Empresa: Móveis Papucaia LTDA</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="?showChangeCompanyDialog=true">
              <DropdownMenuItem>Trocar de empresa</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Meus dados</DropdownMenuItem>
            <Link href="/auth/signIn">
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/suporte"
          className="text-secondary-foreground hover:underline"
        >
          Ajuda
        </Link>
      </div>
    </div>
  );
}
