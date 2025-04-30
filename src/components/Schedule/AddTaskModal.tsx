// src/components/Schedule/AddTaskModal.tsx
"use client";

import { useState, FC, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Task } from "./ScheduleBoard"; // adjust this import to your Task type

interface AddTaskModalProps {
  onAdd: (task: Task) => void;
}

export const AddTaskModal: FC<AddTaskModalProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [colorClass, setColorClass] = useState("bg-green-200/70");
  const [borderColorClass, setBorderColorClass] = useState("border-green-500");
  const [callLink, setCallLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    // convert HH:MM to decimal hours
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const startHour = sh + sm / 60;
    const endHour = eh + em / 60;

    // build label/duration
    const durationMins = (endHour - startHour) * 60;
    const label =
      durationMins % 60 === 0
        ? `${durationMins / 60} hour${durationMins / 60 > 1 ? "s" : ""}`
        : `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;

    const task: Task = {
      id: Date.now().toString(),
      title,
      startHour,
      endHour,
      colorClass,
      borderColorClass,
      label,
      timeLabel: `${startTime} – ${endTime}`,
    };
    onAdd(task);
    setOpen(false);
    // reset form
    setTitle("");
    setDate(undefined);
    setStartTime("09:00");
    setEndTime("10:00");
    setCallLink("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details for your interview / task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 py-4">
          {/* Title */}
          <div>
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Interview with Jane Doe"
            />
          </div>

          {/* Date */}
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                >
                  {date
                    ? date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Pick a date"}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Range */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label>End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Call Link */}
          <div className="col-span-1">
            <Label htmlFor="call-link">Interview Call Link</Label>
            <Input
              id="call-link"
              type="url"
              value={callLink}
              onChange={(e) => setCallLink(e.target.value)}
              placeholder="https://meet.yourapp.com/abc123"
            />
          </div>

          {/* Description/Instructions */}
          <div className="col-span-1">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Submit feedback immediately to hiring manager."
            />
          </div>
        </form>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
