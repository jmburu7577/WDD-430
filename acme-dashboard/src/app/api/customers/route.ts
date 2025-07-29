import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
    // Example: fetch customers from database
    const rows = await query("SELECT id, name, email, paid, invoices FROM customers ORDER BY name ASC LIMIT 10");
    return NextResponse.json(rows);
}
