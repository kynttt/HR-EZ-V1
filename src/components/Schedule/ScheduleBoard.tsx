// src/components/Schedule/ScheduleBoard.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, Bell, Share2, ChevronDown, Plus } from "lucide-react";
import { AppointmentDetailsSheet } from "@/components/Schedule/AppointmentDetailsSheet";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  startHour: number;        // e.g. 8.0 for 8:00, 8.5 for 8:30
  endHour: number;          // e.g. 10.0 for 10:00
  colorClass: string;       // Tailwind bg-* for the block
  borderColorClass: string; // Tailwind border-l-4 color
  label: string;            // duration label
  timeLabel: string;        // "08:00 - 10:00"
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Online Interview with UI Candidate",
    startHour: 8.0,
    endHour: 10.0,
    colorClass: "bg-green-200/70",
    borderColorClass: "border-green-500",
    label: "2 hours",
    timeLabel: "08:00 - 10:00",
  },
  {
    id: "2",
    title: "Replying email to applicants",
    startHour: 8.5,
    endHour: 10.0,
    colorClass: "bg-yellow-200/70",
    borderColorClass: "border-yellow-500",
    label: "1h 30m",
    timeLabel: "08:30 - 10:00",
  },
  {
    id: "3",
    title: "Online Interview with UI Candidate",
    startHour: 10.0,
    endHour: 11.0,
    colorClass: "bg-orange-200/70",
    borderColorClass: "border-orange-500",
    label: "1 hour",
    timeLabel: "10:00 - 11:00",
  },
  {
    id: "4",
    title: "Online Interview with UI Candidate",
    startHour: 10.5,
    endHour: 12.0,
    colorClass: "bg-purple-200/70",
    borderColorClass: "border-purple-500",
    label: "1h 30m",
    timeLabel: "10:30 - 12:00",
  },
  {
    id: "5",
    title: "Online Interview with UI Candidate",
    startHour: 13.0,
    endHour: 14.0,
    colorClass: "bg-blue-200/70",
    borderColorClass: "border-blue-500",
    label: "1 hour",
    timeLabel: "13:00 - 14:00",
  },
];

export const ScheduleBoard: React.FC = () => {
  // hours from 7 to 14
  const hours = Array.from({ length: 8 }, (_, i) => 7 + i);

  return (
    <div className="space-y-6 p-6">
      <ScheduleHeader />
      <ScheduleGrid hours={hours} tasks={tasks} />
    </div>
  );
};

/** 1. Header with search, notifications, title, date, buttons & toggle */
const ScheduleHeader = () => (
  <div className="space-y-4">
    {/* top row: search + icons */}
    <div className="flex items-center justify-between">
      <div className="relative max-w-lg">
        <Input
          placeholder="Search keyword…"
          className="pl-10"
        />
        <Calendar className="absolute left-3 top-1/2 h-5 w-5 text-muted-foreground transform -translate-y-1/2" />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>

    {/* second row: title + date picker + export/add */}
    <div className="flex items-center justify-between">
      {/* title & subtitle */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center space-x-2">
          <Plus className="h-6 w-6 text-primary" />
          <span>Schedule</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your schedule
        </p>
      </div>

      {/* export + add */}
      <div className="flex space-x-2">
      <AppointmentDetailsSheet>
  <Button variant="outline">
    <Plus className="mr-2 h-4 w-4" /> Add Task
  </Button>
</AppointmentDetailsSheet>
        <Button variant="ghost">
          <ChevronDown className="h-4 w-4" /> Export
        </Button>
      </div>
    </div>

    {/* third row: date picker + view toggle */}
    <div className="flex items-center justify-between">
      <Button variant="link" className="text-lg font-medium">
        Jan 28, 2024 <ChevronDown className="inline-block h-4 w-4 ml-1" />
      </Button>
      <ToggleGroup type="single" defaultValue="today" className="space-x-2">
        <ToggleGroupItem value="today">Today</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
  </div>
);

/** 2. Grid of hours + absolutely positioned task bars */
interface ScheduleGridProps {
  hours: number[];
  tasks: Task[];
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ hours, tasks }) => {
  // each hour row height
  const rowHeight = 64; // px

  return (
    <div className="relative flex">
      {/* Left column: time labels */}
      <div className="flex flex-col text-right text-sm text-muted-foreground">
        {hours.map((h) => (
          <div
            key={h}
            style={{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px` }}
          >
            {h.toString().padStart(2, "0")}.00
          </div>
        ))}
      </div>

      {/* Right column: schedule area */}
      <div className="relative flex-1 border-l border-gray-200">
        {/* striped background */}
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#e5e7eb20,#e5e7eb20 1px,transparent 1px,transparent 20px)]"
          style={{ backgroundSize: "24px 24px" }}
        />

        {/* current time line at 09:35 (9.5833) */}
        <div
          className="absolute left-0 right-0 h-px bg-blue-600"
          style={{ top: `${(9.5833 - hours[0]) * rowHeight}px` }}
        />

        {/* grid rows for reference */}
        <div>
          {hours.map((_, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100"
              style={{ height: `${rowHeight}px` }}
            />
          ))}
        </div>

        {/* task bars */}
        {tasks.map((t) => {
          const top = (t.startHour - hours[0]) * rowHeight;
          const height = (t.endHour - t.startHour) * rowHeight;
          return (
            <div
              key={t.id}
              className={cn(
                "absolute left-2 right-4 rounded-lg border-l-4 p-3 text-sm",
                t.colorClass,
                t.borderColorClass
              )}
              style={{ top: `${top}px`, height: `${height}px` }}
            >
              <div className="font-medium">{t.title}</div>
              <div className="mt-auto flex justify-between text-xs text-muted-foreground">
                <span>{t.timeLabel}</span>
                <span>{t.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
