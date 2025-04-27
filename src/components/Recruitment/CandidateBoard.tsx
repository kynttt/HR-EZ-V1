// src/components/Recruitment/CandidateBoard.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Filter as IconFilter,
} from "lucide-react";
import { PageTabs } from "../Shared/PageTabs";

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
  { key: "hired",      label: "HIRED",       count: 20, color: "bg-green-100 text-green-800" },
  { key: "rejected",   label: "REJECTED",    count: 20, color: "bg-red-100 text-red-800" },
];

const candidates: Candidate[] = [
  // Sourced
  { id: "1", name: "Sonia Hoppe",       email: "hao-sonia92@gmail.com",   avatar: "/avatars/sonia.jpg",  status: "sourced",    files: 4, comments: 1 },
  { id: "2", name: "Melissa Bartoletti",email: "mel.barto@gmail.com",     avatar: "/avatars/melissa.jpg",status: "sourced",    files: 4, comments: 2 },
  { id: "3", name: "Gina Steuber",      email: "gina-stu32@gmail.com",    avatar: "/avatars/gina.jpg",   status: "sourced",    files: 4, comments: 2 },
  { id: "4", name: "Caroline Stracke",  email: "carolines@yahoo.com",     avatar: "/avatars/caroline.jpg",status: "sourced",    files: 4, comments: 3 },
  { id: "5", name: "Dana Macejkovic",   email: "dana-mac@yahoo.com",      avatar: "/avatars/dana.jpg",    status: "sourced",    files: 4, comments: 3 },
  { id: "6", name: "Pearl Durgan",      email: "pearl88du@hotmail.com",    avatar: "/avatars/pearl.jpg",   status: "sourced",    files: 4, comments: 2 },
  // In Progress
  { id: "7", name: "Wilbur Hackett",    email: "wilbur-hack@yahoo.com",   avatar: "/avatars/wilbur.jpg",  status: "inProgress", files: 2, comments: 1 },
  { id: "8", name: "Keith Hirthe",      email: "keith-hirthe@yahoo.com",  avatar: "/avatars/keith.jpg",   status: "inProgress", files: 3, comments: 1 },
  { id: "9", name: "Lisa Harvey",       email: "helo-lisaa@hotmail.com",  avatar: "/avatars/lisa.jpg",    status: "inProgress", files: 4, comments: 1 },
  // Interview
  { id: "10", name: "Annette Dickinson",email: "anet-son@hotmail.com",     avatar: "/avatars/annette.jpg",status: "interview",  files: 4, comments: 2 },
  { id: "11", name: "Angela Von",       email: "angela93@gmail.com",      avatar: "/avatars/angela.jpg",  status: "interview",  files: 4, comments: 2 },
  // Hired
  { id: "12", name: "Loretta Leuschke", email: "lor-luess@gmail.com",     avatar: "/avatars/loretta.jpg",status: "hired",      files: 5, comments: 4 },
  { id: "13", name: "Kent McCullough",  email: "kentmc@hotmail.com",      avatar: "/avatars/kent.jpg",    status: "hired",      files: 2, comments: 1 },
  { id: "14", name: "Esther Christiansen",email: "esther-ch@gmail.com",   avatar: "/avatars/esther.jpg", status: "hired",      files: 1, comments: 1 },
  { id: "15", name: "Julian McDermott", email: "mcDermott@yahoo.com",      avatar: "/avatars/julian.jpg",  status: "hired",      files: 1, comments: 1 },
  { id: "16", name: "Woodrow Veum",     email: "woo-veum@yahoo.com",      avatar: "/avatars/woodrow.jpg", status: "hired",      files: 2, comments: 1 },
  { id: "17", name: "Melinda Barton",   email: "mel-bart12@hotmail.com",  avatar: "/avatars/melinda.jpg",status: "hired",      files: 1, comments: 2 },
  // Rejected
  { id: "18", name: "Eunice Bergstrom", email: "eunice-83@hotmail.com",   avatar: "/avatars/eunice.jpg", status: "rejected",   files: 2, comments: 1 },
  { id: "19", name: "Kent McCullough",  email: "kentmc@hotmail.com",      avatar: "/avatars/kent.jpg",    status: "rejected",   files: 2, comments: 1 },
  { id: "20", name: "Esther Christiansen",email: "esther-ch@gmail.com",   avatar: "/avatars/esther.jpg", status: "rejected",   files: 1, comments: 1 },
];

export const CandidateBoard: React.FC = () => {
  return (
    <div className="space-y-6 md:py-6">
         <PageTabs
        active="/recruitment/candidates"
        tabs={[
          { href: "/recruitment/jobs", label: "Job Lists" },
          { href: "/recruitment/candidates", label: "Candidates" },
        ]}
      />
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
            <div className={`inline-flex items-center justify-between space-x-2 rounded-full px-3 py-1 ${color} text-xs font-medium`}>
              <span>{label}</span>
              <span className="bg-white text-sm font-semibold px-2 py-0.5 rounded-full">{count}</span>
            </div>

            <div className="flex flex-col space-y-4 mt-4">
              {candidates
                .filter((c) => c.status === key)
                .map((c) => (
                  <Card key={c.id} className="w-full py-4">
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
