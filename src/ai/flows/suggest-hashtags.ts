// src/ai/flows/suggest-hashtags.ts
'use server';

/**
 * @fileOverview A flow to suggest relevant hashtags using GenAI, based on business details and generated content plan.
 *
 * - suggestHashtags - A function that suggests hashtags.
 */

import {ai} from '@/ai/genkit';
import {
  type SuggestHashtagsInput,
  SuggestHashtagsInputSchema,
  type SuggestHashtagsOutput,
  SuggestHashtagsOutputSchema,
} from '@/ai/schemas/suggest-hashtags';

export async function suggestHashtags(input: SuggestHashtagsInput): Promise<SuggestHashtagsOutput> {
  return suggestHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestHashtagsPrompt',
  input: {schema: SuggestHashtagsInputSchema},
  output: {schema: SuggestHashtagsOutputSchema},
  prompt: `You are a social media expert. Based on the following business details and generated content plan, suggest relevant hashtags to increase the reach of social media posts.

Business Name: {{{businessName}}}
Business Type: {{{businessType}}}
Nature of Business: {{{natureOfBusiness}}}
Content Pillars: {{{contentPillars}}}
Target Audience: {{{targetAudience}}}
Tone of Voice: {{{toneOfVoice}}}
Services/Products: {{{servicesProducts}}}
Generated Content Plan: {{{generatedContentPlan}}}

Please provide an array of relevant hashtags.`,
});

const suggestHashtagsFlow = ai.defineFlow(
  {
    name: 'suggestHashtagsFlow',
    inputSchema: SuggestHashtagsInputSchema,
    outputSchema: SuggestHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
