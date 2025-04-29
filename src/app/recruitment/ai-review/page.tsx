// src/app/recruitment/candidates/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

import AIAssessmentOverAll from "@/components/AIReview/AIAssessmentOverAll";

const CandidatesPage: FC = () => (
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="p-8">
        <AIAssessmentOverAll />
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default CandidatesPage;
