"use client";

import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { recordPayment } from "@/lib/api";

const inputClass =
    "border border-[#E2E5EA] px-2 py-1.5 text-[14px] text-[#1B2430] focus:outline-none focus:ring-2 focus:ring-[#2E5EAA]";

export function PaymentForm({ claimId, claimCurrency }: { claimId: string; claimCurrency: string; }) {
    const router = useRouter();
    const [paymentDate, setPaymentDate] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState(claimCurrency);
    const [rate, setRate] = useState("1");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isDifferentCurrency = currency !== claimCurrency;

    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const amountOriginal = Number(amount);
            const exchangeRate = isDifferentCurrency ? Number(rate) : 1;

            await recordPayment(claimId, {
                paymentDate,
                amountOriginal,
                currencyOriginal: currency,
                exchangeRate,
                amountInClaimCurrency: Number((amountOriginal * exchangeRate).toFixed(2))
            });
            router.refresh();
            setPaymentDate("");
            setAmount("");
            setRate("1");
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                "Couldn't record that payment. Check the amount against the outstanding balance.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="mt-3 flex flex-wrap items-end gap-4 border border-[#E2E5EA] bg-white px-5 py-4"
        >
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Payment date
                <input
                    type="date"
                    required
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Amount
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-32 ${inputClass}`}
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Currency paid in
                <input
                    type="text"
                    required
                    maxLength={3}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                    className={`w-20 uppercase ${inputClass}`}
                />
            </label>
            {isDifferentCurrency && (
                <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                    Exchange rate to {claimCurrency}
                    <input
                        type="number"
                        step="0.0001"
                        min="0"
                        required
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className={`w-28 ${inputClass}`}
                    />
                </label>
            )}
            <button
                type="submit"
                disabled={submitting}
                className="bg-[#2E5EAA] px-4 py-1.5 text-[14px] font-medium text-white hover:bg-[#274E8E] disabled:opacity-50"
            >
                {submitting ? "Recording…" : "Record payment"}
            </button>
            {error && <p className="w-full text-[13px] text-[#B54708]">{error}</p>}
        </form>
    );
}
