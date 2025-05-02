// src/components/Settings/panels.tsx
"use client";

import React, { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// ── General ───────────────────────────────────────────────────────────────────
export const GeneralPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>General</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Auto-save drafts</Label>
        <Switch defaultChecked />
      </div>
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input id="displayName" placeholder="Your display name" />
      </div>
      <div>
        <Label htmlFor="language">Language</Label>
        <Select>
          <SelectTrigger id="language"><SelectValue placeholder="Select language" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

// ── Notifications ─────────────────────────────────────────────────────────────
export const NotificationsPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      {[
        ["Email Notifications", true],
        ["Push Notifications", false],
        ["SMS Notifications", false],
      ].map(([label, def], i) => (
        <div key={i} className="flex items-center justify-between">
          <Label>{label}</Label>
          <Switch defaultChecked={def as boolean} />
        </div>
      ))}
    </CardContent>
  </Card>
);

// ── Personalization ───────────────────────────────────────────────────────────
export const PersonalizationPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Personalization</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="theme">Theme</Label>
        <Select>
          <SelectTrigger id="theme"><SelectValue placeholder="Select theme" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System Default</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="fontSize">Font Size</Label>
        <Select>
          <SelectTrigger id="fontSize"><SelectValue placeholder="Select size" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

// ── Speech ─────────────────────────────────────────────────────────────────────
export const SpeechPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Speech</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Enable Voice Mode</Label>
        <Switch />
      </div>
      <div>
        <Label htmlFor="voiceType">Voice Type</Label>
        <Select>
          <SelectTrigger id="voiceType"><SelectValue placeholder="Select voice" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

// ── Data Controls ─────────────────────────────────────────────────────────────
export const DataControlsPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Data controls</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Allow data sharing</Label>
        <Switch />
      </div>
      <div>
        <Label htmlFor="retention">Retention Period</Label>
        <Select>
          <SelectTrigger id="retention"><SelectValue placeholder="Select period" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="90">90 days</SelectItem>
            <SelectItem value="365">1 year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

// ── Builder Profile ────────────────────────────────────────────────────────────
export const BuilderProfilePanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Builder profile</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="defaultModel">Default Model</Label>
        <Select>
          <SelectTrigger id="defaultModel"><SelectValue placeholder="Choose model" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="o4-mini">o4-mini</SelectItem>
            <SelectItem value="o4-mini-high">o4-mini-high</SelectItem>
            <SelectItem value="gpt-4.5">GPT-4.5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <Input id="apiKey" placeholder="Enter your API key" />
      </div>
    </CardContent>
  </Card>
);

// ── Connected Apps ─────────────────────────────────────────────────────────────
export const ConnectedAppsPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Connected apps</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      {["Slack", "Google Drive", "Dropbox"].map((app) => (
        <div key={app} className="flex items-center justify-between">
          <span>{app}</span>
          <Button variant="outline" size="sm">Manage</Button>
        </div>
      ))}
      <Separator />
      <Button size="sm">+ Connect new app</Button>
    </CardContent>
  </Card>
);

// ── Security ───────────────────────────────────────────────────────────────────
export const SecurityPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Security</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      {[
        ["currentPassword", "Current password"],
        ["newPassword", "New password"],
        ["confirmPassword", "Confirm password"],
      ].map(([id, label]) => (
        <div key={id}>
          <Label htmlFor={id}>{label}</Label>
          <Input id={id} type="password" />
        </div>
      ))}
      <Separator />
      <div className="flex items-center justify-between">
        <Label>Enable 2FA</Label>
        <Switch />
      </div>
    </CardContent>
  </Card>
);

// ── Subscription ───────────────────────────────────────────────────────────────
export const SubscriptionPanel: FC = () => (
  <Card>
    <CardHeader><CardTitle>Subscription</CardTitle></CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p>ChatGPT Plus</p>
          <p className="text-sm text-muted-foreground">Renews on May 6, 2025</p>
        </div>
        <Button size="sm">Manage</Button>
      </div>
      <div className="p-4 border rounded space-y-2 text-sm">
        <ul className="list-disc list-inside space-y-1">
          <li>Everything in Free</li>
          <li>Extended messaging & file upload limits</li>
          <li>Standard & advanced voice modes</li>
          <li>Access to deep research models</li>
          <li>Create tasks, projects, and custom GPTs</li>
        </ul>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span>Payment</span>
        <Button size="sm">Manage</Button>
      </div>
    </CardContent>
  </Card>
);
