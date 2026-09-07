import { ClaimsTable } from "@/components/ClaimsTable";
import { FilterBar } from "@/components/FilterBar";
import { TotalsFooter } from "@/components/TotalsFooter";
import { fetchClaims } from "@/lib/api";
import { ClaimFilters } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClaimsListPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }>; }) {
  const params = await searchParams;
  const filters: ClaimFilters = {
    startDate: params.startDate,
    endDate: params.endDate,
    status: params.status,
    currency: params.currency,
  };

  const { claims, totals } = await fetchClaims(filters);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-[26px] font-semibold text-[#1B2430]">Claims register</h1>
          <p className="mt-1 text-[14px] text-[#5B6472]">
            {claims.length} claim{claims.length === 1 ? "" : "s"} matching the current filters
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/policies/new"
            className="border border-[#E2E5EA] px-4 py-2 text-[14px] font-medium text-[#5B6472] hover:bg-[#F7F8FA]"
          >
            Register policy
          </Link>
          <Link
            href="/claims/new"
            className="bg-[#2E5EAA] px-4 py-2 text-[14px] font-medium text-white hover:bg-[#274E8E]"
          >
            Register claim
          </Link>
        </div>
      </div>

      <FilterBar />
      <ClaimsTable claims={claims} />
      <TotalsFooter totals={totals} />
    </main>
  );
}
