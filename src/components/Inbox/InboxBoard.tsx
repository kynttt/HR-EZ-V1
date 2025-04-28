// src/components/Inbox/InboxBoard.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Star,
  Mail,
  Download,
  Paperclip,
  Mic,
  Smile,
  Calendar,
  Clock,
  Phone,
} from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  job: string;
  team: string;
  timeAgo: string;
  rating: number;
  unread?: number;
}

const conversations: Conversation[] = [
  {
    id: "cody",
    name: "Cody Fisher",
    avatar: "/avatars/cody.jpg",
    job: "Senior UIX Designer",
    team: "Design Team",
    timeAgo: "2 days ago",
    rating: 4,
    unread: 0,
  },
  {
    id: "jane",
    name: "Jane Cooper",
    avatar: "/avatars/jane.jpg",
    job: "Senior UIX Designer",
    team: "Design Team",
    timeAgo: "2 days ago",
    rating: 5,
    unread: 2,
  },
  // …
];

export const InboxBoard: React.FC = () => {
  const [activeId, setActiveId] = React.useState(conversations[0].id);
  const activeConv = conversations.find((c) => c.id === activeId)!;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr_300px] h-full overflow-hidden">
      {/* ─── Left Pane ───────────────────────────── */}
      <div className="flex flex-col border-b sm:border-b-0 sm:border-r">
        <div className="p-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 bg-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
        <div className="flex-1 overflow-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full flex items-center gap-3 p-3 text-left hover:bg-muted ${
                c.id === activeId ? "bg-primary/10" : ""
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={c.avatar} alt={c.name} />
                <AvatarFallback>{c.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.timeAgo}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{c.job}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < c.rating
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  {c.unread! > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {c.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Middle Pane ──────────────────────────── */}
      <div className="flex flex-col flex-1 bg-muted">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              Your Application for {activeConv.job} – FikriStudio
            </h2>
            <p className="text-sm text-muted-foreground">
              Job: {activeConv.job} &nbsp;|&nbsp; {activeConv.team}
            </p>
          </div>
          <ToggleGroup
            type="single"
            defaultValue="whatsapp"
            className="rounded-md border"
          >
            <ToggleGroupItem value="email" className="px-3 py-1">
              Email
            </ToggleGroupItem>
            <ToggleGroupItem value="whatsapp" className="px-3 py-1">
              WhatsApp
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Incoming */}
          <div className="max-w-xl space-y-4">
            <div className="rounded-lg bg-white p-4 text-sm leading-relaxed">
              Hello, here is the file you requested before.<br />
              Please checkout this attachment, and let me know if you need
              something else.
            </div>

            {/* Attachment */}
            <div className="w-72 rounded-lg bg-white p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">CV New.doc</p>
                  <p className="text-xs text-muted-foreground">1.2 Mb</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">14:59 PM</p>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <span className="bg-muted px-3 text-xs text-muted-foreground">
                Today
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
            </div>

            {/* Outgoing */}
            <div className="flex justify-end">
              <div className="max-w-xl rounded-lg bg-green-100 p-4 text-sm text-green-900">
                Hi Cody, thank you! I’ll check this out and let you know if we
                need anything else.
              </div>
            </div>

            {/* Reactions */}
            <div className="flex justify-end space-x-1 text-2xl">👍👍👍👍👍</div>
            <p className="text-right text-xs text-muted-foreground">09:10 AM</p>
          </div>
        </div>

        {/* Reply Bar */}
        <div className="border-t p-4 flex items-center gap-2 bg-background">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type your message here…"
            className="flex-1 rounded-full bg-input text-foreground placeholder:text-muted-foreground"
          />
          <Button>Send</Button>
        </div>
      </div>

      {/* ─── Right Pane (hidden on mobile) ─────────── */}
      <div className="hidden sm:flex border-l flex-col p-4 space-y-6 overflow-auto">
        <div className="flex flex-col items-center text-center space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={activeConv.avatar} alt={activeConv.name} />
            <AvatarFallback>{activeConv.name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium">{activeConv.name}</h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: activeConv.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500" />
            ))}
            <span className="text-sm">{activeConv.rating}.0</span>
            <span className="text-xs text-muted-foreground">Purwokerto</span>
          </div>
          <Button variant="link" size="sm">
            View Profile
          </Button>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-sm font-medium">Applied For:</p>
          <p className="text-sm">{activeConv.job}</p>
          <p className="text-xs text-muted-foreground">{activeConv.team}</p>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-sm font-medium">Progress:</p>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={
                  step <= 2
                    ? "h-2 w-2 rounded-full bg-primary"
                    : "h-2 w-2 rounded-full bg-muted-foreground"
                }
              />
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-1 text-sm">
          <p className="font-medium">Contact:</p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{activeConv.name.toLowerCase().split(" ")[0]}@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+1-234-567-8912</span>
          </div>
        </div>

        <Separator />

        <Button variant="outline" size="sm" className="w-full">
          + Add Owner
        </Button>

        <Separator />

        <div className="space-y-1">
          <p className="text-sm font-medium">Schedule</p>
          <div className="space-y-2">
            <p className="text-sm">
              Alignment for onboarding new member on Product Teams
            </p>
            <Badge variant="outline" className="text-xs">
              waiting approval
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Mar 9th 2021</span>
              <Clock className="h-4 w-4" />
              <span>7:00-7:45am</span>
            </div>
            <Button variant="link" size="sm">
              View Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
