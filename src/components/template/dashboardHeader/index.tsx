"use client";
import { authenticationSignOutAction } from "@/app/actions/services/authAction";
import { signOut } from "@/auth";
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
import { ClientI } from "@/types/client/client";
import { CompanyI } from "@/types/company/company";
import { UserI } from "@/types/user/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardHeaderProps {
  client: ClientI;
  company: CompanyI;
  user: UserI;
}

export function DashboardHeader({
  client,
  company,
  user,
}: DashboardHeaderProps) {
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
              href={`/dashboard/${client.id}/company/${company.id}/counter`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "counter" && "underline"
              }`}
            >
              <NavigationMenuItem>Caixa</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${client.id}/company/${company.id}/transactionsList`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "transactionsList" && "underline"
              }`}
            >
              <NavigationMenuItem>Transações</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${client.id}/company/${company.id}/products`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "products" && "underline"
              }`}
            >
              <NavigationMenuItem>Produtos</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${client.id}/company/${company.id}/customers`}
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "customers" && "underline"
              }`}
            >
              <NavigationMenuItem>Clientes</NavigationMenuItem>
            </Link>
            <Link
              href={`/dashboard/${client.id}/company/${company.id}/configuration/users`}
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
            <div className="w-10 h-10 rounded-full flex justify-center items-center border-foreground border">
              <p className="text-sm text-foreground">{user.nameInitials}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Empresa: {company.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/">
              <DropdownMenuItem>Trocar de empresa</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Meus dados</DropdownMenuItem>
            <DropdownMenuItem onClick={() => authenticationSignOutAction()}>
              Sair
            </DropdownMenuItem>
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
