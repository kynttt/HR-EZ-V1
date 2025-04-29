// src/components/ai-review/ResumeUploader.tsx
"use client";

import { FC, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload as IconUpload, File as IconFile, X as IconX } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
  progress: number;
}

export const ResumeUploader: FC<ResumeUploaderProps> = ({
  onAnalyze,
  loading,
  progress,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleAnalyzeClick = () => {
    if (!selectedFile) return;
    onAnalyze(selectedFile);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Upload Applicant Resume</CardTitle>
        <CardDescription>
          Supported formats: <code>.pdf</code>, <code>.doc</code>, <code>.docx</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            "relative border-dashed border-2 border-border rounded-md p-6 text-center transition hover:bg-muted cursor-pointer",
            loading && "opacity-50 pointer-events-none"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedFile ? (
            <div className="flex items-center justify-center space-x-2">
              <IconFile className="h-6 w-6" />
              <span className="font-medium">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearSelection}
              >
                <IconX className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <IconUpload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop file here or click to browse
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        <Button
          onClick={handleAnalyzeClick}
          disabled={!selectedFile || loading}
          className="w-full"
        >
          {loading ? "Analyzing…" : "Analyze with AI"}
        </Button>

        {loading && (
          <Progress value={progress} max={100} className="h-2 rounded" />
        )}
      </CardContent>
    </Card>
  );
};
