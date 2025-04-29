// src/components/Recruitment/JobDetailsPanel.tsx
"use client";

import Link from "next/link";
import { FC } from "react";
import { ChevronLeft, Share2, Bell, Edit, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageTabs, PageTab } from "@/components/Shared/PageTabs";
import { IconRobot } from "@tabler/icons-react";

interface JobDetailsPanelProps {
  jobId: string;
  title: string;
}

export const JobDetailsPanel: FC<JobDetailsPanelProps> = ({
  jobId,
  title,
}) => {
  const base = `/recruitment/jobs/${encodeURIComponent(jobId)}`;
  const tabs: PageTab[] = [
    { href: `${base}/description`, label: "Job Description", icon: Edit },
    //Temporarily disabled for demo purposes
    // { href: `${base}/recruitment/candidates`,  label: "Candidates",       icon: Users },
    { href: `/recruitment/candidates`,  label: "Candidates",       icon: Users },
    { href: `/recruitment/ai-review`,  label: "AI Assessment",       icon: IconRobot },
  ];

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/recruitment/jobs"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Job List
          </Link>
          <h1 className="text-2xl font-semibold">{title || "Full Stack Developer"}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search keyword…"
              className="w-full rounded-lg border bg-muted py-2 pl-3 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="rounded bg-muted px-1 text-xs">⌘+K</kbd>
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Page Tabs */}
      <PageTabs active={`${base}/description`} tabs={tabs} />

      {/* Description Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Job Description</h2>
          <Button variant="outline" size="sm">
            Description
          </Button>
        </div>
        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h3 className="text-lg font-medium mb-2">About Company</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We craft digital products for business and user goals. Help find
                solutions with UI/UX designs that are intuitive and in accordance
                with client business goals. We provide a high-quality service in
                UI/UX Design & Development. We craft digital products for
                businesses in achieving user goals by providing intuitive
                solutions. We have worked with a vast number of clients in many
                industries.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">What you’ll do</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Work as a UI/UX Designer for our B2B SaaS product along with
                  stakeholders.
                </li>
                <li>
                  Translate client briefs into clear, user-friendly mockups.
                </li>
                <li>
                  Validate your designs through user feedback and iterate.
                </li>
                <li>Collaborate with project managers and researchers.</li>
                <li>Conduct user research and evaluate feedback.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>3+ years of product design experience.</li>
                <li>Strong UI/UX portfolio demonstrating problem-solving.</li>
                <li>Comfortable documenting Figma files and research.</li>
                <li>Able to work independently and in fast-paced settings.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Perks & Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Flexible work hours and remote options.</li>
                <li>Health, dental, and vision insurance.</li>
                <li>Professional development budget.</li>
                <li>Company-sponsored team retreats.</li>
                <li>Equity and performance bonuses.</li>
              </ul>
            </section>
          </div>

          {/* Right sidebar */}
          <Card className="border">
            <CardContent className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Active until
              </h3>
              <p className="font-semibold">Jan 31, 2024</p>
              <Separator />
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Department:</span> Design
                </div>
                <div>
                  <span className="font-medium">Job Type:</span> Full‐time
                </div>
                <div>
                  <span className="font-medium">Location:</span> Jakarta, ID
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
