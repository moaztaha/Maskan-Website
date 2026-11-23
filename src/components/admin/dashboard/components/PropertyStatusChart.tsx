"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PropertyStatusChartData = {
  properties: {
    total: number;
    published: number;
    draft: number;
    sold: number;
  };
};

type PropertyStatusChartProps = {
  status: PropertyStatusChartData;
};

type TooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      label: string;
      value: number;
      percent: number;
    };
  }[];
};

function PropertyStatusTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-bg-surface p-3 shadow-lg">
      <p className="text-sm font-semibold text-text-primary">
        {item.label}
      </p>

      <p className="mt-1 text-sm text-text-secondary">
        {item.value.toLocaleString()} Properties
      </p>

      <p className="text-xs text-text-muted">
        {item.percent}% of total
      </p>
    </div>
  );
}

export function PropertyStatusChart({ status }: PropertyStatusChartProps) {
  const circumference = 2 * Math.PI * 43;
  let offset = 0;

  const segments = [
    {
      label: "Published",
      value: status.properties.published,
      color: "var(--primary)",
    },
    {
      label: "Sold",
      value: status.properties.sold,
      color: "var(--accent)",
    },
    {
      label: "Draft",
      value: status.properties.draft,
      color: "var(--success)",
    },
  ].map((item) => ({
    ...item,
    percent:
      status.properties.total > 0
        ? Math.round((item.value / status.properties.total) * 100)
        : 0,
  }));
  return (
    <section className="rounded-xl border border-border bg-bg-surface p-5 shadow-sm sm:p-6" aria-labelledby="property-status-title">
      <h2 id="property-status-title" className="font-[var(--font-cairo)] text-lg font-bold text-text-primary">Property Status</h2>
      <p className="mt-1 text-sm text-text-muted">Current listing breakdown</p>
      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:justify-around">
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={78}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {segments.map((item) => (
                  <Cell key={item.label} fill={item.color} />
                ))}
              </Pie>

              <Tooltip
                content={<PropertyStatusTooltip />}
                position={{ x: 10, y: -70 }}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-[var(--font-cairo)] text-2xl font-bold text-text-primary">
              {status.properties.total.toLocaleString()}
            </span>
            <span className="text-xs text-text-muted">Properties</span>
          </div>
        </div>
        <ul className="w-full space-y-3 sm:w-auto">
          {segments.map((item) => <li key={item.label} className="flex items-center gap-3 text-sm"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} /><span className="min-w-24 text-text-secondary">{item.label}</span><span className="font-semibold text-text-primary">{item.value.toLocaleString()}</span><span className="ml-auto text-xs text-text-muted sm:ml-1">{item.percent}%</span></li>)}
        </ul>
      </div>
    </section>
  );
}
