import { auth } from "@/auth";
import { DashboardHeader } from "@/components/template/dashboardHeader";
import { getClient } from "@/repository/client";
import { getCompany } from "@/repository/company";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  params: {
    clientId: string;
    companyId: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const session = await auth();
  const client = await getClient(params.clientId);
  const company = await getCompany(params.companyId);

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
