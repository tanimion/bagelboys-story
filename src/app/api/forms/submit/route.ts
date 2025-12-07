export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    // Insert into Supabase
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      created_at: new Date(),
    });

    if (error) {
      // redirect with error
      return NextResponse.redirect(
        `${req.headers.get("referer") || "/"}?error=true`,
        302
      );
    }

    // redirect with success
    return NextResponse.redirect(
      `${req.headers.get("referer") || "/"}?success=true`,
      302
    );
  } catch (err: any) {
    return NextResponse.redirect(
      `${req.headers.get("referer") || "/"}?error=true`,
      302
    );
  }
}