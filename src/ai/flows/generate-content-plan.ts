'use server';

/**
 * @fileOverview Generates a 3-month content plan based on user-provided business details and preferences.
 *
 * - generateContentPlan - A function that orchestrates the content plan generation process.
 */

import {ai} from '@/ai/genkit';
import {
  type GenerateContentPlanInput,
  GenerateContentPlanInputSchema,
  type GenerateContentPlanOutput,
  GenerateContentPlanOutputSchema,
} from '@/ai/schemas/content-plan';

export async function generateContentPlan(input: GenerateContentPlanInput): Promise<GenerateContentPlanOutput> {
  return generateContentPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPlanPrompt',
  input: {schema: GenerateContentPlanInputSchema},
  output: {schema: GenerateContentPlanOutputSchema},
  prompt: `You are an expert social media content planner. Based on the provided business details and content preferences, generate a detailed 3-month content plan.

  Business Name: {{{businessName}}}
  Business Type: {{{businessType}}}
  Nature of Business: {{{natureOfBusiness}}}
  Content Pillars: {{{contentPillars}}}
  Events & Holidays: {{{eventsAndHolidays}}}
  Target Audience: {{{targetAudience}}}
  Tone of Voice: {{{toneOfVoice}}}
  Services/Products: {{{servicesProducts}}}
  Business Location: {{{businessLocation}}}
  Contact Info: {{{contactInfo}}}
  Graphics Posts per Month: {{{graphicsPostsPerMonth}}}
  Reels per Month: {{{reelsPerMonth}}}
  Seasonal Promotions: {{{seasonalPromotions}}}
  Fixed Hashtags: {{{fixedHashtags}}}

  Create a 3-month content plan with specific post ideas, descriptions, and suggested posting dates. Ensure the content aligns with the business's nature, target audience, and tone of voice.
  Take into account events, holidays, and seasonal promotions to make the content timely and relevant.
  Distribute the total number of graphics and reels across the 3 months.
  For each post, generate a list of relevant hashtags, and ALWAYS include the fixed hashtags provided if any.
  Structure the output as an array of post objects, following the provided schema. The "month" field should be like "Month 1", "Month 2", "Month 3".
  `,
});

const generateContentPlanFlow = ai.defineFlow(
  {
    name: 'generateContentPlanFlow',
    inputSchema: GenerateContentPlanInputSchema,
    outputSchema: GenerateContentPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
