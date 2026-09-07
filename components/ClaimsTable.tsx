import Link from "next/link";
import type { Claim } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/format";
import { StatusPill } from "./StatusPill";
import { BalanceBar } from "./BalanceBar";

export function ClaimsTable({ claims }: { claims: Claim[] }) {
    if (claims.length === 0) {
        return (
            <div className="border border-t-0 border-[#E2E5EA] bg-white px-5 py-12 text-center text-[14px] text-[#5B6472]">
                No claims match these filters. Try widening the date range or clearing a filter.
            </div>
        );
    }

    return (
        <table className="w-full border-collapse border border-t-0 border-[#E2E5EA] bg-white text-[14px]">
            <thead>
                <tr className="border-b border-[#E2E5EA] text-left text-[13px] text-[#5B6472]">
                    <th className="px-5 py-3 font-medium">Claim Number</th>
                    <th className="px-5 py-3 font-medium">Policy Number</th>
                    <th className="px-5 py-3 font-medium">Loss date</th>
                    <th className="px-5 py-3 font-medium">Date Notified</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 text-right font-medium">Approved</th>
                    <th className="px-5 py-3 text-right font-medium">Paid</th>
                    <th className="px-5 py-3 text-right font-medium">Outstanding</th>
                    <th className="w-32 px-5 py-3 font-medium">Progress</th>
                </tr>
            </thead>
            <tbody>
                {claims.map((c) => (
                    <tr key={c.id} className="border-b border-[#EEF0F3] last:border-b-0 hover:bg-[#F7F8FA]">
                        <td className="px-5 py-3">
                            <Link href={`/claims/${c.id}`} className="text-[#2E5EAA] hover:underline">
                                {c.claimNumber}
                            </Link>
                        </td>
                        <td className="px-5 py-3 text-[#1B2430]">{c.policy.policyNumber}</td>
                        <td className="px-5 py-3 font-mono text-[#1B2430]">
                            {formatDate(c.lossDate)}
                        </td>
                        <td className="px-5 py-3 font-mono text-[#1B2430]">
                            {formatDate(c.dateNotified)}
                        </td>
                        <td className="px-5 py-3">
                            <StatusPill status={c.status} />
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-[#1B2430]">
                            {c.approvedAmount != null ? formatMoney(c.approvedAmount, c.currency) : "—"}
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-[#1B2430]">
                            {formatMoney(c.totalPaid, c.currency)}
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-[#1B2430]">
                            {formatMoney(c.outstandingBalance, c.currency)}
                        </td>
                        <td className="px-5 py-3">
                            <BalanceBar approved={c.approvedAmount} paid={c.totalPaid} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
