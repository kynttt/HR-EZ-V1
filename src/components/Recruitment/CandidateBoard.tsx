// src/components/Recruitment/CandidateBoard.tsx
"use client";

import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Linkedin,
  FileText,
  MessageCircle,
  Filter as IconFilter, Edit,
  Users,
  ChevronLeft,
  Bell,
  Share2,
} from "lucide-react";
import { PageTabs, PageTab } from "@/components/Shared/PageTabs";
import Link from "next/link";
import { IconRobot, IconVideo } from "@tabler/icons-react";

interface JobDetailsPanelProps {
  jobId: string;
  title: string;
}
interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: StatusKey;
  files: number;
  comments: number;
}

type StatusKey = "sourced" | "inProgress" | "interview" | "hired" | "rejected";

const columns: {
  key: StatusKey;
  label: string;
  count: number;
  color: string;
}[] = [
  { key: "sourced",    label: "SOURCED",     count: 20, color: "bg-yellow-100 text-yellow-800" },
  { key: "inProgress", label: "IN PROGRESS", count: 20, color: "bg-blue-100 text-blue-800" },
  { key: "interview",  label: "INTERVIEW",   count: 20, color: "bg-purple-100 text-purple-800" },
  { key: "rejected",   label: "REJECTED",    count: 20, color: "bg-red-100 text-red-800" },
  { key: "hired",      label: "HIRED",       count: 20, color: "bg-green-100 text-green-800" },
];

const candidates: Candidate[] = [
  // Sourced
  { id: "1", name: "Sonia Hoppe",       email: "hao-sonia92@gmail.com",   avatar: "https://avatar.iran.liara.run/public/boy",  status: "sourced",    files: 4, comments: 1 },
  { id: "2", name: "Melissa Bartoletti",email: "mel.barto@gmail.com",     avatar: "https://avatar.iran.liara.run/public/boy",status: "sourced",    files: 4, comments: 2 },
  { id: "3", name: "Gina Steuber",      email: "gina-stu32@gmail.com",    avatar: "https://avatar.iran.liara.run/public/girl",   status: "sourced",    files: 4, comments: 2 },
  { id: "4", name: "Caroline Stracke",  email: "carolines@yahoo.com",     avatar: "https://avatar.iran.liara.run/public/boy?usearname=[value]",status: "sourced",    files: 4, comments: 3 },
  { id: "5", name: "Dana Macejkovic",   email: "dana-mac@yahoo.com",      avatar: "https://avatar.iran.liara.run/public/boy",    status: "sourced",    files: 4, comments: 3 },
  { id: "6", name: "Pearl Durgan",      email: "pearl88du@hotmail.com",    avatar: "https://avatar.iran.liara.run/public/boy",   status: "sourced",    files: 4, comments: 2 },
  // In Progress
  { id: "7", name: "Wilbur Hackett",    email: "wilbur-hack@yahoo.com",   avatar: "https://avatar.iran.liara.run/public/boy?usearname=[value]",  status: "inProgress", files: 2, comments: 1 },
  { id: "8", name: "Keith Hirthe",      email: "keith-hirthe@yahoo.com",  avatar: "https://avatar.iran.liara.run/public/girl",   status: "inProgress", files: 3, comments: 1 },
  { id: "9", name: "Lisa Harvey",       email: "helo-lisaa@hotmail.com",  avatar: "https://avatar.iran.liara.run/public/girl",    status: "inProgress", files: 4, comments: 1 },
  // Interview
  { id: "10", name: "Annette Dickinson",email: "anet-son@hotmail.com",     avatar: "https://avatar.iran.liara.run/public/boy",status: "interview",  files: 4, comments: 2 },
  { id: "11", name: "Angela Von",       email: "angela93@gmail.com",      avatar: "https://avatar.iran.liara.run/public/[ID]",  status: "interview",  files: 4, comments: 2 },
  // Hired
  { id: "12", name: "Loretta Leuschke", email: "lor-luess@gmail.com",     avatar: "https://avatar.iran.liara.run/public/[ID]",status: "hired",      files: 5, comments: 4 },
  { id: "13", name: "Kent McCullough",  email: "kentmc@hotmail.com",      avatar: "https://avatar.iran.liara.run/public/girl",    status: "hired",      files: 2, comments: 1 },
  { id: "14", name: "Esther Christiansen",email: "esther-ch@gmail.com",   avatar: "https://avatar.iran.liara.run/public/boy", status: "hired",      files: 1, comments: 1 },
  { id: "15", name: "Julian McDermott", email: "mcDermott@yahoo.com",      avatar: "https://avatar.iran.liara.run/public/boy?usearname=[value]",  status: "hired",      files: 1, comments: 1 },
  { id: "16", name: "Woodrow Veum",     email: "woo-veum@yahoo.com",      avatar: "https://avatar.iran.liara.run/public/girl", status: "hired",      files: 2, comments: 1 },
  { id: "17", name: "Melinda Barton",   email: "mel-bart12@hotmail.com",  avatar: "https://avatar.iran.liara.run/public/boy",status: "hired",      files: 1, comments: 2 },
  // Rejected
  { id: "18", name: "Eunice Bergstrom", email: "eunice-83@hotmail.com",   avatar: "https://avatar.iran.liara.run/public/[ID]", status: "rejected",   files: 2, comments: 1 },
  { id: "19", name: "Kent McCullough",  email: "kentmc@hotmail.com",      avatar: "https://avatar.iran.liara.run/public/boy",    status: "rejected",   files: 2, comments: 1 },
  { id: "20", name: "Esther Christiansen",email: "esther-ch@gmail.com",   avatar: "https://avatar.iran.liara.run/public/boy", status: "rejected",   files: 1, comments: 1 },
];

