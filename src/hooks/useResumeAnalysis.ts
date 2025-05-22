import { useState } from 'react';
import { extractTextFromFile } from '@/utils/pdfParser';

export interface AnalysisResult {
  match: number;
  strengths: string[];
  weaknesses: string[];
  pros: string[];
  cons: string[];
  recommendedSkills: string[];
  assessment: {
    Opening: string;
    'Main Assessment': string;
    Recommendations: {
      'Onboarding plan': string;
      Training: string;
      'Early wins': string;
      'Longer-term development': string;
    };
  };
}

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export function useResumeAnalysis() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async (file: File, jobId: string = 'default-job-id') => {
    try {
      console.log('Starting resume analysis in hook...');
      setLoading(true);
      setProgress(0);
      setError(null);
      setResult(null);

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 4MB limit');
      }

      // Check for API key
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured');
      }

      // Extract text from file
      console.log('Extracting text from file...');
      setProgress(20);
      const text = await extractTextFromFile(file);
      console.log('Text extracted:', text.substring(0, 100) + '...');

      // Call OpenAI API
      console.log('Calling OpenAI API...');
      setProgress(60);
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          jobId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze resume');
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Parse and validate the response
      if (!data.match || !data.strengths || !data.weaknesses) {
        throw new Error('Invalid response format from API');
      }

      // Update progress and set result
      console.log('Setting analysis result...');
      setProgress(100);
      
      // Ensure we have all required fields
      const analysisResult: AnalysisResult = {
        match: data.match,
        strengths: data.strengths || [],
        weaknesses: data.weaknesses || [],
        pros: data.pros || [],
        cons: data.cons || [],
        recommendedSkills: data.recommendedSkills || [],
        assessment: data.assessment || {
          Opening: '',
          'Main Assessment': '',
          Recommendations: {
            'Onboarding plan': '',
            Training: '',
            'Early wins': '',
            'Longer-term development': '',
          },
        }
      };
      
      setResult(analysisResult);
      console.log('Analysis complete in hook, result:', analysisResult);

    } catch (err) {
      console.error('Error in analyzeResume:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeResume,
    loading,
    progress,
    result,
    error,
  };
} 