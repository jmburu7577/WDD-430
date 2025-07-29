import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(req: Request) {
    const { id } = await req.json();
    await query("DELETE FROM invoices WHERE id=$1", [id]);
    return NextResponse.json({ success: true });
}
