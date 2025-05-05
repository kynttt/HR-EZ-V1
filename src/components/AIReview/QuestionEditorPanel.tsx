// src/components/Recruitment/QuestionEditorPanel.tsx
"use client";

import React, { FC, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  ChevronLeft,
  Bell,
  Share2,
  Edit,
  Users,
} from "lucide-react";
import Link from "next/link";
import { PageTab, PageTabs } from "../Shared/PageTabs";
import { IconMessageCircleQuestion, IconRobot, IconVideo } from "@tabler/icons-react";

interface Question {
  id: string;
  text: string;
}

const roles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
];

export const QuestionEditorPanel: FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]);
  const [questionsByRole, setQuestionsByRole] = useState<Record<string, Question[]>>({
    "Full Stack Developer": [
      { id: "q1", text: "Tell me about yourself." },
      { id: "q2", text: "Why do you want this role?" },
    ],
    "UI/UX Designer": [
      { id: "q3", text: "Walk me through your design process." },
    ],
    "Product Manager": [
      { id: "q4", text: "How do you prioritize features?" },
    ],
  });
  const [introByRole, setIntroByRole] = useState<Record<string, string>>({
    "Full Stack Developer": "Welcome! Let’s start with a quick introduction…",
    "UI/UX Designer": "Hi there! We’d love to learn about your design background…",
    "Product Manager": "Hello! Please tell us about your product experience…",
  });
  const [closingByRole, setClosingByRole] = useState<Record<string, string>>({
    "Full Stack Developer": "Thanks for your time. Next steps: you’ll hear from us soon.",
    "UI/UX Designer": "Appreciate it! We’ll reach out with feedback shortly.",
    "Product Manager": "Thank you! We’ll be in touch with next steps.",
  });

  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const list = questionsByRole[selectedRole] || [];

  const addQuestion = () => {
    if (!draft.trim()) return;
    const newQ: Question = { id: `q_${Date.now()}`, text: draft.trim() };
    setQuestionsByRole({
      ...questionsByRole,
      [selectedRole]: [...list, newQ],
    });
    setDraft("");
  };

  const startEdit = (q: Question) => {
    setEditingId(q.id);
    setEditText(q.text);
  };
  const saveEdit = () => {
    if (!editingId) return;
    setQuestionsByRole({
      ...questionsByRole,
      [selectedRole]: list.map((q) =>
        q.id === editingId ? { ...q, text: editText } : q
      ),
    });
    cancelEdit();
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };
  const removeQuestion = (id: string) => {
    setQuestionsByRole({
      ...questionsByRole,
      [selectedRole]: list.filter((q) => q.id !== id),
    });
  };

  const jobId = "default-job-id";
  const base = `/recruitment/jobs/${encodeURIComponent(jobId)}`;
  const tabs: PageTab[] = [
    { href: `${base}/description`, label: "Job Description", icon: Edit },
    {
      href: `/recruitment/questionnaire`,
      label: "AI Questionnaires",
      icon: IconMessageCircleQuestion,
    },
    { href: `/recruitment/ai-review`, label: "AI Assessment", icon: IconRobot },
    { href: `/recruitment/recordings`, label: "AI Recordings", icon: IconVideo },
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
      <PageTabs active={`/recruitment/questionnaire`} tabs={tabs} />
{/* Heading */}
<h1 className="text-2xl font-semibold">Customize AI Interview Questions</h1>
      {/* Role selector */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">Role:</span>
        <Select
          onValueChange={(v) => setSelectedRole(v)}
          defaultValue={roles[0]}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main editor tabs */}
      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="intro">Introduction</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="closing">Closing</TabsTrigger>
        </TabsList>

        {/* Introduction */}
        <TabsContent value="intro">
          <Card>
            <CardHeader>
              <CardTitle>Introductory Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={4}
                value={introByRole[selectedRole]}
                onChange={(e) =>
                  setIntroByRole({
                    ...introByRole,
                    [selectedRole]: e.currentTarget.value,
                  })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Questions */}
        <TabsContent value="questions">
          <div className="grid grid-cols-3 gap-6">
            {/* Questions list (2/3 width) */}
            <div className="col-span-2 space-y-4">
              {list.map((q) =>
                editingId === q.id ? (
                  <div key={q.id} className="space-y-2">
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.currentTarget.value)}
                      rows={4}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" /> Cancel
                      </Button>
                      <Button size="sm" onClick={saveEdit}>
                        <Check className="h-4 w-4" /> Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span>{q.text}</span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEdit(q)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(q.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                )
              )}
              {list.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No questions defined for this role yet.
                </p>
              )}
            </div>

            {/* Add New Question (1/3 width) */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your question…"
                  value={draft}
                  onChange={(e) => setDraft(e.currentTarget.value)}
                  rows={4}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={addQuestion} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Question
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Closing */}
        <TabsContent value="closing">
          <Card>
            <CardHeader>
              <CardTitle>Closing Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={4}
                value={closingByRole[selectedRole]}
                onChange={(e) =>
                  setClosingByRole({
                    ...closingByRole,
                    [selectedRole]: e.currentTarget.value,
                  })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
