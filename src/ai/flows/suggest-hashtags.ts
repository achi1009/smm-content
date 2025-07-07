// src/ai/flows/suggest-hashtags.ts
'use server';

/**
 * @fileOverview A flow to suggest relevant hashtags using GenAI, based on business details and generated content plan.
 *
 * - suggestHashtags - A function that suggests hashtags.
 * - SuggestHashtagsInput - The input type for the suggestHashtags function.
 * - SuggestHashtagsOutput - The return type for the suggestHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHashtagsInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  businessType: z.string().describe('The type of the business.'),
  natureOfBusiness: z.string().describe('The nature of the business.'),
  contentPillars: z.string().describe('The content pillars of the business.'),
  targetAudience: z.string().describe('The target audience of the business.'),
  toneOfVoice: z.string().describe('The tone of voice of the business.'),
  servicesProducts: z.string().describe('The services or products offered by the business.'),
  generatedContentPlan: z.string().describe('The generated content plan for the business.'),
});
export type SuggestHashtagsInput = z.infer<typeof SuggestHashtagsInputSchema>;

const SuggestHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of relevant hashtags.'),
});
export type SuggestHashtagsOutput = z.infer<typeof SuggestHashtagsOutputSchema>;

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
