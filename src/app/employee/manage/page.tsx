// src/app/employee/manage/page.tsx
import { FC } from "react";
import { EmployeeTable } from "@/components/EmployeeTable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

const ManageEmployeesPage: FC = () => (
  <div className="">

    <SidebarProvider>
         
      <AppSidebar variant="inset" />
      
      <SidebarInset>
     
        <SiteHeader />
        
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <EmployeeTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
);

export default ManageEmployeesPage;
