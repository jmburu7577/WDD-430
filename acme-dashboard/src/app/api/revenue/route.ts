import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
    // Example: fetch recent revenue from database
    const rows = await query("SELECT month, revenue FROM revenue ORDER BY month DESC LIMIT 6");
    return NextResponse.json(rows);
}
