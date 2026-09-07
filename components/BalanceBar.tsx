export function BalanceBar({ approved, paid }: { approved: number | null; paid: number; }) {
    if (approved == null || approved <= 0) {
        return <div className="h-1.5 w-full rounded-full bg-[#E2E5EA]" aria-hidden />;
    }

    const pct = Math.min(100, Math.round((paid / approved) * 100));

    return (
        <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E5EA]"
            role="img"
            aria-label={`${pct}% of the approved amount has been paid`}
        >
            <div
                className="h-full rounded-full bg-[#1E7F4D] transition-[width]"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}
