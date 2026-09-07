import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchClaim } from "@/lib/api";
import { formatDate, formatMoney } from "@/lib/format";
import { StatusPill } from "@/components/StatusPill";
import { BalanceBar } from "@/components/BalanceBar";
import { PaymentForm } from "@/components/PaymentForm";
import { ApproveForm } from "@/components/ApproveForm";

export const dynamic = "force-dynamic";

export default async function ClaimDetailPage({ params }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const claim = await fetchClaim(id).catch(() => null);
    if (!claim) notFound();

    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            <Link href="/" className="text-[14px] text-[#2E5EAA] hover:underline">
                ← Back to claims register
            </Link>

            <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[26px] font-semibold text-[#1B2430]">
                        {claim.claimNumber} — {claim.policy.policyNumber}
                    </h1>
                    <p className="mt-1 text-[14px] text-[#5B6472]">{claim.lossNature}</p>
                </div>
                <StatusPill status={claim.status} />
            </div>

            <section className="mt-8 grid grid-cols-2 gap-px border border-[#E2E5EA] bg-[#E2E5EA] sm:grid-cols-4">
                {[
                    ["Loss date", formatDate(claim.lossDate)],
                    ["Notified", formatDate(claim.dateNotified)],
                    [
                        "Approved",
                        claim.status === "Denied"
                            ? "Denied"
                            : claim.approvedAmount != null
                                ? formatMoney(claim.approvedAmount, claim.currency)
                                : "Not yet set",
                    ],
                    ["Paid", formatMoney(claim.totalPaid, claim.currency)],
                ].map(([label, value]) => (
                    <div key={label} className="bg-white px-5 py-4">
                        <div className="text-[13px] text-[#5B6472]">{label}</div>
                        <div className="mt-1 font-mono text-[15px] text-[#1B2430]">
                            {value}
                        </div>
                    </div>
                ))}
            </section>

            {claim.status === "Reserved" && (
                <section className="mt-10">
                    <h2 className="text-[17px] font-semibold text-[#1B2430]">Approve claim</h2>
                    <ApproveForm claimId={claim.id} />
                </section>
            )}

            {claim.approvedAmount != null && claim.status !== "Denied" && (
                <>
                    <section className="mt-6 border border-[#E2E5EA] bg-white px-5 py-5">
                        <div className="flex items-center justify-between text-[13px] text-[#5B6472]">
                            <span>Paid against approved</span>
                            <span className="font-mono text-[#1B2430]">
                                {formatMoney(claim.outstandingBalance, claim.currency)} outstanding
                            </span>
                        </div>
                        <div className="mt-2">
                            <BalanceBar approved={claim.approvedAmount} paid={claim.totalPaid} />
                        </div>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-[17px] font-semibold text-[#1B2430]">Payments</h2>
                        {claim.payments.length === 0 ? (
                            <p className="mt-2 text-[14px] text-[#5B6472]">No payments recorded yet.</p>
                        ) : (
                            <table className="mt-3 w-full border-collapse border border-[#E2E5EA] bg-white text-[14px]">
                                <thead>
                                    <tr className="border-b border-[#E2E5EA] text-left text-[13px] text-[#5B6472]">
                                        <th className="px-4 py-2 font-medium">Date</th>
                                        <th className="px-4 py-2 text-right font-medium">Amount paid</th>
                                        <th className="px-4 py-2 text-right font-medium">Rate</th>
                                        <th className="px-4 py-2 text-right font-medium">In {claim.currency}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {claim.payments.map((p) => (
                                        <tr key={p.id} className="border-b border-[#EEF0F3] last:border-b-0">
                                            <td className="px-4 py-2 font-mono">
                                                {formatDate(p.paymentDate)}
                                            </td>
                                            <td className="px-4 py-2 text-right font-mono">
                                                {formatMoney(p.amountOriginal, p.currencyOriginal)}
                                            </td>
                                            <td className="px-4 py-2 text-right font-mono text-[#5B6472]">
                                                {p.currencyOriginal === claim.currency ? "—" : p.exchangeRate.toFixed(4)}
                                            </td>
                                            <td className="px-4 py-2 text-right font-mono">
                                                {formatMoney(p.amountInClaimCurrency, claim.currency)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>

                    <section className="mt-10">
                        <h2 className="text-[17px] font-semibold text-[#1B2430]">Record a payment</h2>
                        <PaymentForm claimId={claim.id} claimCurrency={claim.currency} />
                    </section>
                </>
            )}
        </main>
    );
}
