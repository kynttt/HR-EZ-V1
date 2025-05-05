// src/app/ai-review/page.tsx
"use client";

import { useState } from "react";
import { ResumeUploader } from "@/components/AIReview/ResumeUploader";
import { AssessmentSummary } from "@/components/AIReview/AssessmentSummary";
import {
  TopApplicantsTable,
  Applicant,
} from "@/components/AIReview/TopApplicantsTable";
import { PageTab, PageTabs } from "../Shared/PageTabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEyeQuestion, IconFilter, IconMessageCircleQuestion, IconRobot, IconVideo } from "@tabler/icons-react";
import { Bell, ChevronLeft, Edit, Share2, Users } from "lucide-react";
import Link from "next/link";

const initialApplicants: Applicant[] = [
  { id: "jane", name: "Jane Doe",   email: "jane@example.com",  overallMatch: 92, keySkills: ["React","TS","Node"] },
  { id: "john", name: "John Smith", email: "john@example.com",  overallMatch: 88, keySkills: ["Vue","Go","K8s"] },
  { id: "alice",name: "Alice J.",   email: "alice@ex.com",     overallMatch: 85, keySkills: ["Angular","Java","SQL"] },
];

export default function AIReviewPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<null | {
    match: number;
    strengths: string[];
    weaknesses: string[];
    pros: string[];
    cons: string[];
    recommendedSkills: string[];
  }>(null);
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);

  const handleAnalyze = (file: File) => {
    setLoading(true);
    setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + 10, 100)), 200);

    setTimeout(() => {
      clearInterval(iv);
      setLoading(false);

      const newApp: Applicant = {
        id: file.name + Date.now(),
        name: file.name.replace(/\.\w+$/, ""),
        email: `${file.name.split(".")[0]}@example.com`,
        overallMatch: 89,
        keySkills: ["Docker","AWS Fundamentals","GraphQL"],
        isNew: true,
      };

      // merge, clear previous `isNew`, sort by match desc
      const merged = [
        ...applicants.map(a => ({ ...a, isNew: false })),
        newApp
      ].sort((a,b) => b.overallMatch - a.overallMatch);
      setApplicants(merged);

      setSummary({
        match: newApp.overallMatch,
        strengths: [
          "5 yrs React experience",
          "Strong problem-solving",
          "Excellent communication"
        ],
        weaknesses: [
          "Limited backend exposure",
          "No cloud certifications"
        ],
        pros: ["Fast learner","Team player"],
        cons: ["Needs coaching on CI/CD"],
        recommendedSkills: newApp.keySkills,
      });
    }, 2200);
  };
  const jobId = "default-job-id"; // Replace with actual job ID logic
  const base = `/recruitment/jobs/${encodeURIComponent(jobId)}`;
 
    
    const tabs: PageTab[] = [
        { href: `${base}/description`, label: "Job Description", icon: Edit },
        { href: `/recruitment/questionnaire`, label: "AI Questionnaires", icon: IconMessageCircleQuestion },
        { href: `/recruitment/ai-review`, label: "AI Assessment", icon: IconRobot },
        { href: `/recruitment/recordings`, label: "AI Recordings", icon: IconVideo },
        //Temporarily disabled for demo purposes
    // { href: `${base}/recruitment/candidates`,  label: "Candidates",       icon: Users },
        { href: `/recruitment/candidates`, label: "Candidates", icon: Users },
      ];
  return (
    

        <div className="space-y-6 ">
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
          <h1 className="text-2xl font-semibold">Full Stack Developer</h1>
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
                  <PageTabs 
                  // active={`${base}/description`} 
                  active={`/recruitment/ai-review`}
                  tabs={tabs} />
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">AI Assessment</h1>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Search name or email here…" className="max-w-sm" />
                      <Button variant="outline" size="sm">
                        <IconFilter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                      <Button>+ Add Candidate</Button>
                    </div>
                  </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column: Uploader + Assessment */}
            <div className="col-span-1 space-y-6">
              <ResumeUploader
                onAnalyze={handleAnalyze}
                loading={loading}
                progress={progress}
              />
              {summary && (
                <AssessmentSummary
                  match={summary.match}
                  strengths={summary.strengths}
                  weaknesses={summary.weaknesses}
                  pros={summary.pros}
                  cons={summary.cons}
                  recommendedSkills={summary.recommendedSkills}
                />
              )}
            </div>

            {/* Right Column: Always-on Ranked Table */}
            <div className="col-span-1 bg-muted p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Top Applicants</h2>
              <TopApplicantsTable applicants={applicants} />
            </div>
          </div>
        </div>
   
  );
}
