import Link from "next/link";
import type { PropertyFilters } from "@/types/property";
import { buildQueryString } from "@/lib/utils/filters";

export function Pagination({
  page,
  pageSize,
  total,
  filters,
}: {
  page: number;
  pageSize: number;
  total: number;
  filters: PropertyFilters;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const previousQuery = buildQueryString({ ...filters, page: Math.max(1, page - 1), pageSize });
  const nextQuery = buildQueryString({ ...filters, page: Math.min(pageCount, page + 1), pageSize });

  if (pageCount <= 1) return null;

  return (
    <nav className="pagination" aria-label="Property pages">
      {page > 1 ? (
        <Link href={"/properties?" + previousQuery} rel="prev">Previous</Link>
      ) : (
        <span aria-disabled="true">Previous</span>
      )}
      <span aria-current="page">Page {page} of {pageCount}</span>
      {page < pageCount ? (
        <Link href={"/properties?" + nextQuery} rel="next">Next</Link>
      ) : (
        <span aria-disabled="true">Next</span>
      )}
    </nav>
  );
}