export const CandidateBoard: FC<JobDetailsPanelProps> = ({
  jobId,
  title,
}) => {
  const base = `/recruitment/jobs/${encodeURIComponent(jobId)}`;
  const tabs: PageTab[] = [
    { href: `${base}/description`, label: "Job Description", icon: Edit },
    //Temporarily disabled for demo purposes
    // { href: `${base}/recruitment/candidates`,  label: "Candidates",       icon: Users },
    { href: `/recruitment/candidates`,  label: "Candidates",       icon: Users },
    { href: `/recruitment/ai-review`,  label: "AI Assessment",       icon: IconRobot },
    { href: `/recruitment/recordings`,  label: "AI Recordings",       icon: IconVideo },
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
          <h1 className="text-2xl font-semibold">{title || "Full Stack Developer"}</h1>
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
      active={`/recruitment/candidates`}
      tabs={tabs} />
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Candidates</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search name or email here…" className="max-w-sm" />
          <Button variant="outline" size="sm">
            <IconFilter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>+ Add Candidate</Button>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-5 gap-6 overflow-x-auto pb-4">
        {columns.map(({ key, label, count, color }) => (
          <div key={key} className="flex flex-col">
            <div className={`inline-flex items-center justify-between space-x-2 rounded-md px-3 py-1 ${color} text-xs font-medium`}>
              <span>{label}</span>
              <span className="bg-white text-sm font-semibold px-2 py-0.5 rounded-full">{count}</span>
            </div>

            <div className="flex flex-col space-y-4 mt-4">
              {candidates
                .filter((c) => c.status === key)
                .map((c) => (
                  <Card
                  key={c.id}
                  className={`w-full py-4 transition-shadow hover:shadow-lg ${
                    c.status === "hired"
                      ? "border-2 border-green-500"
                      : "border"
                  }`}
                >
                    <CardContent className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-3 border-b pb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={c.avatar} alt={c.name} />
                          <AvatarFallback>{c.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{c.name}</p>
                          <p className="text-sm text-muted-foreground">{c.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <Button variant="ghost" size="icon">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{c.files}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{c.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
