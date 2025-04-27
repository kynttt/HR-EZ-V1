// src/components/Recruitment/JobDetailsPanel.tsx
"use client";

import Link from "next/link";
import { FC } from "react";
import { ChevronLeft, Share2, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const JobDetailsPanel: FC<{ jobId?: string }> = () => {
  // static content for now
  return (
    <div className="space-y-6">
      {/* Top bar: Back link + page title + global actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/recruitment/jobs"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Job List
          </Link>
          <h1 className="text-2xl font-semibold">UI/UX Designer</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search keyword…"
              className="w-full rounded-lg border bg-muted py-2 pl-3 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="rounded bg-muted px-1 text-xs">⌘+K</kbd>
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Job Description</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-6">
          {/* Header row: title + Description button */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <Button variant="outline" size="sm">
              Description
            </Button>
          </div>
          <Separator />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="space-y-8 lg:col-span-2">
              {/* About Company */}
              <div>
                <h3 className="text-lg font-medium mb-2">About Company</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We craft digital products for business and user goals. Help
                  find solutions with UI/UX designs that are intuitive and in
                  accordance with client business goals. We provide a
                  high-quality service in UI/UX Design & Development. We craft
                  digital products for businesses in achieving user goals by
                  providing intuitive solutions. We have worked with a vast
                  number of clients who have different backgrounds such as
                  construction, insurance, health, marketing, cryptocurrency,
                  stocks, games, startup, real estate and many others.
                </p>
              </div>

              {/* What you’ll do */}
              <div>
                <h3 className="text-lg font-medium mb-2">What you’ll do</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    Work as a User Interface Designer for our B2B SaaS product
                    along with stakeholders
                  </li>
                  <li>
                    Translate client briefs into a clear, user-friendly
                    interface design and interactions. Develop both low and
                    high-fidelity mocks.
                  </li>
                  <li>
                    Testing out design assumptions and usability level of your
                    design. Validate your design decisions through user
                    feedback, iterate your designs based on this feedback, and
                    meticulously document the process.
                  </li>
                  <li>
                    Work closely with a team of project managers, client
                    stakeholders, researchers, and content designers.
                  </li>
                  <li>
                    Conduct user research and evaluate user feedback.
                  </li>
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-medium mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    A mid level product designer with min. 3 years of experience.
                  </li>
                  <li>
                    A designer with a strong UI and UX portfolio that
                    demonstrates problem-solving skills, design methods, and
                    craftsmanship.
                  </li>
                  <li>
                    An organized designer that always documents their works,
                    Figma files, and research reports.
                  </li>
                  <li>
                    Comfortable with fast-paced work environments, context
                    switching, and excited to drive the projects forwards.
                  </li>
                  <li>
                    Able to explain your design process, outcome, and decisions
                    that you’ve made.
                  </li>
                  <li>
                    A proactive, solution-oriented person who is proactive and
                    willing to learn and who seeks growth in every aspect of
                    the job.
                  </li>
                  <li>
                    Able to work independently and is a reliable teammate even
                    in a remote working setting.
                  </li>
                </ul>
              </div>

              {/* Perks & benefits */}
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Perks & Benefits
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Flexible work hours and remote options</li>
                  <li>Health, dental, and vision insurance</li>
                  <li>Professional development budget</li>
                  <li>Company-sponsored team retreats</li>
                  <li>Equity and performance bonuses</li>
                </ul>
              </div>
            </div>

            {/* Right sidebar */}
            <Card className="border">
              <CardContent className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Active until
                </h3>
                <p className="font-semibold">Jan 31, 2024</p>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Department Type:</span>{" "}
                    Design
                  </div>
                  <div>
                    <span className="font-medium">Job Type:</span> Fulltime
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> Outside
                    Indonesia, Jakarta
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* we can leave candidates tab empty for now */}
        <TabsContent value="candidates">
          <p className="text-sm text-muted-foreground">
            Candidate board goes here…
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
