// src/components/EmployeeTable.tsx
"use client";

import { FC } from "react";
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
import { Filter, MoreHorizontal } from "lucide-react";
import { PageTabs } from "./Shared/PageTabs";

interface Employee {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  department: string;
  jobTitle: string;
  contractType: string;
  attendance: string;
}

const employees: Employee[] = [
  {
    name: "Brooklyn Simmons",
    email: "brok-simmons@mail.com",
    avatar: "/avatars/brooklyn.jpg",
    phone: "+62 928 7273 7262",
    department: "Design",
    jobTitle: "Creative Director",
    contractType: "Onsite – Fulltime",
    attendance: "120h 32m",
  },
  {
    name: "Cody Fisher",
    email: "cody_fisher99@mail.com",
    avatar: "/avatars/cody.jpg",
    phone: "+62 928 7273 7262",
    department: "Development",
    jobTitle: "Head of Development",
    contractType: "Onsite – Fulltime",
    attendance: "120h 32m",
  }
];

export const EmployeeTable: FC = () => (
  <div className=" lg:px-8">

<div className="py-8">
      <PageTabs
        active="/employee/manage"
        tabs={[
          { href: "/employee/manage", label: "Manage Employees" },
          { href: "/employee/org-chart", label: "Organization Chart" },
          { href: "/employee/time-off", label: "Request Time Off" },
        ]}
      />
      {/* rest of your page */}
    </div>
    {/* Search + Filter */}
    <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full"><h1 className="text-2xl font-semibold mb-4">Manage Employees</h1>
        <Input placeholder="Search keyword…" className="max-w-sm" /></div>
    
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" /> Filter
      </Button>
    </div>

    {/* Table */}
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
        {employees.map((emp) => (
          <TableRow key={emp.email}>
            {/* Name + Avatar */}
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
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

            {/* Other columns */}
            <TableCell>{emp.phone}</TableCell>
            <TableCell>
              <Badge variant="secondary">{emp.department}</Badge>
            </TableCell>
            <TableCell>{emp.jobTitle}</TableCell>
            <TableCell>{emp.contractType}</TableCell>
            <TableCell>{emp.attendance}</TableCell>

            {/* Actions */}
            <TableCell className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                See Details
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} />
          <TableCell className="text-right text-sm text-muted-foreground bg-transparent">
            Showing {employees.length} employees
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);
