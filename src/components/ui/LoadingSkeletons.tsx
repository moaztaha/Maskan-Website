import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

function PropertyCardSkeleton() {
  return (
    <article className="property-card" aria-hidden="true">
      <div className="property-image-link"><Skeleton className="absolute inset-0 h-full w-full rounded-none" /></div>
      <div className="property-card-content space-y-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <div className="flex gap-4 pt-1"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-16" /></div>
      </div>
    </article>
  );
}

export function PropertyListingSkeleton() {
  return (
    <Container className="listing-page" aria-busy="true" aria-label="Loading property listings">
      <Skeleton className="mb-7 h-4 w-48" />
      <header className="listing-heading"><Skeleton className="h-9 w-80 max-w-full" /><Skeleton className="mt-3 h-4 w-[min(32rem,90%)]" /></header>
      <div className="listing-layout">
        <aside className="listing-sidebar hidden md:block"><Skeleton className="mb-6 h-6 w-36" />{Array.from({ length: 7 }, (_, i) => <Skeleton key={i} className="mb-5 h-10 w-full" />)}</aside>
        <section className="listing-results"><div className="listing-toolbar"><Skeleton className="h-5 w-40" /><Skeleton className="h-10 w-44" /></div><div className="listing-grid">{Array.from({ length: 6 }, (_, i) => <PropertyCardSkeleton key={i} />)}</div></section>
      </div>
    </Container>
  );
}

export function PropertyDetailsSkeleton() {
  return (
    <Container className="property-details-container" aria-busy="true" aria-label="Loading property details">
      <Skeleton className="mb-5 h-4 w-64 max-w-full" />
      <div className="mb-7 grid h-[clamp(240px,42vw,520px)] grid-cols-1 gap-2 overflow-hidden rounded-xl md:grid-cols-[2fr_1fr]">
        <Skeleton className="h-full rounded-none" /><div className="hidden grid-rows-2 gap-2 md:grid"><Skeleton className="h-full rounded-none" /><Skeleton className="h-full rounded-none" /></div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6"><Skeleton className="h-9 w-3/4" /><Skeleton className="h-5 w-2/5" /><div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-bg-surface p-5 sm:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-12" />)}</div><Skeleton className="h-48 w-full" /><Skeleton className="h-56 w-full" /></div>
        <Skeleton className="h-[420px] w-full" />
      </div>
    </Container>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="home-page" aria-busy="true" aria-label="Loading homepage">
      <section className="hero-section"><Skeleton className="absolute inset-0 h-full w-full rounded-none" /><div className="hero-scrim" /><Container className="hero-content"><Skeleton className="mx-auto h-10 w-3/4 max-w-2xl" /><Skeleton className="mx-auto mt-4 h-5 w-2/3 max-w-xl" /><Skeleton className="mt-8 h-48 w-full rounded-xl" /></Container></section>
      {["Featured Properties", "Browse by City", "Browse by Property Type", "Latest Properties"].map((heading, index) => <Container key={heading} className="content-section"><div className="mb-6 flex items-center justify-between"><Skeleton className="h-8 w-56 max-w-[70%]" /><Skeleton className="h-5 w-24" /></div>{index === 1 || index === 2 ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{Array.from({ length: index === 1 ? 6 : 4 }, (_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}</div> : <div className="property-grid">{Array.from({ length: 3 }, (_, i) => <PropertyCardSkeleton key={i} />)}</div>}</Container>)}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-7 sm:space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><Skeleton className="h-9 w-64 max-w-full" /><Skeleton className="mt-3 h-5 w-80 max-w-full" /></div><Skeleton className="h-11 w-48" /></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)}</div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,1fr)]"><Skeleton className="h-80 w-full rounded-xl" /><Skeleton className="h-80 w-full rounded-xl" /></div>
      <Skeleton className="h-[26rem] w-full rounded-xl" />
    </div>
  );
}

export function AdminDashboardShellSkeleton() {
  return (
    <div className="min-h-screen bg-bg-page" aria-busy="true" aria-label="Loading admin area">
      <div className="w-full">
        <header className="flex h-16 items-center justify-between border-b border-border bg-bg-surface px-4 sm:px-6"><Skeleton className="h-6 w-32" /><div className="flex gap-3"><Skeleton className="h-9 w-9 rounded-full" /><Skeleton className="h-9 w-9 rounded-full" /></div></header>
        <main><Container className="admin-dashboard-container py-6 sm:py-8"><DashboardSkeleton /></Container></main>
      </div>
    </div>
  );
}
