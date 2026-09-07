import { STATUS_LABEL } from "@/lib/format";

const STYLES: Record<string, string> = {
    Reserved: "bg-[#F2F0EA] text-[#7A6A3F] border-[#DCD4BE]",
    SettledPaymentOutstanding: "bg-[#FCEEE4] text-[#B54708] border-[#F3D0B4]",
    SettledAndPaid: "bg-[#E9F5EE] text-[#1E7F4D] border-[#BFE3CE]",
    Denied: "bg-[#F5E9E9] text-[#9B3B3B] border-[#E3C5C5]",
};

export function StatusPill({ status }: { status: string }) {
    const style = STYLES[status] ?? STYLES.Reserved;
    return (
        <span
            className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[13px] font-medium ${style}`}
        >
            {STATUS_LABEL[status] ?? status}
        </span>
    );
}
