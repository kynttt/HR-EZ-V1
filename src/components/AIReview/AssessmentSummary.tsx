// src/components/ai-review/AssessmentSummary.tsx
"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Search,
} from "lucide-react";

interface AssessmentSummaryProps {
  match: number;
  strengths: string[];
  weaknesses: string[];
  pros: string[];
  cons: string[];
  recommendedSkills: string[];
}

export const AssessmentSummary: FC<AssessmentSummaryProps> = ({
  match,
  strengths,
  weaknesses,
  pros,
  cons,
  recommendedSkills,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Assessment Summary</CardTitle>
        <CardDescription>
          High-level overview of candidate vs. role requirements
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Match */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Overall Match</span>
          <Badge variant="outline" className="text-xl">
            {match}%
          </Badge>
        </div>

        <Separator />

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Strengths</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center space-x-2 text-yellow-600 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Weaknesses</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {weaknesses.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <ThumbsUp className="h-5 w-5" />
              <span className="font-medium">Pros</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <ThumbsDown className="h-5 w-5" />
              <span className="font-medium">Cons</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {cons.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>

        <Separator />

        {/* Recommended Skills */}
        <section>
          <div className="flex items-center space-x-2 text-gray-700 mb-2">
            <Search className="h-5 w-5" />
            <span className="font-medium">Fit-for-Role Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <Separator />

        {/* AI Analysis & Suggestions */}
        <section className="space-y-4 text-sm text-muted-foreground">
          <p>
            The candidate demonstrates a strong technical foundation—particularly
            in front-end frameworks and team collaboration. Their communication
            skills and problem-solving approach align well with our agile
            workflow. However, their limited back-end exposure suggests they
            would benefit from mentorship on server-side technologies and CI/CD
            practices.
          </p>
          <p>
            We recommend leveraging their existing strengths: task them with
            component design and user-experience improvements early on. Simultaneously,
            provide guided training on Node.js and cloud fundamentals to round
            out their skill set.
          </p>
          <p>
            Overall, this profile is a high-potential match. A structured
            onboarding plan focusing on back-end pairing, plus a microservice
            workshop, will accelerate their contribution to cross-functional
            teams.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};
