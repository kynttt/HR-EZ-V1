// src/app/schedule/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ScheduleBoard } from "@/components/Schedule/ScheduleBoard";

const SchedulePage: FC = () => (
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="p-6">
        <ScheduleBoard />
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default SchedulePage;
