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
  prompt: `You are an expert social media content planner. Based on the provided business details and content preferences, generate a detailed 3-month content plan for the next three calendar months (e.g., if it's May, generate for June, July, August).

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

  Create a 3-month content plan with specific post ideas. Ensure the content aligns with the business's nature, target audience, and tone of voice.
  Distribute the total number of graphics and reels across the 3 months.
  For each post, generate all the required fields as per the output schema:
  - month: The name of the month (e.g., "January").
  - postType: 'graphic' or 'reel'.
  - tags: Suggest relevant tags like "Featured Service", "Educational", "Community".
  - title: A short, catchy title.
  - content: The main text for the post.
  - caption: A friendly and engaging caption, including relevant emojis.
  - visualSuggestion: A brief description of the suggested visual.
  - hashtags: A list of relevant hashtags, ALWAYS including the fixed hashtags provided.
  - cta: A clear call-to-action.
  Structure the output as a flat array of post objects.
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
