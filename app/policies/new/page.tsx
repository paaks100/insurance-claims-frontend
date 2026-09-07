import Link from "next/link";
import { PolicyForm } from "@/components/PolicyForm";

export default function NewPolicyPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <Link href="/" className="text-[14px] text-[#2E5EAA] hover:underline">
                ← Back to claims register
            </Link>
            <h1 className="mt-4 text-[26px] font-semibold text-[#1B2430]">Register a policy</h1>
            <p className="mt-1 text-[14px] text-[#5B6472]">
                A claim can only be registered against a policy number that already exists.
            </p>
            <PolicyForm />
        </main>
    );
}
