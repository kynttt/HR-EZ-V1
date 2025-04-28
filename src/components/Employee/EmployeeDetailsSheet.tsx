// src/components/Employee/EmployeeDetailsSheet.tsx
"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageTabs, PageTab } from "@/components/Shared/PageTabs";
import { ChevronLeft, ChevronRight, Edit, Mail, Trash2 } from "lucide-react";

export interface Employee {
  name: string;
  avatar: string;
  status: "Active" | "Not Active" | "Unverified";
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  contractType: string;
  attendance: string;
  hiredOn: string;
  // …any other fields you need…
}

interface EmployeeDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee;
}

export const EmployeeDetailsSheet: React.FC<EmployeeDetailsSheetProps> = ({
  open,
  onOpenChange,
  employee,
}) => {
  const tabs: PageTab[] = [
    { href: "#details", label: "Details" },
    { href: "#payroll", label: "Payroll" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="max-w-md p-0">
        {/* ─── Header ───────────────────────────────────────── */}
        <SheetHeader className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  /* you could navigate to previous employee here */
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  /* you could navigate to next employee here */
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">{employee.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* ─── Summary Bar ─────────────────────────────────── */}
        <div className="px-4 pb-4 flex items-center gap-4 border-b">
          <Avatar className="h-16 w-16">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <Badge variant="outline">{employee.status}</Badge>
            <p className="text-sm font-medium">{employee.jobTitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span>{employee.department}</span>
              <span>{employee.email}</span>
              <span>{employee.phone}</span>
            </div>
          </div>
        </div>

        {/* ─── Tabs ─────────────────────────────────────────── */}
        <div className="px-4 pt-4">
          <PageTabs active="#details" tabs={tabs} className="mb-4" />
        </div>

        {/* ─── Content ─────────────────────────────────────── */}
        <div className="px-4 pb-6 overflow-y-auto space-y-6 h-[calc(100vh-300px)]">
          {/* Details Tab */}
          <section id="details" className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Fullname</p>
                  <p>{employee.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p>Female</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Marital Status</p>
                  <p>Single</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Languages Spoken
                  </p>
                  <p>English</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p>882 Coventry Court, Gulfport, USA, Mississippi, 39501</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">
                    Emergency Contact
                  </p>
                  <p>+1-202-555-0157 (Father)</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Professional Information */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Professional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Employment ID</p>
                  <p>44BB3</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Job Title</p>
                  <p>{employee.jobTitle}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Employment Type
                  </p>
                  <p>Fulltime</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p>{employee.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date Join</p>
                  <p>March 17, 2021</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p>{employee.status}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="pt-4 flex flex-wrap gap-2">
                <Badge>UI Design</Badge>
                <Badge>Communication</Badge>
                <Badge>Leadership</Badge>
                <Badge>Teamwork</Badge>
              </div>
            </div>
          </section>

          {/* Payroll Tab (empty placeholder) */}
          <section id="payroll" className="hidden">
            {/* your payroll details here... */}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
