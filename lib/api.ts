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
