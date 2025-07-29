"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Acme</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mt-2"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}
