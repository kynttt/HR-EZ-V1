// src/components/ai-review/AssessmentSummary.tsx
"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AnalysisResult } from "@/hooks/useResumeAnalysis";

interface AssessmentSummaryProps {
  match: number;
  strengths: string[];
  weaknesses: string[];
  pros: string[];
  cons: string[];
  recommendedSkills: string[];
  summary: AnalysisResult;
}

export const AssessmentSummary: FC<AssessmentSummaryProps> = ({
  match,
  strengths,
  weaknesses,
  pros,
  cons,
  recommendedSkills,
  summary,
}) => {
  return (
    <div className="space-y-6">
      {/* Match Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Match</CardTitle>
          <CardDescription>Candidate's match score for the position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Match Score</span>
              <Badge variant="outline" className="text-lg">
                {match}%
              </Badge>
            </div>
            <Progress value={match} max={100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
            <CardDescription>Key areas of expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {strength}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
            <CardDescription>Skills that need development</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {weakness}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pros</CardTitle>
            <CardDescription>Positive aspects of the candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {pro}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cons</CardTitle>
            <CardDescription>Areas of concern</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {con}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Skills</CardTitle>
          <CardDescription>Skills to focus on for improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recommendedSkills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Assessment */}
      {summary.assessment && (
        <Card>
          <CardHeader>
            <CardTitle>AI Assessment</CardTitle>
            <CardDescription>Detailed analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Opening */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground">
                {summary.assessment.Opening}
              </p>
            </div>

            <Separator />

            {/* Main Assessment */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Assessment</h3>
              <p className="text-sm text-muted-foreground">
                {summary.assessment['Main Assessment']}
              </p>
            </div>

            <Separator />

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-600">Onboarding Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    {summary.assessment.Recommendations['Onboarding plan']}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600">Training</h4>
                  <p className="text-sm text-muted-foreground">
                    {summary.assessment.Recommendations.Training}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600">Early Wins</h4>
                  <p className="text-sm text-muted-foreground">
                    {summary.assessment.Recommendations['Early wins']}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600">Longer-term Development</h4>
                  <p className="text-sm text-muted-foreground">
                    {summary.assessment.Recommendations['Longer-term development']}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

