// src/lib/letta.ts
import { LettaClient } from "@letta-ai/letta-client";

export function letta() {
  const key = process.env.LETTA_API_KEY!;
  return new LettaClient({ apiKey: key, token: key });
}

export async function ensureAgent() {
  const client = letta();
  // In prod: create once and reuse the ID (store it).
  const agent = await client.agents.create({
    name: "letta-demo-agent",
    model: "openai/gpt-4o-mini",
    embedding: "openai/text-embedding-3-small",
    system: "You are a concise, friendly demo assistant.",
  });
  return { client, agentId: agent.id };
}

// ---- WORKING INGEST (no memories.insert) ----
export async function ingestDocs(
  agentId: string,
  docs: Array<{ title: string; content: string; metadata?: Record<string, any> }>
) {
  const client = letta();

  // store docs in a single block called "corpus"
  const label = "corpus";
  const payload = {
    value: JSON.stringify(
      docs.map(d => ({
        title: d.title,
        content: d.content,
        metadata: d.metadata ?? {},
      }))
    ),
    metadata: {
      titles: docs.map(d => d.title).join(", "),
      count: String(docs.length),
    },
  } as { value: string; metadata?: Record<string, string> };

  try {
    await client.agents.blocks.update(agentId, label, payload);
  } catch {
    await client.agents.blocks.create(agentId, { label, ...payload });
  }
}