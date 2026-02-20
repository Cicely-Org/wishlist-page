import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id                SERIAL PRIMARY KEY,
      name              TEXT NOT NULL,
      email             TEXT NOT NULL UNIQUE,
      role              TEXT,
      blender_experience TEXT,
      created_at        TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id             SERIAL PRIMARY KEY,
      email          TEXT NOT NULL,
      problem        TEXT NOT NULL,
      notify_updates BOOLEAN DEFAULT TRUE,
      created_at     TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function addToWaitlist(data: {
  name: string;
  email: string;
  role?: string;
  blender_experience?: string;
}) {
  return await sql`
    INSERT INTO waitlist (name, email, role, blender_experience)
    VALUES (${data.name}, ${data.email}, ${data.role ?? null}, ${data.blender_experience ?? null})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `;
}

export async function addFeedback(data: {
  email: string;
  problem: string;
  notify_updates: boolean;
}) {
  return await sql`
    INSERT INTO feedback (email, problem, notify_updates)
    VALUES (${data.email}, ${data.problem}, ${data.notify_updates})
    RETURNING id
  `;
}
