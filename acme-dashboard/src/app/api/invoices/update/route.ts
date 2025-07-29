import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: Request) {
    const { id, customer, email, amount, date, status } = await req.json();
    const rows = await query(
        "UPDATE invoices SET customer=$2, email=$3, amount=$4, date=$5, status=$6 WHERE id=$1 RETURNING *",
        [id, customer, email, amount, date, status]
    );
    return NextResponse.json(rows[0]);
}
