// src/components/Recruitment/NewJobModal.tsx
"use client";

import { useState } from "react";
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
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import {
  Bold,
  Italic,
  Underline as LucideUnderline,
  List as LucideList,
  ListOrdered,
} from "lucide-react";

export function NewJobModal() {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState<Date | undefined>(undefined);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,           // <<— adds toggleUnderline()
    ],
    content: "",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create New Job</Button>
      </DialogTrigger>

      {/* now an extra-wide dialog */}
      <DialogContent className="w-full max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to post a new position.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="col-span-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Senior UX Designer"
              className="w-full"
            />
          </div>

          {/* Rich Text Description */}
          <div className="col-span-2 space-y-2">
            <Label>Job Description</Label>

            {/* TipTap toolbar */}
            <div className="flex space-x-2 border rounded-t-lg bg-background p-2">
              <Button
                variant={editor?.isActive("bold") ? "default" : "outline"}
                size="sm"
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={editor?.isActive("italic") ? "default" : "outline"}
                size="sm"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant={editor?.isActive("underline") ? "default" : "outline"}
                size="sm"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
              >
                <LucideUnderline className="h-4 w-4" />
              </Button>
              <Button
                variant={editor?.isActive("bulletList") ? "default" : "outline"}
                size="sm"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                <LucideList className="h-4 w-4" />
              </Button>
              <Button
                variant={editor?.isActive("orderedList") ? "default" : "outline"}
                size="sm"
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>

            {/* Editor area */}
            <div className="border rounded-b-lg">
              <EditorContent
                editor={editor}
                className="min-h-[200px] p-4 prose prose-sm"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hiring Manager */}
          <div>
            <Label htmlFor="hiringManager">Hiring Manager</Label>
            <Select>
              <SelectTrigger id="hiringManager">
                <SelectValue placeholder="Select Hiring Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alice">Alice Smith</SelectItem>
                <SelectItem value="bob">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recruitment Period */}
          <div>
            <Label htmlFor="period">Recruitment Period</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {period ? period.toLocaleDateString() : "Select period"}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={period}
                  onSelect={setPeriod}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Job Type */}
          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Select>
              <SelectTrigger id="jobType">
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Full Time</SelectItem>
                <SelectItem value="parttime">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recruitment Quota */}
          <div>
            <Label htmlFor="quota">Recruitment Quota</Label>
            <Input id="quota" type="number" placeholder="e.g. 5" />
          </div>

          {/* Experience (Years) */}
          <div>
            <Label htmlFor="experience">Experience (Years)</Label>
            <Input id="experience" type="number" placeholder="e.g. 3" />
          </div>

          {/* Expected Salary */}
          <div>
            <Label htmlFor="salary">Expected Salary</Label>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                </SelectContent>
              </Select>
              <Input id="salary" type="number" placeholder="Amount" className="flex-1" />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger id="location">
                <SelectValue placeholder="Choose Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Skill Sets */}
          <div className="col-span-2 flex items-center justify-between">
            <Label>Skill Sets</Label>
            <Button variant="outline" size="sm">
              + Add New Skill
            </Button>
          </div>

          {/* Allow Apply */}
          <div className="col-span-2 flex items-center gap-2">
            <Toggle id="allowApply" />
            <Label htmlFor="allowApply" className="!mb-0">
              Allow employees to apply
            </Label>
          </div>
        </form>

        <DialogFooter className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create Job</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
