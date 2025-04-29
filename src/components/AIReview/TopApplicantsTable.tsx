"use client";

import { FC } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  overallMatch: number;
  keySkills: string[];
  isNew?: boolean;
}

interface TopApplicantsTableProps {
  applicants: Applicant[];
}

export const TopApplicantsTable: FC<TopApplicantsTableProps> = ({
  applicants,
}) => (
  <div className="overflow-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px] text-center">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Match</TableHead>
          <TableHead>Key Skills</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants.map((a, idx) => (
          <TableRow
            key={a.id}
            className={a.isNew ? "bg-primary/10" : undefined}
          >
            <TableCell className="text-center">{idx + 1}</TableCell>
            <TableCell>{a.name}</TableCell>
            <TableCell>{a.email}</TableCell>
            <TableCell className="text-center">
              <Badge variant="outline">{a.overallMatch}%</Badge>
            </TableCell>
            <TableCell className="space-x-2">
              {a.keySkills.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="link">View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
