"use client";
import { useEffect, useState } from "react";

type RevenueRow = { month: string; revenue: number };

export default function RevenueChart() {
    const [data, setData] = useState<RevenueRow[]>([]);

    useEffect(() => {
        fetch("/api/revenue")
            .then((res) => res.ok ? res.json() : Promise.resolve([]))
            .then(setData)
            .catch(() => setData([]));
    }, []);

    return (
        <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="mb-2 font-semibold">Recent Revenue</h3>
            <div className="flex gap-4 items-end h-32">
                {data.length === 0 ? (
                    <span>No revenue data available.</span>
                ) : (
                    data.map((row) => (
                        <div key={row.month} className="flex flex-col items-center">
                            <div
                                className="bg-blue-500 w-8 rounded"
                                style={{ height: `${row.revenue / 100}px` }}
                            ></div>
                            <span className="text-xs mt-1">{row.month}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
