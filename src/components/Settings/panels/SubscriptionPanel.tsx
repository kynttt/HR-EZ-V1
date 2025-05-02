// src/components/Settings/panels.tsx
"use client"

import { FC } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

// Example General panel
export const GeneralPanel: FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>General</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <label>Auto-save drafts</label>
        <Switch defaultChecked />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <Input placeholder="Your display name" />
      </div>
    </CardContent>
  </Card>
)

// Example Notifications panel
export const NotificationsPanel: FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <label>Email me when a candidate is scheduled</label>
        <Switch />
      </div>
      <div className="flex justify-between items-center">
        <label>Push notifications</label>
        <Switch defaultChecked />
      </div>
    </CardContent>
  </Card>
)

// add more exports for PersonalizationPanel, SecurityPanel, etc.
