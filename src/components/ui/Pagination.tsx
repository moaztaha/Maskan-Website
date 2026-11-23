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
        <Link className="pagination-control" href={`/properties?${previousQuery}`} rel="prev">
          Previous
        </Link>
      ) : (
        <span className="pagination-control pagination-disabled" aria-disabled="true">
          Previous
        </span>
      )}
      <div className="pagination-pages" aria-label="Page numbers">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => {
          const query = buildQueryString({ ...filters, page: pageNumber, pageSize });
          return pageNumber === page ? (
            <span key={pageNumber} className="pagination-page pagination-current" aria-current="page" aria-label={`Page ${pageNumber}`}>
              {pageNumber}
            </span>
          ) : (
            <Link key={pageNumber} className="pagination-page" href={`/properties?${query}`} aria-label={`Go to page ${pageNumber}`}>
              {pageNumber}
            </Link>
          );
        })}
      </div>
      {page < pageCount ? (
        <Link className="pagination-control" href={`/properties?${nextQuery}`} rel="next">
          Next
        </Link>
      ) : (
        <span className="pagination-control pagination-disabled" aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
