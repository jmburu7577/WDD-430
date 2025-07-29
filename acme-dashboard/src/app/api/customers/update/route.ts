import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: Request) {
    const { id, name, email, paid, invoices } = await req.json();
    const rows = await query(
        "UPDATE customers SET name=$2, email=$3, paid=$4, invoices=$5 WHERE id=$1 RETURNING *",
        [id, name, email, paid, invoices]
    );
    return NextResponse.json(rows[0]);
}
