import { auth } from "@/auth";
import { DashboardHeader } from "@/components/template/dashboardHeader";
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
    <div>
      <div>
        <DashboardHeader
          client={client}
          company={company}
          user={session?.user}
        />
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}
