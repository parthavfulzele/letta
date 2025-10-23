import { z } from 'zod';

export const AnalysisSchema = z.object({
  summary: z.string(),
  recommendations: z.array(z.string()).default([]),
  risk_notes: z.array(z.string()).default([]),
});

export type Analysis = z.infer<typeof AnalysisSchema>;

export const JSON_ONLY_SYSTEM = 'You MUST return strictly valid JSON with keys: summary, recommendations, risk_notes. No prose, no markdown.';
