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
import { Upload as IconUpload, File as IconFile, X as IconX, Image as IconImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
  onAnalyze: (file: File) => void;
  loading: boolean;
  progress: number;
}

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

export const ResumeUploader: FC<ResumeUploaderProps> = ({
  onAnalyze,
  loading,
  progress,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
      return false;
    }

    // Check file type
    const fileType = file.type;
    if (!Object.keys(ACCEPTED_FILE_TYPES).includes(fileType)) {
      setError('Unsupported file type. Please upload a PDF, DOC, DOCX, or image file.');
      return false;
    }

    return true;
  };

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0] ?? null;
    if (file && validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeClick = () => {
    if (!selectedFile) return;
    onAnalyze(selectedFile);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <IconImage className="h-6 w-6" />;
    }
    return <IconFile className="h-6 w-6" />;
  };

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Upload Applicant Resume</CardTitle>
        <CardDescription>
          Supported formats: <code>.pdf</code>, <code>.doc</code>, <code>.docx</code>, <code>.jpg</code>, <code>.png</code>, <code>.webp</code>
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
              {getFileIcon(selectedFile)}
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
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

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
