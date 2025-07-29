import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
    const { name, email, paid, invoices } = await req.json();
    const rows = await query(
        "INSERT INTO customers (name, email, paid, invoices) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, paid, invoices]
    );
    return NextResponse.json(rows[0]);
}
