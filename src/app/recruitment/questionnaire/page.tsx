// src/app/recruitment/candidates/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { QuestionEditorPanel } from "@/components/AIReview/QuestionEditorPanel";

const CandidatesPage: FC = () => (
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="p-8">
        <QuestionEditorPanel  />
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default CandidatesPage;
