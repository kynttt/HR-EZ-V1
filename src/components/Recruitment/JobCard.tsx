// src/components/Recruitment/JobCard.tsx
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface JobCardProps {
  title: string;
  description: string;
  department: string;
  type: string;
  location: string;
  activeUntil: string;
}

export const JobCard: FC<JobCardProps> = ({
  title,
  description,
  department,
  type,
  location,
  activeUntil,
}) => (
  <Card className="border hover:shadow-lg transition-shadow">
    <CardContent className="space-y-4">
      {/* Active Until */}
      <Badge variant="outline" className="text-xs">
        Active until: {activeUntil}
      </Badge>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold leading-snug">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="secondary">{department}</Badge>
        <Badge>{type}</Badge>
        <Badge>{location}</Badge>
      </div>
    </CardContent>
  </Card>
);
