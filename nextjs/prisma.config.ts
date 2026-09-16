// Prisma 7 config: used by `prisma migrate` / `prisma generate`.
// The CLI only auto-loads `.env` — our secrets live in `.env.local`
// (Next.js convention), so load that first (`.env` fills any gaps).
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations must run on a DIRECT connection (Supabase pooler can't
    // run DDL). Falls back to DATABASE_URL for local Postgres setups.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
