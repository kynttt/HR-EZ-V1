// src/app/ai-review/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeUploader } from "./ResumeUploader";
import { AssessmentSummary } from "./AssessmentSummary";
import { TopApplicantsTable, Applicant } from "@/components/AIReview/TopApplicantsTable";
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';
import type { AnalysisResult } from '@/hooks/useResumeAnalysis';

const initialApplicants: Applicant[] = [
  { id: "jane", name: "Jane Doe", email: "jane@example.com", overallMatch: 92, keySkills: ["React", "TS", "Node"] },
  { id: "john", name: "John Smith", email: "john@example.com", overallMatch: 88, keySkills: ["Vue", "Go", "K8s"] },
  { id: "alice", name: "Alice J.", email: "alice@ex.com", overallMatch: 85, keySkills: ["Angular", "Java", "SQL"] },
];

export default function AIReviewPage() {
  const { analyzeResume, loading, progress, result } = useResumeAnalysis();
  const [summary, setSummary] = useState<AnalysisResult | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);

  // Handle result updates
  useEffect(() => {
    if (result) {
      console.log("Processing new result:", result);
      setSummary(result);

      // Create new applicant entry with AI assessment results
      const newApp: Applicant = {
        id: `new-${Date.now()}`,
        name: "New Applicant",
        email: "new.applicant@example.com",
        overallMatch: result.match,
        keySkills: result.strengths.slice(0, 3),
        isNew: true,
      };

      // Update applicants list using functional update
      setApplicants(prevApplicants => {
        const updatedApplicants = [
          ...prevApplicants.map(a => ({ ...a, isNew: false })),
          newApp
        ]
          .sort((a, b) => b.overallMatch - a.overallMatch)
          .slice(0, 10);
        return updatedApplicants;
      });
    }
  }, [result]);

  const handleAnalyze = async (file: File) => {
    try {
      console.log("Starting resume analysis...");
      const jobId = window.location.pathname.split('/').pop() || 'default-job-id';
      await analyzeResume(file, jobId);
    } catch (err) {
      console.error("Error in handleAnalyze:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Uploader + Assessment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Resume Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumeUploader
                onAnalyze={handleAnalyze}
                loading={loading}
                progress={progress}
              />
            </CardContent>
          </Card>

          {summary && (
            <AssessmentSummary
              match={summary.match}
              strengths={summary.strengths}
              weaknesses={summary.weaknesses}
              pros={summary.pros}
              cons={summary.cons}
              recommendedSkills={summary.recommendedSkills}
              summary={summary}
            />
          )}
        </div>

        {/* Right Column: Always-on Ranked Table */}
        <div className="bg-muted p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Top Applicants</h2>
          <TopApplicantsTable applicants={applicants} />
        </div>
      </div>
    </div>
  );
}
