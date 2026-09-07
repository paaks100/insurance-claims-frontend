import axios from "axios";
import { AddPaymentRequest, Claim, ClaimFilters, ClaimListResponse, Policy, RegisterClaimRequest, RegisterPolicyRequest } from "./types";

const API_BASE_URL = "https://insuranceclaims.onrender.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

export async function fetchClaims(filters: ClaimFilters): Promise<ClaimListResponse> {
    const { data } = await api.get<ClaimListResponse>("/api/claims/list", {
        params: filters
    });
    return data;
}

export async function fetchClaim(id: string): Promise<Claim> {
    const { data } = await api.get<Claim>(`/api/claims/${id}/retrieve`);
    return data;
}

export async function registerClaim(payload: RegisterClaimRequest): Promise<Claim> {
    const { data } = await api.post<Claim>("/api/claims/register", payload);
    return data;
}

export async function recordPayment(claimId: string, payload: AddPaymentRequest): Promise<Claim> {
    const { data } = await api.post<Claim>(`/api/claims/${claimId}/payments/add`, payload);
    return data;
}

export async function registerPolicy(payload: RegisterPolicyRequest): Promise<Policy> {
    const { data } = await api.post<Policy>("/api/policies/register", payload);
    return data;
}

export async function fetchPolicies(): Promise<Policy[]> {
    const { data } = await api.get<Policy[]>("/api/policies/list");
    return data;
}

export async function approveClaim(claimId: string, approvedAmount: number): Promise<Claim> {
    const { data } = await api.patch<Claim>(`/api/claims/${claimId}/approve`, { approvedAmount });
    return data;
}

export function getErrorMessage(err: unknown, fallback: string): string {
    const data = (err as { response?: { data?: unknown } })?.response?.data;
    if (!data || typeof data !== "object") return fallback;

    const d = data as { message?: string; errors?: unknown; title?: string };

    if (typeof d.message === "string" && d.message.trim()) {
        return d.message;
    }

    if (d.errors && typeof d.errors === "object") {
        if (Array.isArray(d.errors)) {
            if (typeof d.errors[0] === "string") return d.errors[0];
        } else {
            const firstField = Object.values(d.errors as Record<string, unknown>)[0];
            if (Array.isArray(firstField) && typeof firstField[0] === "string") {
                return firstField[0];
            }
        }
    }

    if (typeof d.title === "string" && d.title.trim()) {
        return d.title;
    }

    return fallback;
}
