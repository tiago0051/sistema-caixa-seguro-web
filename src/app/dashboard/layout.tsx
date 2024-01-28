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
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}
