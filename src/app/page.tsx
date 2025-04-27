import { FC } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import HeroSection from "@/components/hero-section";

const HomePage: FC = () => (
  <div className="p-8 space-y-8">
    <ModeToggle/>
    <HeroSection/>
    {/* <h1 className="text-3xl font-bold">Welcome to HR-EZ</h1>
    <p className="text-lg text-muted-foreground">
      Simplify hiring, onboarding, performance checks, payroll and scheduling—all in one dashboard.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/employee/manage">Manage Employees</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recruitment</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/recruitment/jobs">View Jobs</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payroll</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/payroll">Manage Payroll</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/schedule">View Schedule</Link>
          </Button>
        </CardContent>
      </Card>
    </div> */}
  </div>
);

export default HomePage;
