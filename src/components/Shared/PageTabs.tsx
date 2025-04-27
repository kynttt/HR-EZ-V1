// components/Shared/PageTabs.tsx
"use client";
import { FC, ElementType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PageTab {
  label: string;
  href: string;
  icon?: ElementType;
}

interface PageTabsProps {
  tabs: PageTab[];
  active?: string;
  className?: string;
}

export const PageTabs: FC<PageTabsProps> = ({ tabs, active, className }) => (
  <nav className={cn("flex space-x-8 border-b", className)}>
    {tabs.map((tab) => {
      const isActive = tab.href === active;
      const Icon = tab.icon;
      return (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium",
            isActive
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary"
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{tab.label}</span>
        </Link>
      );
    })}
  </nav>
);
