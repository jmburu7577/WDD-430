"use client";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Invoices", href: "/dashboard/invoices" },
    { name: "Customers", href: "/dashboard/customers" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-white p-4 flex flex-col items-center gap-4 border-r">
                <div className="w-full flex flex-col items-center mb-6">
                    <div className="bg-blue-600 rounded-lg w-full flex flex-col items-center py-8 mb-4">
                        <Image src="/globe.svg" alt="Acme Logo" width={48} height={48} />
                        <span className="text-white text-3xl font-bold mt-2">Acme</span>
                    </div>
                    <nav className="w-full flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-100 text-black font-medium ${pathname === item.href ? "bg-blue-100" : "bg-white"}`}
                            >
                                {item.name === "Home" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2z" /></svg>
                                )}
                                {item.name === "Invoices" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                )}
                                {item.name === "Customers" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                )}
                                <span className={item.name === "Home" ? "text-blue-600" : "text-black"}>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>
            <main className="flex-1">{children}</main>
        </div>
    );
}
