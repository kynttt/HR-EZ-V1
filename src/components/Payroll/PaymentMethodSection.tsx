// src/components/Payroll/PaymentMethodSection.tsx
"use client";

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Eye } from "lucide-react";

export const PaymentMethodSection: FC = () => (
  <Card className="w-full">
    <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0 p-6">
      {/* Left: Title + Details */}
      <div className="space-y-4 flex-1">
        <h2 className="text-lg font-medium flex items-center gap-2">
          Payment Method
          <Info className="h-4 w-4 text-muted-foreground" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cardholder */}
          <div>
            <p className="text-sm text-muted-foreground">Cardholder name</p>
            <p className="font-medium">Rocks Company Ltd</p>
          </div>

          {/* Account Number */}
          <div>
            <p className="text-sm text-muted-foreground">Account Number</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">**** **** **** 6273</p>
              <button className="text-muted-foreground hover:text-foreground">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Expiration */}
          <div>
            <p className="text-sm text-muted-foreground">Expiration</p>
            <p className="font-medium">12/28</p>
          </div>

          {/* Payment Method */}
          <div>
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="font-medium">
              <span className="text-blue-600">VISA</span> Debit Card • Visa
            </p>
          </div>
        </div>
      </div>

      {/* Right: Change button */}
      <Button variant="outline" className="whitespace-nowrap">
        Change Payment Method
      </Button>
    </CardContent>
  </Card>
);
