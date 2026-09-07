import Link from "next/link";
import { fetchPolicies } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PoliciesPage() {
    const policies = await fetchPolicies();

    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <Link href="/" className="text-[14px] text-[#2E5EAA] hover:underline">
                ← Back to claims register
            </Link>
            <div className="mt-4 flex items-end justify-between">
                <h1 className="text-[26px] font-semibold text-[#1B2430]">Policies</h1>
                <Link
                    href="/policies/new"
                    className="bg-[#2E5EAA] px-4 py-2 text-[14px] font-medium text-white hover:bg-[#274E8E]"
                >
                    Register policy
                </Link>
            </div>
            <table className="mt-6 w-full border-collapse border border-[#E2E5EA] bg-white text-[14px]">
                <thead>
                    <tr className="border-b border-[#E2E5EA] text-left text-[13px] text-[#5B6472]">
                        <th className="px-4 py-2 font-medium">Policy number</th>
                        <th className="px-4 py-2 font-medium">Insured</th>
                        <th className="px-4 py-2 font-medium">Start Date</th>
                        <th className="px-4 py-2 font-medium">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((p) => (
                        <tr key={p.id} className="border-b border-[#EEF0F3] last:border-b-0">
                            <td className="px-4 py-2 font-mono text-[#1B2430]">
                                {p.policyNumber}
                            </td>
                            <td className="px-4 py-2 text-[#1B2430]">{p.insuredName}</td>
                            <td className="px-4 py-2 text-[#1B2430]">{formatDate(p.startDate)}</td>
                            <td className="px-4 py-2 text-[#1B2430]">{formatDate(p.endDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
