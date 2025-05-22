import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisResult {
  overallScore: number;
  skills: string[];
  experience: string;
  education: string;
  recommendations: string[];
}

interface ResumeAnalysisProps {
  result: AnalysisResult | null;
  loading: boolean;
  progress: number;
}

export const ResumeAnalysis: FC<ResumeAnalysisProps> = ({
  result,
  loading,
  progress,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Resume</CardTitle>
          <CardDescription>Please wait while we analyze the resume...</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} max={100} className="h-2 rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Analysis</CardTitle>
        <CardDescription>AI-powered assessment of the candidate's resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
          <Progress value={result.overallScore} max={100} className="h-2 rounded" />
          <p className="text-sm text-muted-foreground mt-1">
            {result.overallScore}/100
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <p className="text-sm">{result.experience}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <p className="text-sm">{result.education}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <ul className="list-disc list-inside space-y-1">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}; 