// src/components/Payroll/ListPayrollSection.tsx
"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface PayrollRow {
  name: string;
  invoice: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalHours: string;
  amount: string;
  status: "Paid" | "Unpaid";
}

const rows: PayrollRow[] = [
  {
    name: "Brooklyn Simmons",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Paid",
  },
  {
    name: "Cody Fisher",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Unpaid",
  },
  {
    name: "Ralph Edwards",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Paid",
  },
  {
    name: "Bessie Cooper",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Paid",
  },
  {
    name: "Leslie Alexander",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Paid",
  },
  {
    name: "Mariana Jade",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Paid",
  },
  {
    name: "Jenny Wilson",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Unpaid",
  },
  {
    name: "Arlene McCoy",
    invoice: "#930728",
    startDate: "Dec 29, 2023",
    endDate: "Jan 28, 2024",
    totalDays: 22,
    totalHours: "176h 39m",
    amount: "$2,020.00",
    status: "Unpaid",
  },
];

export const ListPayrollSection: FC = () => (
  <div className="space-y-4">
    {/* Title + Search/Filter */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">List Payroll</h2>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search keyword…" className="max-w-sm" />
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Table */}
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[24px]">
            <input type="checkbox" className="h-4 w-4" />
          </TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Total Days</TableHead>
          <TableHead>Total Hours</TableHead>
          <TableHead>Invoice Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell>
              <input type="checkbox" className="h-4 w-4" />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/avatars/${r.name.split(" ")[0].toLowerCase()}.jpg`}
                    alt={r.name}
                  />
                  <AvatarFallback>{r.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Invoice {r.invoice}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>{r.startDate}</TableCell>
            <TableCell>{r.endDate}</TableCell>
            <TableCell>{r.totalDays}</TableCell>
            <TableCell>{r.totalHours}</TableCell>
            <TableCell>{r.amount}</TableCell>
            <TableCell>
              <Badge
                variant={r.status === "Paid" ? "secondary" : "destructive"}
              >
                {r.status}
              </Badge>
            </TableCell>
            <TableCell className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button variant="ghost" size="sm">
                Pay
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
