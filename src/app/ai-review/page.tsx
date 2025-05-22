// src/app/ai-review/page.tsx
"use client";

import { ResumeUploader } from '@/components/AIReview/ResumeUploader';
import { ResumeAnalysis } from '@/components/AIReview/ResumeAnalysis';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';

export default function AIReviewPage() {
  const { analyzeResume, loading, progress, result, error } = useResumeAnalysis();

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Resume Review</h1>
        <p className="text-muted-foreground mb-6">
          Upload a resume to get an AI-powered analysis of the candidate&apos;s qualifications,
          skills, and experience.
        </p>

        <ResumeUploader
          onAnalyze={analyzeResume}
          loading={loading}
          progress={progress}
        />

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        <ResumeAnalysis
          result={result}
          loading={loading}
          progress={progress}
        />
      </div>
    </div>
  );
}
