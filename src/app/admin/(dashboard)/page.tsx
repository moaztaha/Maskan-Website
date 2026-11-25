import Link from "next/link";
import { Download, Plus } from "lucide-react";
import { DashboardStats } from "@/components/admin/dashboard/components/DashboardStats";
import { InquiryActivityChart } from "@/components/admin/dashboard/components/InquiryActivityChart";
import { LatestInquiries } from "@/components/admin/dashboard/components/LatestInquiries";
import { PropertyStatusChart } from "@/components/admin/dashboard/components/PropertyStatusChart";
import { getDashboardStats } from "@/server/queries/admin-dashboard";
import { getInquiries, getInquiryActivity } from "@/server/queries/inquiries";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/ui/LoadingSkeletons";


type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardData searchParams={searchParams} />
    </Suspense>
  );
}

async function DashboardData({ searchParams }: PageProps) {
  const params = await searchParams;

  const requestedPage = Number(params.page ?? 1);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;


  const status = await getDashboardStats();
  const inquiryActivity = await getInquiryActivity();
  const inquiriesData = await getInquiries(page);
  return (

    <div className="space-y-7 sm:space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><h1 className="font-[var(--font-cairo)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Platform Overview</h1><p className="mt-1.5 text-sm text-text-secondary sm:text-base">Here’s what’s happening with your properties today.</p></div>

      </div>
      <DashboardStats status={status} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,1fr)]"><InquiryActivityChart data={inquiryActivity} /><PropertyStatusChart status={status} /></div>
      <LatestInquiries data={inquiriesData} />
    </div>

  );
}
