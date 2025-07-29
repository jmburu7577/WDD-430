import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
    const { customer, email, amount, date, status } = await req.json();
    const rows = await query(
        "INSERT INTO invoices (customer, email, amount, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [customer, email, amount, date, status]
    );
    return NextResponse.json(rows[0]);
}
