// src/app/ai-review/page.tsx
"use client";

import { useState, FC } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, ChevronLeft, Clock, Edit, Share2, Users } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { RecordingPlayerPanel } from "@/components/AIReview/RecordingPlayerPanel";
import { PageTab, PageTabs } from "../Shared/PageTabs";
import { Input } from "../ui/input";
import { IconFilter, IconMessageCircleQuestion, IconRobot, IconVideo } from "@tabler/icons-react";
import Link from "next/link";

interface InterviewApplicant {
  id: string;
  name: string;
  avatar: string;
  email: string;
  age: number;
  gender: "M" | "F";
  position: string;
  match: number;       // % fit from AI
  interviewDate: string;
  recordingUrl: string;
}

const applicants: InterviewApplicant[] = [
  {
    id: "a1",
    name: "Sonia Hoppe",
    avatar: "https://avatar.iran.liara.run/public/[ID]",
    email: "sonia.hoppe@example.com",
    age: 29,
    gender: "F",
    position: "UI/UX Designer",
    match: 92,
    interviewDate: "Apr 28, 2025",
    recordingUrl: "/recordings/sonia.mp4",
  },
  {
    id: "a2",
    name: "Melissa Bartoletti",
    avatar: "https://avatar.iran.liara.run/public/girl",
    email: "melissa.b@example.com",
    age: 31,
    gender: "F",
    position: "Frontend Engineer",
    match: 88,
    interviewDate: "Apr 27, 2025",
    recordingUrl: "/recordings/melissa.mp4",
  },
  {
    id: "a3",
    name: "Gina Steuber",
    avatar: "https://avatar.iran.liara.run/public/boy",
    email: "gina.s@example.com",
    age: 27,
    gender: "F",
    position: "Product Manager",
    match: 85,
    interviewDate: "Apr 26, 2025",
    recordingUrl: "/recordings/gina.mp4",
  },
  // …add more as needed…
];

const InterviewQueuePage: FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<InterviewApplicant | null>(null);

  const jobId = "default-job-id"; // Replace with actual job ID logic
  const base = `/recruitment/jobs/${encodeURIComponent(jobId)}`;
  const tabs: PageTab[] = [
    { href: `${base}/description`, label: "Job Description", icon: Edit },
    { href: `/recruitment/questionnaire`, label: "AI Questionnaires", icon: IconMessageCircleQuestion },
    { href: `/recruitment/ai-review`, label: "AI Assessment", icon: IconRobot },
    { href: `/recruitment/recordings`, label: "AI Recordings", icon: IconVideo },
    //Temporarily disabled for demo purposes
// { href: `${base}/recruitment/candidates`,  label: "Candidates",       icon: Users },
    { href: `/recruitment/candidates`, label: "Candidates", icon: Users },
  ];

  return (
    
        <div className="space-y-6">
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
                  <PageTabs 
                  // active={`${base}/description`} 
                  active={`/recruitment/recordings`}
                  tabs={tabs} />
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">AI Interview Recordings</h1>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Search name or email here…" className="max-w-sm" />
                      <Button variant="outline" size="sm">
                        <IconFilter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                      <Button>+ Add Candidate</Button>
                    </div>
                  </div>
        
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Match</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((app, idx) => (
                <TableRow key={app.id} className={idx === 0 ? "bg-primary/10" : ""}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={app.avatar} alt={app.name} />
                        <AvatarFallback>{app.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{app.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.age}</TableCell>
                  <TableCell>{app.gender}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.match}%</Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {app.interviewDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <Sheet open={open} onOpenChange={setOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => {
                            setSelected(app);
                            setOpen(true);
                          }}
                        >
                          View Recording
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full max-w-2xl">
                        <SheetHeader>
                          <SheetTitle>
                            {selected?.name} — {selected?.position} Interview
                          </SheetTitle>
                        </SheetHeader>
                        <RecordingPlayerPanel
                          src={selected?.recordingUrl || ""}
                          title={`${selected?.name} Interview`}
                        />
                        <SheetFooter>
                          <Button variant="outline" onClick={() => setOpen(false)}>
                            Close
                          </Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                 
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
   
  );
};

export default InterviewQueuePage;
