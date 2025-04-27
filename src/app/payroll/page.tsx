// src/app/payroll/page.tsx
import { FC } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { PaymentMethodSection } from "@/components/Payroll/PaymentMethodSection";
import { ListPayrollSection } from "@/components/Payroll/ListPayrollSection";
import { Button } from "@/components/ui/button";

const PayrollPage: FC = () => (
  <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />

      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Payroll</h1>
            <p className="text-sm text-muted-foreground">
              Manage all your invoices and make sure employees get paid on time
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export</Button>
            <Button>Pay All Invoices</Button>
          </div>
        </div>

        {/* Sections */}
        <PaymentMethodSection />
        <ListPayrollSection />
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default PayrollPage;
