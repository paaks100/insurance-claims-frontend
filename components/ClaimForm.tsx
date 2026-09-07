"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPolicies, registerClaim } from "@/lib/api";
import { Policy } from "@/lib/types";

const CURRENCIES = ["USD", "GBP", "EUR", "GHS", "CAD"];

const LOSS_NATURES = [
    "Fire",
    "Theft", 
    "Flood",
    "Collision",
    "Accident",
    "PropertyDamage",
    "Other"
];

const inputClass =
    "border border-[#E2E5EA] px-3 py-2 text-[14px] text-[#1B2430] focus:outline-none focus:ring-2 focus:ring-[#2E5EAA]";

export function ClaimForm() {
    const router = useRouter();
    const [policies, setPolicies] = useState<Policy[]>([])
    const [selectedPolicyId, setSelectedPolicyId] = useState("")
    const [form, setForm] = useState({
        lossDate: "",
        dateNotified: "",
        lossNature: "Fire",
        currency: "USD",
        estimatedLossAmount: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPolicies().then(setPolicies).catch(() => { });
    }, []);

    function update<K extends keyof typeof form>(key: K, value: string) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const claim = await registerClaim({
                ...form,
                policyId: selectedPolicyId,
                estimatedLossAmount: Number(form.estimatedLossAmount),
            });
            router.push(`/claims/${claim.id}`);
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                "Couldn't register that claim. Check the policy number exists.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="mt-6 grid max-w-xl gap-5 border border-[#E2E5EA] bg-white p-6">
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Policy
                <select
                    required
                    value={selectedPolicyId}
                    onChange={(e) => setSelectedPolicyId(e.target.value)}
                    className={inputClass}
                >
                    <option value="">Select a policy</option>
                    {policies.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.policyNumber} – {p.insuredName}
                        </option>
                    ))}
                </select>
            </label>
            <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                    Loss date
                    <input
                        type="date"
                        required
                        value={form.lossDate}
                        onChange={(e) => update("lossDate", e.target.value)}
                        className={inputClass}
                    />
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                    Date notified
                    <input
                        type="date"
                        required
                        value={form.dateNotified}
                        onChange={(e) => update("dateNotified", e.target.value)}
                        className={inputClass}
                    />
                </label>
            </div>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Nature of loss
                <select
                    required
                    value={form.lossNature}
                    onChange={(e) => update("lossNature", e.target.value)}
                    className={inputClass}
                >
                    {LOSS_NATURES.map((nature)=>(
                        <option key={nature} value={nature}>{nature}</option>
                    ))}
                </select>
            </label>
            <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                    Currency
                    <select
                        value={form.currency}
                        onChange={(e) => update("currency", e.target.value)}
                        className={inputClass}
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                    Estimated loss amount
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={form.estimatedLossAmount}
                        onChange={(e) => update("estimatedLossAmount", e.target.value)}
                        className={inputClass}
                    />
                </label>
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="mt-2 justify-self-start bg-[#2E5EAA] px-5 py-2 text-[14px] font-medium text-white hover:bg-[#274E8E] disabled:opacity-50"
            >
                {submitting ? "Registering…" : "Register claim"}
            </button>
            {error && <p className="text-[13px] text-[#B54708]">{error}</p>}
        </form>
    );
}
