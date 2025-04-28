// src/app/inbox/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { InboxBoard } from "@/components/Inbox/InboxBoard";

const InboxPage: FC = () => (
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="h-full">
        <InboxBoard />
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default InboxPage;
