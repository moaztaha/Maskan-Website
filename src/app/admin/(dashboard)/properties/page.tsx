import Link from "next/link";
import { Plus, Search, SlidersHorizontal, Pencil } from "lucide-react";
import { getAdminProperties } from "@/server/queries/properties";
import { Badge } from "@/components/ui/Badge";
import { DashboardStats } from "@/components/admin/dashboard/components/DashboardStats";

const statusVariant = { PUBLISHED: "success", DRAFT: "neutral", SOLD: "warning" } as const;
const statusLabel = { PUBLISHED: "Published", DRAFT: "Draft", SOLD: "Sold" } as const;

export default async function PropertiesPage() {
    const properties = await getAdminProperties();

    return (
        <div className="space-y-6 pb-10">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="text-xs text-text-muted">Dashboard / Properties</p><h1 className="mt-2 font-[var(--font-cairo)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Properties</h1><p className="mt-1 text-sm text-text-secondary">Manage your property listings.</p></div>
                <Link href="/admin/properties/new" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover"><Plus size={18} aria-hidden="true" />Add New Property</Link>
            </div>

            <section className="overflow-hidden rounded-xl border border-border bg-bg-surface shadow-xs">
                <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <label className="relative block w-full sm:max-w-sm"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" /><input aria-label="Search properties" placeholder="Search properties..." className="h-10 w-full rounded-lg border border-border bg-bg-page pl-9 pr-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
                    <div className="flex flex-wrap gap-2"><select aria-label="Filter by status" className="h-10 rounded-lg border border-border bg-bg-page px-3 text-sm text-text-secondary"><option>All Status</option><option>Published</option><option>Draft</option><option>Sold</option></select><select aria-label="Filter by type" className="h-10 rounded-lg border border-border bg-bg-page px-3 text-sm text-text-secondary"><option>All Types</option><option>Apartment</option><option>Villa</option><option>Duplex</option></select><button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm text-text-secondary"><SlidersHorizontal size={16} />Filters</button></div>
                </div>
                <div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead><tr className="border-b border-border bg-bg-subtle/70 text-xs font-semibold uppercase tracking-wider text-text-secondary"><th className="px-5 py-3.5">Property</th><th className="px-5 py-3.5">Location</th><th className="px-5 py-3.5">Type</th><th className="px-5 py-3.5">Price</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5">Listed</th><th className="px-5 py-3.5 text-right">Action</th></tr></thead>
                    <tbody className="divide-y divide-border">
                        {properties.map((property) => <tr key={property.id} className="hover:bg-bg-subtle/40">
                            <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="size-12 shrink-0 overflow-hidden rounded-lg bg-bg-subtle">{property.images[0] && <img src={property.images[0].url} alt="" className="size-full object-cover" />}</div><div className="min-w-0"><p className="max-w-64 truncate font-semibold text-text-primary">{property.title}</p><p className="mt-1 text-xs text-text-muted">{property.purpose === "SALE" ? "For Sale" : "For Rent"}</p></div></div></td>
                            <td className="px-5 py-4 text-text-secondary">{property.area.city.name}, {property.area.name}</td><td className="px-5 py-4 text-text-secondary">{property.type.replaceAll("_", " ").toLowerCase()}</td><td className="whitespace-nowrap px-5 py-4 font-semibold text-text-primary">EGP {Number(property.price).toLocaleString("en-US")}</td><td className="px-5 py-4"><Badge variant={statusVariant[property.status]} size="sm" dot>{statusLabel[property.status]}</Badge></td><td className="whitespace-nowrap px-5 py-4 text-text-secondary">{property.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td><td className="px-5 py-4 text-right"><Link href={`/admin/properties/new?edit=${property.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-secondary hover:border-primary/30 hover:bg-primary-soft hover:text-primary"><Pencil size={14} aria-hidden="true" />Update</Link></td>
                        </tr>)}
                        {properties.length === 0 && <tr><td colSpan={7} className="px-5 py-14 text-center text-sm text-text-muted">No properties found.</td></tr>}
                    </tbody>
                </table></div>
            </section>
        </div>
    );
}

