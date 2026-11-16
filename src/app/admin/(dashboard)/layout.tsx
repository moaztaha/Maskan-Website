import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Sidebar } from "@/components/admin/Sidebar";
import { Container } from "@/components/layout/Container";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <AdminHeader />
      <main><Container>{children}</Container></main>
    </>
  );
}
