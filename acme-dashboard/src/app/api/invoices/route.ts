import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
    // Example: fetch invoices from database
    const rows = await query("SELECT id, customer, email, amount, date, status FROM invoices ORDER BY date DESC LIMIT 10");
    return NextResponse.json(rows);
}
