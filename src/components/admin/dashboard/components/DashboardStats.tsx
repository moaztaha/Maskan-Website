import { Building2, CheckCircle2, BadgeDollarSign, MessageSquareText, ArrowUpRight } from "lucide-react";

type DashboardStatsData = {
  properties: {
    total: number;
    published: number;
    draft: number;
    sold: number;
  };
  inquiries: {
    total: number;
    new: number;
    contacted: number;
    completed: number;
  };
};

type DashboardStatsProps = {
  status: DashboardStatsData;
};


const tones = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  accent: "bg-accent-soft text-accent",
  danger: "bg-danger/10 text-danger",
};

export function DashboardStats({ status }: DashboardStatsProps) {
  const metrics = [
    {
      label: "Total Properties",
      value: status.properties.total,
      change: "All listings",
      note: "properties in database",
      icon: Building2,
      tone: "primary",
    },
    {
      label: "Published",
      value: status.properties.published,
      change: "Published",
      note: "properties on platform",
      icon: CheckCircle2,
      tone: "success",
    },
    {
      label: "Sold Properties",
      value: status.properties.sold,
      change: "Sold",
      note: "successfully sold",
      icon: BadgeDollarSign,
      tone: "accent",
    },
    {
      label: "New Inquiries",
      value: status.inquiries.new,
      change: status.inquiries.new > 0 ? "Needs Reply" : "All Clear",
      note: "awaiting response",
      icon: MessageSquareText,
      tone: "danger",
    },
  ] as const;

  return (
    <section aria-label="Platform metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, change, note, icon: Icon, tone }) => (
        <article key={label} className="rounded-xl border border-border bg-bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-text-secondary">{label}</p>
              <p className="mt-3 font-[var(--font-cairo)] text-3xl font-bold tracking-tight text-text-primary">{value}</p>
            </div>
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={21} aria-hidden="true" /></span>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold ${tone === "danger" ? tones.danger : tones.success}`}>
              {tone !== "danger" && <ArrowUpRight size={14} aria-hidden="true" />}{change}
            </span>
            <span className="text-text-muted">{note}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
