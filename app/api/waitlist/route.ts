import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist, initDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { name, email, role, blender_experience } = await req.json();

    if (!name?.trim() || !email?.trim())
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

    const result = await addToWaitlist({ name, email, role, blender_experience });

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    await fetch(webhookURL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `\n\n## **New Waitlist Signup**\n\n- **Name:** ${name}\n- **Blender Experience:** ${blender_experience}`
      })
    });

    if (result.length === 0)
      return NextResponse.json({ message: "You're already on the waitlist!" }, { status: 200 });

    return NextResponse.json({ message: "You're on the list. We'll be in touch." }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
