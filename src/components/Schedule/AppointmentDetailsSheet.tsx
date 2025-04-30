// src/components/Schedule/AppointmentDetailsSheet.tsx
"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  X as IconClose,
} from "lucide-react";

export interface AppointmentDetailsSheetProps {
  /** The trigger element, e.g. your “Add Task” button */
  children: React.ReactNode;
  task: Task; 
}

export function AppointmentDetailsSheet({
  children,
}: AppointmentDetailsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="right" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Appointment Details
          </SheetTitle>
          <SheetClose asChild>
            <button className="absolute top-4 right-4 p-1 rounded hover:bg-muted">
              {/* <IconClose className="h-5 w-5" /> */}
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="space-y-6 px-6 pb-6">
          {/* 1. Title & Date/Time */}
          <div className="space-y-1">
            <h3 className="text-xl font-medium">
              Interview with senior product design candidates
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Wednesday, March 17 2021</span>
              <Clock className="h-4 w-4" />
              <span>09:30 AM – 11:30 AM (2 Hours)</span>
            </div>
          </div>

          <Separator />

          {/* 2. Call Link */}
          <div className="space-y-2">
            <Label className="text-sm">Interview Call Link</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value="https://fikristudio.tiimi.com/call/34-ffg-12"
              />
              <Button>Go to Call Room</Button>
            </div>
          </div>

          {/* 3. Candidate Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/darlene.jpg" alt="Darlene Robertson" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Darlene Robertson</p>
              <p className="text-sm text-muted-foreground">
                0.0 ★ Purwokerto
              </p>
            </div>
          </div>

          {/* 4. Score Card */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Score Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Interpersonal Skills</h4>
                <p className="text-sm text-muted-foreground">
                  How good are they at striking up new conversation? Have they
                  put you at ease?
                </p>
              </div>
              <div>
                <h4 className="font-medium">Communication Skills</h4>
                <p className="text-sm text-muted-foreground">
                  This covers verbal and written skills. Are they able to
                  communicate their intent in a clear, straightforward manner?
                </p>
              </div>
              <div>
                <h4 className="font-medium">Problem Solving</h4>
                <p className="text-sm text-muted-foreground">
                  How good they are at solving problems? From small to big
                  problems.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Hiring Team */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Hiring Team</p>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatars/bagus.jpg" alt="Bagus Fikri" />
                <AvatarFallback>BF</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Bagus Fikri (Me)</p>
                <p className="text-sm text-muted-foreground">
                  bagusfikri@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* 6. Instruction */}
          <div className="space-y-1">
            <p className="text-sm font-medium">Instruction</p>
            <p className="text-sm text-muted-foreground">
              Submit interview result immediately to hiring manager
            </p>
          </div>

          {/* 7. Footer Action */}
          <div className="flex justify-end">
            <Button>Notify Candidate</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
