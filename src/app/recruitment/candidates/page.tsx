// src/app/recruitment/candidates/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { CandidateBoard } from "@/components/Recruitment/CandidateBoard";

const CandidatesPage: FC = () => (
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="p-8">
        <CandidateBoard jobId="123" title="Software Engineer" />
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default CandidatesPage;
