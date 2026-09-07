export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const STATUS_LABEL: Record<string, string> = {
  Reserved: "Reserved, not yet settled",
  SettledPaymentOutstanding: "Settled, payment outstanding",
  SettledAndPaid: "Settled and paid",
  Denied: "Denied",
}
