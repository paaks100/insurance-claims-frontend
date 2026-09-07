"use client";

import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { approveClaim } from "@/lib/api";

const inputClass =
    "border border-[#E2E5EA] px-2 py-1.5 text-[14px] text-[#1B2430] focus:outline-none focus:ring-2 focus:ring-[#2E5EAA]";

export function ApproveForm({ claimId }: { claimId: string }) {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await approveClaim(claimId, Number(amount));
            router.refresh();
            setAmount("");
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                "Couldn't approve the claim. Please try again.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="mt-3 flex items-end gap-4 border border-[#E2E5EA] bg-white px-5 py-4">
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Approved amount
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={inputClass}
                    placeholder="Enter approved amount"
                />
            </label>
            <button
                type="submit"
                disabled={submitting}
                className="bg-[#2E5EAA] px-4 py-1.5 text-[14px] font-medium text-white hover:bg-[#274E8E] disabled:opacity-50"
            >
                {submitting ? "Approving…" : "Approve claim"}
            </button>
            {error && <p className="text-[13px] text-[#B54708]">{error}</p>}
        </form>
    );
}
