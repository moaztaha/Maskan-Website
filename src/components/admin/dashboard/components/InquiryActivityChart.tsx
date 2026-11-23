
"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type InquiryActivity = {
  date: string;
  count: number;
};

type InquiryActivityChartProps = {
  data: InquiryActivity[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(new Date(`${date}T12:00:00`));
}

export function InquiryActivityChart({
  data,
}: InquiryActivityChartProps) {
  const [range, setRange] = useState<"30 Days" | "7 Days">("30 Days");


  const visibleData =
    range === "7 Days" ? data.slice(-7) : data;


  const totalInquiries = visibleData.reduce(
    (total, item) => total + item.count,
    0,
  );


  const lastIndex = visibleData.length - 1;

  const dateLabels = [
    visibleData[0],
    visibleData[Math.floor(lastIndex / 4)],
    visibleData[Math.floor(lastIndex / 2)],
    visibleData[Math.floor((lastIndex * 3) / 4)],
    visibleData[lastIndex],
  ].filter(Boolean);

  return (
    <section
      aria-labelledby="inquiry-activity-title"
      className="rounded-2xl border border-border bg-bg-surface p-5"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            id="inquiry-activity-title"
            className="font-[var(--font-cairo)] text-lg font-bold text-text-primary"
          >
            Inquiries Activity
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            Inquiry volume over time
          </p>
        </div>

        {/* Date Range Selector */}
        <div
          className="flex rounded-lg bg-bg-subtle p-1"
          aria-label="Chart time range"
        >
          {(["30 Days", "7 Days"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              aria-pressed={range === item}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${range === item
                ? "bg-bg-surface text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-primary"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart and Summary */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_150px] lg:items-center">
        {/* Recharts Area Chart */}
        <div className="min-w-0">
          <div className="h-48 w-full sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={visibleData}
                margin={{
                  top: 12,
                  right: 8,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="inquiry-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.18}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid Lines */}
                <CartesianGrid
                  vertical={false}
                  stroke="#DCE3EE"
                  strokeDasharray="3 3"
                />

                {/* X Axis: Dates */}
                <XAxis
                  dataKey="date"
                  ticks={dateLabels.map((item) => item.date)}
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickMargin={12}
                />

                {/* Y Axis: Inquiry Count */}
                <YAxis
                  hide
                  domain={[0, "auto"]}
                  allowDecimals={false}
                />

                {/* Hover Information */}
                <Tooltip
                  labelFormatter={(label) =>
                    formatDate(String(label))
                  }
                  formatter={(value) => [
                    value ?? 0,
                    "Inquiries",
                  ]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #DCE3EE",
                    fontSize: "12px",
                  }}
                />

                {/* Area and Line */}
                <Area
                  type="linear"
                  dataKey="count"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#inquiry-fill)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "var(--primary)",
                    strokeWidth: 0,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="rounded-xl bg-primary-soft p-4 lg:text-center">
          <p className="text-xs font-medium text-text-secondary">
            Total Inquiries
          </p>

          <p className="mt-2 font-[var(--font-cairo)] text-2xl font-bold text-primary">
            {totalInquiries.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-text-muted">
            in the last {range === "7 Days" ? "7" : "30"} days
          </p>
        </div>
      </div>
    </section>
  );
}
