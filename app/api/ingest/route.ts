// app/api/ingest/route.ts
import { NextResponse } from "next/server";
import { ensureAgent, ingestDocs } from "@/lib/letta";
import { ns } from "@/lib/namespaces";

export async function POST() {
  const { agentId } = await ensureAgent();

  await ingestDocs(agentId, [
    {
      title: "Match metadata: ARS vs CHE (2024-09-14)",
      content: "Final score 2-1. Possession 56%. xG 1.9 vs 1.2.",
      metadata: { [ns.team("ars")]: "1", [ns.match("2024-09-14-ars-che")]: "1" },
    },
    {
      title: "Player profile: Saka",
      content: "Right winger, left-footed, excellent in 1v1 situations.",
      metadata: { [ns.team("ars")]: "1" },
    },
  ]);

  return NextResponse.json({ ok: true, agentId });
}