'use server';

import { generateContentPlan, GenerateContentPlanInput, GenerateContentPlanOutput } from '@/ai/flows/generate-content-plan';
import { suggestHashtags, SuggestHashtagsInput, SuggestHashtagsOutput } from '@/ai/flows/suggest-hashtags';

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

export async function suggestHashtagsAction(
  data: SuggestHashtagsInput
): Promise<{ hashtags?: SuggestHashtagsOutput; error?: string }> {
  try {
    const hashtags = await suggestHashtags(data);
    return { hashtags };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred while suggesting hashtags.';
    return { error: errorMessage };
  }
}
