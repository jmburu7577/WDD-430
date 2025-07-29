"use client";
import RevenueChart from "./RevenueChart";

export default function DashboardHome() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-8">
                <span className="block text-gray-500">Collected</span>
                <span className="text-3xl font-bold">$2,689.26</span>
            </div>
            <RevenueChart />
        </main>
    );
}
