"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const STATUS_OPTIONS = [
    { value: "", label: "All statuses" },
    { value: "Reserved", label: "Reserved, not yet settled" },
    { value: "SettledPaymentOutstanding", label: "Settled, payment outstanding" },
    { value: "SettledAndPaid", label: "Settled and paid" },
    { value: "Denied", label: "Denied" },
];

const CURRENCY_OPTIONS = ["", "USD", "GBP", "EUR", "GHS", "CAD"];

const inputClass =
    "border border-[#E2E5EA] px-2 py-1.5 text-[14px] text-[#1B2430] focus:outline-none focus:ring-2 focus:ring-[#2E5EAA]";

export function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [startDate, setStartDate] = useState(searchParams.get("startDate") ?? "");
    const [endDate, setEndDate] = useState(searchParams.get("endDate") ?? "");
    const [status, setStatus] = useState(searchParams.get("status") ?? "");
    const [currency, setCurrency] = useState(searchParams.get("currency") ?? "");

    function apply() {
        const params = new URLSearchParams();
        if (startDate) params.set("startDate", startDate);
        if (endDate) params.set("endDate", endDate);
        if (status) params.set("status", status);
        if (currency) params.set("currency", currency);
        router.push(`/?${params.toString()}`);
    }

    function clear() {
        setStartDate("");
        setEndDate("");
        setStatus("");
        setCurrency("");
        router.push("/");
    }

    return (
        <div className="flex flex-wrap items-end gap-4 border border-[#E2E5EA] bg-white px-5 py-4">
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                From
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                To
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Status
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                    {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-[#5B6472]">
                Currency
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
                    {CURRENCY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                            {c || "All currencies"}
                        </option>
                    ))}
                </select>
            </label>
            <div className="flex gap-2">
                <button
                    onClick={apply}
                    className="bg-[#2E5EAA] px-4 py-1.5 text-[14px] font-medium text-white hover:bg-[#274E8E]"
                >
                    Apply filters
                </button>
                <button
                    onClick={clear}
                    className="border border-[#E2E5EA] px-4 py-1.5 text-[14px] font-medium text-[#5B6472] hover:bg-[#F7F8FA]"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
