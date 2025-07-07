'use server';

import { generateContentPlan } from '@/ai/flows/generate-content-plan';
import type { GenerateContentPlanInput, GenerateContentPlanOutput } from '@/ai/schemas/content-plan';

export async function generateContentPlanAction(
  data: GenerateContentPlanInput
): Promise<{ contentPlan?: GenerateContentPlanOutput; error?: string }> {
  try {
    const contentPlan = await generateContentPlan(data);
    return { contentPlan };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred during content plan generation.';
    return { error: errorMessage };
  }
}
