import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ReactNode } from "react";

interface ConfigurationLayoutProps {
  children: ReactNode;
}

export default function ConfigurationLayout({
  children,
}: ConfigurationLayoutProps) {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Usuarios</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Criar usuário</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div>{children}</div>
    </div>
  );
}
