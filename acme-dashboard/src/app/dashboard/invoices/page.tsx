"use client";
import { useEffect, useState } from "react";

type InvoiceForm = {
    customer: string;
    email: string;
    amount: number;
    date: string;
    status: string;
};

type Invoice = {
    id: string;
    customer: string;
    email: string;
    amount: number;
    date: string;
    status: string;
};

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<InvoiceForm>({ customer: "", email: "", amount: 0, date: "", status: "Pending" });
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/invoices")
            .then((res) => res.json())
            .then(setInvoices);
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/invoices/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setShowForm(false);
        setForm({ customer: "", email: "", amount: 0, date: "", status: "Pending" });
        fetch("/api/invoices").then((res) => res.json()).then(setInvoices);
    };

    const handleEdit = (inv: Invoice) => {
        setEditId(inv.id);
        setForm({ customer: inv.customer, email: inv.email, amount: inv.amount, date: inv.date, status: inv.status });
        setShowForm(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/invoices/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editId, ...form }),
        });
        setShowForm(false);
        setEditId(null);
        setForm({ customer: "", email: "", amount: 0, date: "", status: "Pending" });
        fetch("/api/invoices").then((res) => res.json()).then(setInvoices);
    };

    const handleDelete = async (id: string) => {
        await fetch("/api/invoices/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        fetch("/api/invoices").then((res) => res.json()).then(setInvoices);
    };

    return (
        <main className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Invoices</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2" onClick={() => { setShowForm(true); setEditId(null); }}>
                    Create Invoice
                    <span className="text-xl">+</span>
                </button>
            </div>
            {showForm && (
                <form className="mb-6 bg-gray-50 p-4 rounded-lg flex flex-col gap-2 max-w-lg" onSubmit={editId ? handleUpdate : handleCreate}>
                    <input name="customer" value={form.customer} onChange={handleFormChange} placeholder="Customer" className="border rounded px-2 py-1" required />
                    <input name="email" value={form.email} onChange={handleFormChange} placeholder="Email" className="border rounded px-2 py-1" required />
                    <input name="amount" type="number" value={form.amount} onChange={handleFormChange} placeholder="Amount" className="border rounded px-2 py-1" required />
                    <input name="date" type="date" value={form.date} onChange={handleFormChange} className="border rounded px-2 py-1" required />
                    <select name="status" value={form.status} onChange={handleFormChange} className="border rounded px-2 py-1">
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">{editId ? "Update" : "Create"}</button>
                        <button type="button" className="bg-gray-300 px-4 py-2 rounded-lg font-semibold" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
                    </div>
                </form>
            )}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Invoices"
                    className="border rounded-lg px-4 py-2 w-full max-w-md"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-4">Loading...</td></tr>
                        ) : (
                            invoices.map((inv) => (
                                <tr key={inv.id}>
                                    <td className="px-4 py-2">{inv.id}</td>
                                    <td className="px-4 py-2">{inv.customer}</td>
                                    <td className="px-4 py-2">{inv.email}</td>
                                    <td className="px-4 py-2">${inv.amount}</td>
                                    <td className="px-4 py-2">{inv.date}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${inv.status === "Paid" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>{inv.status}</span>
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="text-blue-600">✏️</button>
                                        <button className="text-red-600">🗑️</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-2 mt-6">
                <button className="px-3 py-1 rounded bg-blue-100">1</button>
                <button className="px-3 py-1 rounded bg-gray-100">2</button>
                <button className="px-3 py-1 rounded bg-gray-100">3</button>
                <button className="px-3 py-1 rounded bg-gray-100">4</button>
                <button className="px-3 py-1 rounded bg-gray-100">5</button>
                <button className="px-3 py-1 rounded bg-gray-100">6</button>
            </div>
        </main>
    );
}
