import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Sidebar } from "@/components/admin/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <AdminHeader />
      <main>{children}</main>
    </>
  );
}
