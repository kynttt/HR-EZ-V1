// src/components/Employee/OrgChartTree.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, ZoomIn, ZoomOut } from "lucide-react";
import { PageTabs } from "../Shared/PageTabs";


interface Person {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

const CEO: Person = {
  id: "ceo",
  name: "Cameron Williamson",
  title: "Founder – CEO",
  avatar: "https://avatar.iran.liara.run/public/boy?usearname=[value]",
};

const departments = [
  {
    name: "Business & Marketing",
    color: "bg-blue-500",
    people: [
      { id: "leslie",    name: "Leslie Alexander", title: "Head of Project Manager", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrd4dsitg-Rhwx0aUZsGjzqkZn34JbVC9-w&s" },
      { id: "cody-f",    name: "Cody Firmansyah",  title: "Senior Project Manager", avatar: "https://avatar.iran.liara.run/public/boy" },
      { id: "jenni",     name: "Jenni William",     title: "Project Manager",          avatar: "https://avatar.iran.liara.run/public?usearname=[value]" },
    ],
  },
  {
    name: "Design",
    color: "bg-green-500",
    people: [
      { id: "brooklyn",  name: "Brooklyn Simmons", title: "Creative Director",        avatar: "https://avatar.iran.liara.run/public/boy" },
      { id: "ralph",     name: "Ralph Edwards",     title: "Senior UX Designer",        avatar: "https://avatar.iran.liara.run/public/boy" },
      { id: "vidi",      name: "Vidi Gutillerez",   title: "UX Designer",               avatar: "https://avatar.iran.liara.run/public/girl" },
      { id: "pablo",     name: "Pablo Hive",        title: "Graphic Design",            avatar: "https://avatar.iran.liara.run/public/boy" },
    ],
  },
  {
    name: "Development",
    color: "bg-indigo-500",
    people: [
      { id: "cody",      name: "Cody Fisher",       title: "Head of Development",       avatar: "https://avatar.iran.liara.run/public/boy" },
      { id: "asther",    name: "Asther Mulyani",    title: "Senior Front-End",          avatar: "https://avatar.iran.liara.run/public/[ID]" },
      { id: "jenny",     name: "Jenny Wilson",      title: "QA Engineering",            avatar: "https://avatar.iran.liara.run/public/girl?username=[value]" },
      { id: "eden",      name: "Eden Khoiruddin",   title: "Back-End",                  avatar: "https://avatar.iran.liara.run/public/boy?usearname=[value]" },
    ],
  },
];

export const OrgChartTree: React.FC = () => {
  return (
    <div className="space-y-6">
        <PageTabs
        active="/employee/org-chart"
        tabs={[
          { href: "/employee/manage", label: "Manage Employees" },
          { href: "/employee/org-chart", label: "Organization Chart" },
          { href: "/employee/time-off", label: "Request Time Off" },
        ]}
      />
      {/* Header + Edit button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Organization Chart</h2>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" /> Edit Organization
        </Button>
      </div>

<div className="bg-gray-100 md:p-8 p-2 rounded-lg">
      {/* CEO Node */}
      <div className="flex justify-center py-4">
        <Card className="!shadow-none px-2">
          <CardContent className="flex items-center space-x-8  p-3 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={CEO.avatar} alt={CEO.name} />
              <AvatarFallback>{CEO.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{CEO.name}</p>
              <p className="text-sm text-muted-foreground">{CEO.title}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments */}
      <div className="grid grid-cols-3">
        {departments.map((dept) => (
          <div key={dept.name} className="flex flex-col items-center">
            {/* Department Pill */}
            <div className={`
              ${dept.color} text-white px-4 py-1 my-4 rounded-full w-full md:w-1/2 mb-4
            `}>
              {dept.name}
            </div>

            {/* People Stack */}
            <div className="space-y-4">
              {dept.people.map((p) => (
                <Card key={p.id} className="max-w-xs">
                  <CardContent className="flex items-center space-x-8">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={p.avatar} alt={p.name} />
                      <AvatarFallback>{p.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
      {/* Zoom Controls */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Button variant="secondary" size="icon">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
