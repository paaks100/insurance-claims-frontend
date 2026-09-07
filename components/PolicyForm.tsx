"use client";

import { getErrorMessage, registerPolicy } from "@/lib/api";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

const inputClass = "border border-[#E2E5EA] px-3 py-2 text-[14px] text-[#1B2430] focus:outline-none focus:ring-2 focus:ring-[#2E5EAA]";

export function PolicyForm() {
    const router = useRouter();
    const [policyNumber, setPolicyNumber] = useState("");
    const [insuredName, setInsuredName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await registerPolicy({ policyNumber, insuredName, startDate, endDate });
            router.push("/claims/new");
        } catch (err) {
            setError(getErrorMessage(err, "Couldn't register that policy. The number may already be in use."));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="mt-6 grid max-w-md gap-5 border border-[#E2E5EA] bg-white p-6">
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Policy number
                <input
                    required
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. POL-10042"
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Insured name
                <input
                    required
                    value={insuredName}
                    onChange={(e) => setInsuredName(e.target.value)}
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Start date
                <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                End date
                <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                />
            </label>
            <button
                type="submit"
                disabled={submitting}
                className="mt-2 justify-self-start bg-[#2E5EAA] px-5 py-2 text-[14px] font-medium text-white hover:bg-[#274E8E] disabled:opacity-50"
            >
                {submitting ? "Registering…" : "Register policy"}
            </button>
            {error && <p className="text-[13px] text-[#B54708]">{error}</p>}
        </form>
    );
}
