"use client";

import { DataTable, type Column } from "@/components/admin/dashboard/shared/DataTable";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ViewInquiryDialog } from "../shared/ViewInquiryDialog";
import { DeleteInquiryDialog } from "../shared/DeleteInquiryDialog";

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("");
}

type Inquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  status: "NEW" | "CONTACTED" | "COMPLETED";
  createdAt: Date;
  property: {
    id: string;
    title: string;
    slug: string;
  };
};

type LatestInquiriesProps = {
  data: {
    inquiries: Inquiry[];
    totalInquiries: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

function formatDate(createdAt: Date) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusLabel(status: Inquiry["status"]) {
  return status === "NEW" ? "New" : status === "CONTACTED" ? "Contacted" : "Completed";
}

function statusClassName(status: Inquiry["status"]) {
  return status === "NEW"
    ? "bg-primary-soft text-primary"
    : status === "CONTACTED"
      ? "bg-accent-soft text-accent"
      : "bg-success-soft text-success";
}

export function LatestInquiries({ data }: LatestInquiriesProps) {
  const { inquiries, totalInquiries, totalPages, currentPage, pageSize } = data;
  const router = useRouter();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const viewInquiry = (inquiry: Inquiry) => setSelectedInquiry(inquiry);
  const deleteInquiry = (inquiry: Inquiry) => setInquiryToDelete(inquiry);

  const columns: Column<Inquiry>[] = [
    {
      key: "customer",
      header: "Customer",
      renderCell: (inquiry) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
            {initials(inquiry.name)}
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-text-primary">{inquiry.name}</span>
            <span className="block text-xs text-text-muted">{inquiry.email || inquiry.phone}</span>
          </span>
        </div>
      ),
    },
    {
      key: "property",
      header: "Property",
      className: "max-w-64 truncate",
      renderCell: (inquiry) => inquiry.property.title,
    },
    {
      key: "date",
      header: "Date",
      className: "whitespace-nowrap",
      renderCell: (inquiry) => formatDate(inquiry.createdAt),
    },
    {
      key: "status",
      header: "Status",
      renderCell: (inquiry) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(inquiry.status)}`}>
          {statusLabel(inquiry.status)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-20 text-right",
      renderCell: (inquiry) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={`View inquiry from ${inquiry.name}`}
            onClick={() => viewInquiry(inquiry)}
            className="group cursor-pointer rounded-lg p-2"
          >
            <Eye size={18} className="text-green-600 transition-colors duration-200" />
          </button>
          <button
            type="button"
            aria-label={`Delete inquiry from ${inquiry.name}`}
            onClick={() => deleteInquiry(inquiry)}
            className="group cursor-pointer rounded-lg p-2"
          >
            <Trash2 size={18} className="text-red-500 transition-colors duration-200" />
          </button>
        </div>
      ),
    },
  ];

  const mobileCards = inquiries.map((inquiry) => (
    <article key={inquiry.id} className="rounded-xl border border-border bg-bg-surface p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
            {initials(inquiry.name)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-text-primary">{inquiry.name}</h3>
            <p className="mt-0.5 truncate text-xs text-text-muted">{inquiry.email || inquiry.phone}</p>
          </div>
        </div>
        <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(inquiry.status)}`}>
          {statusLabel(inquiry.status)}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-3 sm:grid-cols-2">
        <div className="min-w-0">
          <dt className="text-xs font-medium text-text-muted">Property</dt>
          <dd className="mt-1 break-words text-sm font-medium text-text-primary">{inquiry.property.title}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-text-muted">Date</dt>
          <dd className="mt-1 text-sm font-medium text-text-primary">{formatDate(inquiry.createdAt)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex justify-end gap-2 border-t border-border pt-3">
        <button
          type="button"
          aria-label={`View inquiry from ${inquiry.name}`}
          onClick={() => viewInquiry(inquiry)}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-bg-surface px-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Eye size={16} className="text-green-600" />
          View
        </button>
        <button
          type="button"
          aria-label={`Delete inquiry from ${inquiry.name}`}
          onClick={() => deleteInquiry(inquiry)}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-bg-surface px-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Trash2 size={16} className="text-red-500" />
          Delete
        </button>
      </div>
    </article>
  ));

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-bg-surface shadow-sm" aria-labelledby="latest-inquiries-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-6">
        <div>
          <h2 id="latest-inquiries-title" className="font-[var(--font-cairo)] text-lg font-bold text-text-primary">Latest Inquiries</h2>
          <p className="mt-1 text-sm text-text-muted">Recent messages from prospective buyers</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={inquiries}
          keyExtractor={(inquiry) => inquiry.id}
          emptyTitle="No inquiries yet"
          emptyDescription="New customer inquiries will appear here."
          mobileContent={mobileCards}
          pagination={{
            currentPage,
            totalPages,
            totalItems: totalInquiries,
            pageSize,
            onPageChange: (page) => router.push(`/admin?page=${page}`),
          }}
        />
        <ViewInquiryDialog
          selectedInquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
        <DeleteInquiryDialog
          open={inquiryToDelete !== null}
          inquiryName={inquiryToDelete?.name ?? ""}
          onClose={() => setInquiryToDelete(null)}
          onConfirm={() => setInquiryToDelete(null)}
        />
      </div>
    </section>
  );
}
