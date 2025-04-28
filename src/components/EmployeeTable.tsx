// src/components/EmployeeTable.tsx
"use client";

import React, { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Filter,
  List,
  Grid,
  Mail,
  Phone,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageTabs } from "./Shared/PageTabs";
import { EmployeeDetailsSheet, Employee } from "@/components/Employee/EmployeeDetailsSheet";

const employeesData: Employee[] = [
  {
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@mail.com",
    avatar: "https://avatar.iran.liara.run/public/boy",
    phone: "+1-202-555-0121",
    department: "Design",
    jobTitle: "Creative Director",
    contractType: "Onsite – Fulltime",
    attendance: "120h 32m",
    status: "Active",
    hiredOn: "Mar 17, 2021",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@mail.com",
    avatar: "https://avatar.iran.liara.run/public/girl",
    phone: "+1-202-555-0192",
    department: "Development",
    jobTitle: "Head of Development",
    contractType: "Onsite – Fulltime",
    attendance: "118h 12m",
    status: "Active",
    hiredOn: "Apr 02, 2021",
  },
  // …add at least 8 more employees…
  {
    name: "Ralph Edwards",
    email: "ralph.edwards@mail.com",
    avatar: "https://avatar.iran.liara.run/public/boy",
    phone: "+1-202-555-0183",
    department: "Design",
    jobTitle: "Sr. UX Designer",
    contractType: "Remote – Fulltime",
    attendance: "130h 05m",
    status: "Not Active",
    hiredOn: "Feb 10, 2021",
  },
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@mail.com",
    avatar: "https://avatar.iran.liara.run/public/girl",
    phone: "+1-202-555-0157",
    department: "Project Manager",
    jobTitle: "Head of PM",
    contractType: "Onsite – Fulltime",
    attendance: "125h 44m",
    status: "Active",
    hiredOn: "Jan 21, 2021",
  },
  {
    name: "Mariana Jade",
    email: "mariana.jade@mail.com",
    avatar: "https://avatar.iran.liara.run/public/boy",
    phone: "+1-202-555-0168",
    department: "HR",
    jobTitle: "Sr. HR",
    contractType: "Remote – Part-time",
    attendance: "95h 20m",
    status: "Unverified",
    hiredOn: "Jun 03, 2021",
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@mail.com",
    avatar: "https://avatar.iran.liara.run/public/girl",
    phone: "+1-202-555-0174",
    department: "Development",
    jobTitle: "Frontend Engineer",
    contractType: "Onsite – Fulltime",
    attendance: "140h 00m",
    status: "Active",
    hiredOn: "Mar 15, 2021",
  },
  {
    name: "Arlene McCoy",
    email: "arlene.mccoy@mail.com",
    avatar: "https://avatar.iran.liara.run/public/boy",
    phone: "+1-202-555-0133",
    department: "Design",
    jobTitle: "Graphic Designer",
    contractType: "Remote – Fulltime",
    attendance: "110h 10m",
    status: "Not Active",
    hiredOn: "Jul 12, 2021",
  },
  {
    name: "Noor Khafila",
    email: "noor.khafila@mail.com",
    avatar: "https://avatar.iran.liara.run/public/girl",
    phone: "+1-202-555-0144",
    department: "Marketing",
    jobTitle: "Digital Marketer",
    contractType: "Onsite – Part-time",
    attendance: "70h 30m",
    status: "Unverified",
    hiredOn: "May 28, 2021",
  },
  {
    name: "Adi Widjaya",
    email: "adi.widjaya@mail.com",
    avatar: "https://avatar.iran.liara.run/public/boy",
    phone: "+1-202-555-0177",
    department: "Business",
    jobTitle: "Business Analyst",
    contractType: "Remote – Fulltime",
    attendance: "132h 15m",
    status: "Active",
    hiredOn: "Apr 05, 2021",
  },
  {
    name: "Pearl Durgan",
    email: "pearl.durgan@mail.com",
    avatar: "https://avatar.iran.liara.run/public/girl",
    phone: "+1-202-555-0188",
    department: "Support",
    jobTitle: "Customer Support",
    contractType: "Onsite – Fulltime",
    attendance: "100h 45m",
    status: "Active",
    hiredOn: "Aug 19, 2021",
  },
];

export const EmployeeTable: FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openDetails = (emp: Employee) => {
    setSelectedEmp(emp);
    setSheetOpen(true);
  };

  return (
    <>
      <div className="space-y-6 lg:px-8 px-2 md:py-8">
        <PageTabs
          active="/employee/manage"
          tabs={[
            { href: "/employee/manage", label: "Manage Employees" },
            { href: "/employee/org-chart", label: "Organization Chart" },
            { href: "/employee/time-off", label: "Request Time Off" },
          ]}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Manage Employees</h1>
          <div className="flex items-center gap-2">
            <Input placeholder="Search keyword…" className="max-w-sm" />
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("cards")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "table" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Contract Type</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeesData.map((emp) => (
                <TableRow
                  key={emp.email}
                  className="cursor-pointer"
                  onClick={() => openDetails(emp)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={emp.avatar} alt={emp.name} />
                        <AvatarFallback>{emp.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{emp.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{emp.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{emp.department}</Badge>
                  </TableCell>
                  <TableCell>{emp.jobTitle}</TableCell>
                  <TableCell>{emp.contractType}</TableCell>
                  <TableCell>{emp.attendance}</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDetails(emp)}>
                      See Details
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} />
                <TableCell className="text-right text-sm text-muted-foreground">
                  Showing {employeesData.length} employees
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {employeesData.map((emp) => (
              <Card
                key={emp.email}
                className="relative overflow-visible cursor-pointer"
                onClick={() => openDetails(emp)}
              >
                <input
                  type="checkbox"
                  className="absolute top-3 left-3 h-4 w-4 rounded border"
                />
                <Badge
                  variant={emp.status === "Active" ? "outline" : "secondary"}
                  className="absolute top-3 right-12"
                >
                  {emp.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-3"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>

                <CardContent className="pt-12 space-y-3 text-center">
                  <Avatar className="mx-auto h-16 w-16">
                    <AvatarImage src={emp.avatar} alt={emp.name} />
                    <AvatarFallback>{emp.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {emp.jobTitle}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      <span className="font-medium">Dept:</span> {emp.department}
                    </p>
                    <p>
                      <span className="font-medium">Hired:</span> {emp.hiredOn}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{emp.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{emp.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Side-sheet with employee details */}
      {selectedEmp && (
        <EmployeeDetailsSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          employee={selectedEmp}
        />
      )}
    </>
  );
};
