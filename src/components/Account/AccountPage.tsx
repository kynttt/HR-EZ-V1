// src/components/Account/AccountPage.tsx
"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";

export const AccountPage: FC = () => {
  return (
    <div className="space-y-6 px-8">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Profile</h1>

      {/* Top Row: Personal Info & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Personal information</CardTitle>
            <Button variant="outline" size="sm">
              Save
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              ["Full name", "Sam Raymond"],
              ["Date of birth", "March 15th, 1950"],
              ["Gender", "Male"],
              ["Marital status", "Single"],
              ["Phone", "+1 (555) 456-7890"],
              ["Email", "samraymond@gmail.com"],
              ["Address", "23 Maple Street, Springfield Apt 4B"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              { title: "Employment contract", date: "Feb 05, 2024" },
              { title: "Curriculum Vitae", date: "Jan 12, 2024" },
              { title: "Training certificate", date: "Jul 25, 2024" },
              { title: "Upload new…", date: "" },
            ].map((doc, i) => (
              <Card key={i} className="border">
                <CardContent className="flex flex-col justify-between h-full">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <span className="text-sm">{doc.title || "+"}</span>
                  </div>
                  {doc.date && (
                    <p className="text-xs text-muted-foreground mt-2">{doc.date}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Profile Card, Org Chart, Data Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="relative p-0">
            {/* header graphic */}
            <div className="h-48 bg-muted rounded-t-lg" />

            {/* centered, larger avatar */}
            <Avatar
              className="absolute top-32 left-1/2 -translate-x-1/2 ring-4 ring-background h-32 w-32"
            >
              <AvatarImage
                src="https://avatar.iran.liara.run/public/boy"
                alt="Sam Raymond"
              />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>

            {/* name/role */}
            <div className="mt-20 p-4 text-center">
              <h2 className="text-xl font-medium">Sam Raymond</h2>
              <p className="text-sm text-muted-foreground">HR</p>
            </div>

            <Separator />

            {/* details */}
            <div className="p-4 text-xs text-muted-foreground space-y-1">
              <p>EMP-51247</p>
              <p>January 15, 2023</p>
              <p>12 Corporate Plaza</p>
              <p>Springfield Office</p>
            </div>
          </CardContent>
        </Card>

        {/* Org Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Chart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { name: "Harold Cooper", role: "Chief, Product", color: "purple" },
              { name: "Aram Motjabai", role: "Sr. Manager, Product", color: "purple" },
              { name: "Sam Raymond", role: "Product Designer", color: "green" },
              { name: "Dembe Zuma", role: "UI Designer", color: "blue" },
              { name: "Katarina Rostova", role: "UX Researcher", color: "blue" },
              { name: "Elizabeth Keen", role: "Copy Writer", color: "blue" },
            ].map((p, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div
                  className={`w-1 h-8 rounded bg-${p.color}-500`}
                />
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Completion Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>
              Data completion{" "}
              <span className="text-muted-foreground">2/5</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Personal data & resume", done: true },
              { label: "Education", done: true },
              { label: "Email address", done: false },
              { label: "Work experience", done: false },
              { label: "Personal statement & consent", done: false },
              { label: "Certification", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox checked={item.done} />
                <span
                  className={item.done ? "line-through text-muted-foreground" : ""}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
