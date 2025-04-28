// src/app/recruitment/jobs/[id]/description/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { JobDetailsPanel } from "@/components/Recruitment/JobDetailsPanel";

interface JobDescriptionPageProps {
  params: { id: string };
}

export default function JobDescriptionPage({ params }: JobDescriptionPageProps) {
  // Use the dynamic route slug as the jobId…
  const jobId = params.id;

  // …and turn it into a human-friendly title, e.g. "ui-ux-designer" → "Ui Ux Designer"
  const title = jobId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-8">
              <div className="px-8">
                <JobDetailsPanel jobId={jobId} title={title} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
