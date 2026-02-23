import { NextRequest, NextResponse } from "next/server";
import { addFeedback, initDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { email, problem, notify_updates } = await req.json();

    if (!email?.trim() || !problem?.trim())
      return NextResponse.json({ error: "Email and problem description are required." }, { status: 400 });

    await addFeedback({ email, problem, notify_updates: notify_updates ?? true });

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    await fetch(webhookURL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `\n\n## **New Feedback**\n\n- **Email:** ${email}\n- **Feedback:** ${problem}`
      })
    });

    return NextResponse.json({ message: "Feedback received. Thank you for helping shape Cicely." }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
