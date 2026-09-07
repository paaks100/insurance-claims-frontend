import Link from "next/link";
import { ClaimForm } from "@/components/ClaimForm";

export default function NewClaimPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <Link href="/" className="text-[14px] text-[#2E5EAA] hover:underline">
                ← Back to claims register
            </Link>
            <h1 className="mt-4 text-[26px] font-semibold text-[#1B2430]">Register a claim</h1>
            <p className="mt-1 text-[14px] text-[#5B6472]">
                The policy number must already exist.{" "}
                <Link href="/policies/new" className="text-[#2E5EAA] hover:underline">
                    Register a policy first
                </Link>{" "}
                if it doesn't yet.
            </p>
            <ClaimForm />
        </main>
    );
}
