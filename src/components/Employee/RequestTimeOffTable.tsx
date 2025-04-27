// src/components/Employee/RequestTimeOffTable.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { PageTabs } from "../Shared/PageTabs";

interface Request {
  id: string;
  name: string;
  email: string;
  avatar: string;
  leaveType: "Annual Leave" | "Sick Leave";
  leaveFrom: string;
  leaveTo: string;
  days: number;
  status: "Pending" | "Approved";
}

const requests: Request[] = [
  {
    id: "1",
    name: "Brooklyn Simmons",
    email: "brok-simmons@mail.com",
    avatar: "/avatars/brooklyn.jpg",
    leaveType: "Annual Leave",
    leaveFrom: "Jan 23, 2024",
    leaveTo: "Jan 24, 2024",
    days: 1,
    status: "Pending",
  },
  {
    id: "2",
    name: "Ralph Edwards",
    email: "ralp_uxdsg@mail.com",
    avatar: "/avatars/ralph.jpg",
    leaveType: "Sick Leave",
    leaveFrom: "Jan 23, 2024",
    leaveTo: "Jan 27, 2024",
    days: 4,
    status: "Pending",
  },
  {
    id: "3",
    name: "Leslie Alexander",
    email: "alexander_le@mail.com",
    avatar: "/avatars/leslie.jpg",
    leaveType: "Annual Leave",
    leaveFrom: "Jan 12, 2024",
    leaveTo: "Jan 14, 2024",
    days: 2,
    status: "Approved",
  },
  {
    id: "4",
    name: "Cody Fisher",
    email: "cody_fisher99@mail.com",
    avatar: "/avatars/cody.jpg",
    leaveType: "Sick Leave",
    leaveFrom: "Jan 04, 2024",
    leaveTo: "Jan 06, 2024",
    days: 2,
    status: "Approved",
  },
  {
    id: "5",
    name: "Arlene McCoy",
    email: "arlene-mc@mail.com",
    avatar: "/avatars/arlene.jpg",
    leaveType: "Annual Leave",
    leaveFrom: "Jan 03, 2024",
    leaveTo: "Jan 08, 2024",
    days: 5,
    status: "Approved",
  },
];

export const RequestTimeOffTable: React.FC = () => {
  return (
    <div className="space-y-6">
        <PageTabs
        active="/employee/time-off"
        tabs={[
          { href: "/employee/manage", label: "Manage Employees" },
          { href: "/employee/org-chart", label: "Organization Chart" },
          { href: "/employee/time-off", label: "Request Time Off" },
        ]}
      />
      {/* Header: Title + Search + Filter */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Request Time Off</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search keyword…" className="max-w-sm" />
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Leave From</TableHead>
            <TableHead>Leave To</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              {/* Name + Avatar */}
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={req.avatar} alt={req.name} />
                    <AvatarFallback>{req.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{req.name}</span>
                </div>
              </TableCell>

              {/* Leave Type */}
              <TableCell>
                <Badge
                  className={
                    req.leaveType === "Annual Leave"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {req.leaveType}
                </Badge>
              </TableCell>

              {/* Dates & Days */}
              <TableCell>{req.leaveFrom}</TableCell>
              <TableCell>{req.leaveTo}</TableCell>
              <TableCell>{req.days}</TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  className={
                    req.status === "Pending"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {req.status}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="flex justify-end space-x-2">
                {req.status === "Pending" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      Reject
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
