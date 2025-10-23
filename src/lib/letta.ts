// lib/letta.ts
import { LettaClient } from "@letta-ai/letta-client";

export function letta() {
  const key = process.env.LETTA_API_KEY!;
  return new LettaClient({ apiKey: key, token: key });
}

// Create or reuse an agent
export async function ensureAgent() {
  const client = letta();
  const agent = await client.agents.create({
    name: "letta-demo-agent",
    model: "openai/gpt-4o-mini",
    embedding: "openai/text-embedding-3-small",
    system: "You are a helpful assistant that summarizes data clearly.",
  });
  return { client, agentId: agent.id };
}

// Upload documents into memory
export async function ingestDocs(
  agentId: string,
  docs: Array<{ title: string; content: string; metadata?: Record<string, any> }>
) {
  const client = letta();
  await client.agents.memories.insert({
    agentId,
    items: docs.map((d) => ({
      title: d.title,
      content: d.content,
      metadata: d.metadata ?? {},
    })),
  });
}