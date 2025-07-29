"use client";
import { useEffect, useState } from "react";

type Customer = {
    id: string;
    name: string;
    email: string;
    paid: number;
    invoices: number;
};

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetch("/api/customers")
            .then((res) => res.json())
            .then(setCustomers);
    }, []);

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">Customers</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search customers"
                    className="border rounded-lg px-4 py-2 w-full max-w-md"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Paid</th>
                            <th className="px-4 py-2 text-left">Invoices</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
                        ) : (
                            customers.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-4 py-2">{c.name}</td>
                                    <td className="px-4 py-2">{c.email}</td>
                                    <td className="px-4 py-2">${c.paid}</td>
                                    <td className="px-4 py-2">{c.invoices}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
