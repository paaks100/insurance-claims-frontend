export type ClaimStatus = "Reserved" | "SettledPaymentOutstanding" | "SettledAndPaid" | "Denied";

export interface Policy {
    id: string;
    policyNumber: string;
    insuredName: string;
    startDate: string;
    endDate: string;
}

export interface Payment {
    id: string;
    paymentDate: string;
    amountOriginal: number;
    currencyOriginal: string;
    exchangeRate: number;
    amountInClaimCurrency: number;
}

export interface Claim {
    id: string;
    claimNumber: string;
    policy: Policy;
    lossDate: string;
    dateNotified: string;
    lossNature: string;
    currency: string;
    estimatedLossAmount: number;
    approvedAmount: number | null;
    totalPaid: number;
    outstandingBalance: number;
    status: ClaimStatus;
    payments: Payment[];
}

export interface CurrencyTotal {
    currency: string;
    totalEstimatedLoss: number;
    totalApproved: number;
    totalPaid: number;
    totalOutstanding: number;
}

export interface ClaimListResponse {
    claims: Claim[];
    totals: CurrencyTotal[];
}

export interface ClaimFilters {
    startDate?: string;
    endDate?: string;
    status?: ClaimStatus | string;
    currency?: string;
}

export interface RegisterClaimRequest {
    policyId: string;
    lossDate: string;
    dateNotified: string;
    lossNature: string;
    currency: string;
    estimatedLossAmount: number;
}

export interface RegisterPolicyRequest {
    policyNumber: string;
    insuredName: string;
    startDate: string;
    endDate: string;
}

export interface AddPaymentRequest {
    paymentDate: string;
    amountOriginal: number;
    currencyOriginal: string;
    exchangeRate: number;
    amountInClaimCurrency: number;
}
