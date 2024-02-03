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
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const selectedPage = pathname.split("/")[2];

  return (
    <div className="py-3 px-6 bg-secondary flex justify-between items-center shadow-sm">
      <div>
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <Link
              href="/dashboard/counter"
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "counter" && "underline"
              }`}
            >
              <NavigationMenuItem>Caixa</NavigationMenuItem>
            </Link>
            <Link
              href="/dashboard/products"
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "products" && "underline"
              }`}
            >
              <NavigationMenuItem>Produtos</NavigationMenuItem>
            </Link>
            <Link
              href="/dashboard/customers"
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "customers" && "underline"
              }`}
            >
              <NavigationMenuItem>Clientes</NavigationMenuItem>
            </Link>
            <Link
              href="/dashboard/configuration"
              className={`hover:underline text-secondary-foreground ${
                selectedPage === "configuration" && "underline"
              }`}
            >
              <NavigationMenuItem>Configuração</NavigationMenuItem>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
