import { formatMoney } from "@/lib/format";
import { CurrencyTotal } from "@/lib/types";

export function TotalsFooter({ totals }: { totals: CurrencyTotal[] }) {
    if (totals.length === 0) return null;

    return (
        <div className="border border-t-0 border-[#E2E5EA] bg-[#F0F3F8]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px bg-[#E2E5EA]">
                {totals.map((t) => (
                    <div key={t.currency} className="bg-[#F0F3F8] px-5 py-4">
                        <div className="mb-2 text-[13px] font-medium text-[#5B6472]">{t.currency} totals</div>
                        <dl className="space-y-1 font-mono text-[14px] text-[#1B2430]">
                            <div className="flex justify-between">
                                <dt className="text-[#5B6472]">Estimated</dt>
                                <dd>{formatMoney(t.totalEstimatedLoss, t.currency)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#5B6472]">Approved</dt>
                                <dd>{formatMoney(t.totalApproved, t.currency)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[#5B6472]">Paid</dt>
                                <dd>{formatMoney(t.totalPaid, t.currency)}</dd>
                            </div>
                            <div className="flex justify-between border-t border-[#D7DCE3] pt-1 font-medium">
                                <dt>Outstanding</dt>
                                <dd>{formatMoney(t.totalOutstanding, t.currency)}</dd>
                            </div>
                        </dl>
                    </div>
                ))}
            </div>
        </div>
    );
}
