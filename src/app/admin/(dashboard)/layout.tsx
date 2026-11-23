import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminHeader } from "@/components/admin/dashboard/shared/AdminHeader";
import { AdminNavProvider } from "@/components/admin/dashboard/shared/AdminNavContext";
import { Container } from "@/components/layout/Container";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/server/auth/get-current-admin";
import { AdminDashboardShellSkeleton } from "@/components/ui/LoadingSkeletons";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<AdminDashboardShellSkeleton />}>
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
    </Suspense>
  );
}

async function AuthenticatedDashboard({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminNavProvider>
      <div className="min-h-screen w-full">
        <AdminHeader admin={admin} />
        <main className="min-h-[calc(100vh-4rem)] bg-bg-page">
          <Container className="admin-dashboard-container py-6 sm:py-8">{children}</Container>
        </main>
      </div>
    </AdminNavProvider>
  );
}
