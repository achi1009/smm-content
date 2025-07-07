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
  prompt: `You are an expert social media content planner. Based on the provided business details and content preferences, generate a detailed 3-month content plan for the three calendar months immediately following the current date. For example, if it's May, generate for June, July, and August.

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
  For each post, generate all the required fields as per the output schema.
  Structure the output as a flat array of post objects.

  Here are specific instructions for each post type:

  REELS:
  - The 'content' field must describe 4 slides, with each slide on a new line.
    - Slide 1: Catchy title (this will also be the value for the 'title' field).
    - Slide 2: One full sentence.
    - Slide 3: One full sentence.
    - Slide 4: One full CTA sentence.
  - The 'caption' must be 3 to 5 sentences long, include more than two emojis, and contain a call to action.
  - The 'hashtags' field in your response MUST contain exactly 3 relevant hashtags. The 3 hashtags should be:
    1. The business location, following the format #CityState (e.g., #AnytownUSA - use the state abbreviation).
    2. The industry or the line of business (e.g., #CoffeeShop).
    3. The topic of the post (e.g., #PumpkinSpice).
  - The caption MUST include the 3 generated hashtags from the 'hashtags' field, followed by all of the {{{fixedHashtags}}}.

  GRAPHICS:
  - The 'content' field must:
    - Use a first-person voice (we/our).
    - Be conversational and engaging.
    - Be concise, with a maximum of 3 sentences.
    - Avoid repetition.
  - For the 'tags' field, suggest a style like "Featured Service", "List-Type", "Info Text", or "Event Post" if an event is relevant.
  - The 'caption' must be 3 to 5 sentences long, include more than two emojis, and contain a call to action.
  - The 'hashtags' field in your response MUST contain exactly 3 relevant hashtags. The 3 hashtags should be:
    1. The business location, following the format #CityState (e.g., #AnytownUSA - use the state abbreviation).
    2. The industry or the line of business (e.g., #GraphicDesign).
    3. The topic of the post (e.g., #LogoDesignTips).
  - The caption MUST include the 3 generated hashtags from the 'hashtags' field, followed by all of the {{{fixedHashtags}}}.
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
