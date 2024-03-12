import { ChangeCompanyDialog } from "@/components/template/changeCompanyDialog";
import { DashboardHeader } from "@/components/template/dashboardHeader";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <div>
        <DashboardHeader />
        <ChangeCompanyDialog />
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}
