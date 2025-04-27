// src/app/recruitment/jobs/page.tsx
import { FC } from "react";
import { JobCard, JobCardProps } from "@/components/Recruitment/JobCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { PageTabs } from "@/components/Shared/PageTabs";

const jobs: JobCardProps[] = [
  {
    title: "UI/UX Designer",
    description:
      "Gathering and evaluating user requirements, in collaboration with product managers and engineers.",
    department: "Design",
    type: "Full Time",
    location: "Onsite",
    activeUntil: "Jan 31, 2024",
  },
  {
    title: "Junior Frontend Developer",
    description:
      "A front-end developer is basically a web developer who has a specialization in creating user interfaces for applications.",
    department: "Development",
    type: "Full Time",
    location: "Remote",
    activeUntil: "Jan 31, 2024",
  },
  {
    title: "Motion Graphic Designer",
    description:
      "We are currently hiring a Motion Graphics Designer who will work closely with the marketing team, video producers.",
    department: "Design",
    type: "Full Time",
    location: "Onsite",
    activeUntil: "Jan 31, 2024",
  },
  {
    title: "SEO Specialist",
    description:
      "Program in HTML, CSS and JavaScript to ensure the site is accessible and easy to follow and for increased interaction.",
    department: "Business & Marketing",
    type: "Full Time",
    location: "Onsite",
    activeUntil: "Jan 31, 2024",
  },
  {
    title: "Project Assistant Manager",
    description:
      "Ensure that the project complies with the schedule, rules and regulations, manage and coordinate with the entire team.",
    department: "Project Manager",
    type: "Full Time",
    location: "Remote",
    activeUntil: "Jan 31, 2024",
  },
  {
    title: "Intern Graphic Design",
    description:
      "Develop illustrations, logos and other designs using software or by hand, work with copywriters and creatives.",
    department: "Design",
    type: "Full Time",
    location: "Onsite",
    activeUntil: "Jan 31, 2024",
  },
];

const JobsListPage: FC = () => (
<SidebarProvider>       
<AppSidebar variant="inset" />
<SidebarInset>
  <SiteHeader />
  <div className="flex flex-1 flex-col">
 
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="p-8 space-y-6">
      <PageTabs
        active="/recruitment/jobs"
        tabs={[
          { href: "/recruitment/jobs", label: "Job Lists" },
          { href: "/recruitment/candidates", label: "Candidates" },
        ]}
      />
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Recruitment</h1>
        <p className="text-sm text-muted-foreground">
          Manage recruitment process
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          Active Jobs <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button asChild>
                   <Link
                     href={`/recruitment/jobs/${encodeURIComponent(
                       jobs[0].title
                         .toLowerCase()
                         .replace(/\s+/g, "-")
                     )}/description`}
                   >
                     + Create New Job
                   </Link>
                </Button>
      </div>
    </div>

    {/* Job Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.title} {...job} />
      ))}
    </div>
  </div>
      </div>
    </div>
  </div>
</SidebarInset>
</SidebarProvider>



  
);

export default JobsListPage;
