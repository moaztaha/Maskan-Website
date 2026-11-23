"use client";

import { type ReactNode, useTransition } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  renderCell: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange?: (page: number) => void;
  };
  mobileContent?: ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription = "There are currently no items matching your criteria.",
  pagination,
  mobileContent,
}: DataTableProps<T>) {
  const [isPending, startTransition] = useTransition();
  const showSkeleton = isLoading || isPending;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-bg-surface shadow-xs" aria-busy={showSkeleton}>
      <div className={cn("overflow-x-auto", mobileContent !== undefined && "hidden lg:block")}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg-subtle/70 text-text-secondary text-xs uppercase tracking-wider font-semibold">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn("py-3.5 px-4 sm:px-6 font-semibold", column.className)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm text-text-primary">
            {showSkeleton ? (
              Array.from({ length: 5 }, (_, rowIndex) => (
                <tr key={`loading-row-${rowIndex}`} aria-hidden="true">
                  {columns.map((column, columnIndex) => (
                    <td key={column.key} className={cn("px-4 py-4 sm:px-6", column.className)}>
                      <Skeleton className={cn("h-4", columnIndex === 0 ? "w-36 max-w-full" : "w-24 max-w-full")} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-subtle text-text-muted">
                      <Inbox size={26} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{emptyTitle}</p>
                    <p className="text-xs text-text-muted max-w-sm">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="hover:bg-bg-subtle/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("py-4 px-4 sm:px-6 align-middle", column.className)}
                    >
                      {column.renderCell(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mobileContent !== undefined && (
        <div className="space-y-3 p-4 lg:hidden">
          {data.length > 0 ? mobileContent : (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-subtle text-text-muted">
                <Inbox size={26} />
              </div>
              <p className="text-sm font-semibold text-text-primary">{emptyTitle}</p>
              <p className="max-w-sm text-xs text-text-muted">{emptyDescription}</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border bg-bg-subtle/40 px-4 sm:px-6 py-3 text-xs text-text-muted">
          <span>
            Showing{" "}
            <strong className="text-text-primary font-medium">
              {data.length > 0 ? (pagination.currentPage - 1) * pagination.pageSize + 1 : 0}
            </strong>{" "}
            to{" "}
            <strong className="text-text-primary font-medium">
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
            </strong>{" "}
            of{" "}
            <strong className="text-text-primary font-medium">
              {pagination.totalItems}
            </strong>{" "}
            results
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => startTransition(() => pagination.onPageChange?.(pagination.currentPage - 1))}
              disabled={pagination.currentPage <= 1 || isPending}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-bg-surface text-text-primary hover:bg-bg-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, index) => {
              const pageNumber = index + 1;
              const isCurrent = pageNumber === pagination.currentPage;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => startTransition(() => pagination.onPageChange?.(pageNumber))}
                  disabled={isPending}
                  className={cn(
                    "h-8 w-8 rounded-lg text-xs font-semibold transition-colors",
                    isCurrent
                      ? "bg-primary !text-white  shadow-xs"
                      : "border border-border bg-bg-surface text-text-primary hover:bg-bg-subtle"
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => startTransition(() => pagination.onPageChange?.(pagination.currentPage + 1))}
              disabled={pagination.currentPage >= pagination.totalPages || isPending}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-bg-surface text-text-primary hover:bg-bg-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
