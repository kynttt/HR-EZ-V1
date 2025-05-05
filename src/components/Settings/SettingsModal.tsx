// src/components/Settings/SettingsDrawer.tsx
"use client";

import { useState, ElementType, ReactNode } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SideNav, SideNavItem } from "@/components/ui/side-nav";
import {
  Settings as IconSettings,
  Bell as IconBell,
  Edit3 as IconPersonalize,
  Mail as IconSpeech,
  Lock as IconData,
  User as IconBuilder,
  Link as IconApps,
  Shield as IconSecurity,
  CreditCard as IconSubscription,
} from "lucide-react";

import {
  GeneralPanel,
  NotificationsPanel,
  PersonalizationPanel,
  SpeechPanel,
  DataControlsPanel,
  BuilderProfilePanel,
  ConnectedAppsPanel,
  SecurityPanel,
  SubscriptionPanel,
} from "@/components/Settings/panels";

interface SettingsDrawerProps {
  children: ReactNode;
}

const sections = [
  { key: "general",         label: "General",         icon: IconSettings     },
  { key: "notifications",   label: "Notifications",   icon: IconBell         },
  { key: "personalization", label: "Personalization", icon: IconPersonalize  },
  { key: "speech",          label: "Speech",          icon: IconSpeech       },
  { key: "data",            label: "Data controls",   icon: IconData         },
  { key: "builder",         label: "Builder profile", icon: IconBuilder      },
  { key: "apps",            label: "Connected apps",  icon: IconApps         },
  { key: "security",        label: "Security",        icon: IconSecurity     },
  { key: "subscription",    label: "Subscription",    icon: IconSubscription },
] as const;
type SectionKey = typeof sections[number]["key"];

export function SettingsDrawer({ children }: SettingsDrawerProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionKey>("general");

  const renderPanel = () => {
    switch (active) {
      case "general":         return <GeneralPanel />;
      case "notifications":   return <NotificationsPanel />;
      case "personalization": return <PersonalizationPanel />;
      case "speech":          return <SpeechPanel />;
      case "data":            return <DataControlsPanel />;
      case "builder":         return <BuilderProfilePanel />;
      case "apps":            return <ConnectedAppsPanel />;
      case "security":        return <SecurityPanel />;
      case "subscription":    return <SubscriptionPanel />;
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent className="w-full md:w-1/2 ">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>

        <div className="flex h-[calc(100%-4rem)]">
          <ScrollArea className="w-56 border-r">
            <SideNav>
              {sections.map(({ key, label, icon: Icon }: { key: SectionKey; label: string; icon: ElementType }) => (
                <SideNavItem
                  key={key}
                  icon={<Icon className="h-5 w-5" />}
                  active={active === key}
                  onClick={() => setActive(key)}
                >
                  {label}
                </SideNavItem>
              ))}
            </SideNav>
          </ScrollArea>

          <ScrollArea className="flex-1 p-6 overflow-auto">
            {renderPanel()}
          </ScrollArea>
        </div>

        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
