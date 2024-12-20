import { auth } from "@/auth";
import { AppSidebar } from "@/components/template/dashboardHeader/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getClient } from "@/services/db/client";
import { getCompany } from "@/services/db/company";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Params = Promise<{
  clientId: string;
  companyId: string;
}>;

interface DashboardLayoutProps {
  children: ReactNode;
  params: Params;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { clientId, companyId } = await params;

  const session = await auth();
  const client = await getClient(clientId);
  const company = await getCompany(companyId);

  if (!client || !company) return redirect("/");
  if (!session?.user) return redirect("/auth/signIn");

  return (
    <SidebarProvider>
      <AppSidebar client={client} company={company} user={session.user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
