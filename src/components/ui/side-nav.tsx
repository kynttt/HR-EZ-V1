// src/components/ui/side-nav.tsx
"use client";

import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SideNavProps {
  children: ReactNode;
}

export const SideNav: FC<SideNavProps> = ({ children }) => {
  return (
    <nav className="px-2 py-4">
      <ul className="space-y-1">{children}</ul>
    </nav>
  );
};

export interface SideNavItemProps {
  icon?: ReactNode;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const SideNavItem: FC<SideNavItemProps> = ({
  icon,
  children,
  active = false,
  onClick,
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary",
          active
            ? "bg-muted text-primary"
            : "text-muted-foreground"
        )}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </button>
    </li>
  );
};
