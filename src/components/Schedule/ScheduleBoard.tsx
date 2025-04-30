// src/components/Schedule/ScheduleBoard.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Bell,
  Share2,
  ChevronDown,
  Plus,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { AppointmentDetailsSheet } from "@/components/Schedule/AppointmentDetailsSheet";
import { cn } from "@/lib/utils";
import { AddTaskModal } from "./AddTaskModal";

export interface Task {
  id: string;
  title: string;
  startHour: number;        // e.g. 8.0 for 8:00, 8.5 for 8:30
  endHour: number;          // e.g. 10.0 for 10:00
  colorClass: string;       // Tailwind bg-* for the block
  borderColorClass: string; // Tailwind border-l-4 color
  label: string;            // duration label
  timeLabel: string;        // "08:00 - 10:00"
}

// rename this so it doesn't conflict with state
const initialTasks: Task[] = [
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
  // full 0–23 hour labels
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <div className="flex h-screen flex-col space-y-6 p-6">
      <ScheduleHeader
        viewDate={viewDate}
        onDateChange={setViewDate}
        onAddTask={(task) => setTasks((t) => [...t, task])}
      />

      <div className="flex-1 overflow-y-auto">
        <ScheduleGrid hours={hours} tasks={tasks} />
      </div>
    </div>
  );
};

type ScheduleHeaderProps = {
  viewDate: Date;
  onDateChange: (date: Date) => void;
  onAddTask: (task: Task) => void;
};

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  viewDate,
  onDateChange,
  onAddTask,
}) => (
  <div className="space-y-4">
    {/* top row */}
    <div className="flex items-center justify-between">
      <div className="relative max-w-lg">
        <Input placeholder="Search keyword…" className="pl-10" />
        <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 text-muted-foreground -translate-y-1/2" />
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

    {/* second row */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="flex items-center space-x-2 text-2xl font-semibold">
          <Plus className="h-6 w-6 text-primary" />
          <span>Schedule</span>
        </h1>
        <p className="text-sm text-muted-foreground">Manage your schedule</p>
      </div>
      <div className="flex space-x-2">
        <AddTaskModal onAdd={onAddTask} />

        <Button variant="ghost">
          <ChevronDown className="h-4 w-4" /> Export
        </Button>
      </div>
    </div>

    {/* third row */}
    <div className="flex items-center justify-between">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="link" className="text-lg font-medium">
            {viewDate.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            <ChevronDown className="inline-block h-4 w-4 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={viewDate}
            onSelect={(d) => d && onDateChange(d)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <ToggleGroup type="single" defaultValue="today" className="space-x-2">
        <ToggleGroupItem value="today">Today</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
    <hr className="border-gray-200" />
  </div>
);

interface ScheduleGridProps {
  hours: number[];
  tasks: Task[];
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ hours, tasks }) => {
  const rowHeight = 64; // px per hour

  return (
    <div className="relative flex">
      {/* time labels */}
      <div className="flex flex-col text-right text-sm text-muted-foreground">
        {hours.map((h) => (
          <div
            key={h}
            style={{ height: rowHeight, lineHeight: `${rowHeight}px` }}
          >
            {h.toString().padStart(2, "0")}.00
          </div>
        ))}
      </div>

      {/* schedule area */}
      <div className="relative flex-1 border-l border-gray-200">
        {/* striped background */}
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#e5e7eb20,#e5e7eb20 1px,transparent 1px,transparent 20px)]"
          style={{ backgroundSize: "24px 24px" }}
        />

        {/* current time line (example at 09:35) */}
        <div
          className="absolute left-0 right-0 h-px bg-blue-600"
          style={{ top: (9.5833 - hours[0]) * rowHeight }}
        />

        {/* horizontal grid */}
        {hours.map((_, i) => (
          <div
            key={i}
            className="border-b border-gray-100"
            style={{ height: rowHeight }}
          />
        ))}

        {/* task bars, laid out side-by-side when they overlap */}
        {tasks.map((t) => {
          // find all tasks that overlap in time with this one
          const overlapGroup = tasks
            .filter(
              (u) =>
                u.startHour < t.endHour && // starts before this one ends
                u.endHour > t.startHour    // ends after this one starts
            )
            // sort by start time so we get a deterministic column index
            .sort((a, b) => a.startHour - b.startHour);

          const groupSize = overlapGroup.length;
          const colIndex = overlapGroup.findIndex((u) => u.id === t.id);

          // compute CSS calc() strings for left & right
          const left = `calc(16px + ${colIndex} * ((100% - 32px) / ${groupSize}))`;
          const right = `calc(16px + ${groupSize - 1 - colIndex
            } * ((100% - 32px) / ${groupSize}))`;

          const top = (t.startHour - hours[0]) * rowHeight;
          const height = (t.endHour - t.startHour) * rowHeight;

          return (
            <AppointmentDetailsSheet key={t.id} task={t}>
              <div
                role="button"
                tabIndex={0}
                className={cn(
                  "absolute rounded-lg p-3 m-2 text-sm cursor-pointer hover:shadow-lg transition-shadow",
                  t.colorClass,
                  t.borderColorClass
                )}
                style={{
                  top: `${top}px`,
                  height: `${height}px`,
                  left,
                  right,
                }}
              >
                <div className="font-medium">{t.title}</div>
                <div className="mt-auto flex justify-between text-xs text-muted-foreground">
                  <span>{t.timeLabel}</span>
                  <span>{t.label}</span>
                </div>
              </div>
            </AppointmentDetailsSheet>
          );
        })}
      </div>
    </div>
  );
};
