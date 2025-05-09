// app/employee/org-chart/page.tsx
import { FC } from "react";
import { OrgChartTree } from "@/components/Employee/OrgChartTree";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function OrgChartPage() {
  return (

<SidebarProvider>       
<AppSidebar variant="inset" />
<SidebarInset>
  <SiteHeader />
  <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="p-8">
      <OrgChartTree />
    </div>
      </div>
    </div>
  </div>
</SidebarInset>
</SidebarProvider>
  );
}
