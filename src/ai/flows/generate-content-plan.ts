'use server';

/**
 * @fileOverview Generates a 3-month content plan based on user-provided business details and preferences.
 *
 * - generateContentPlan - A function that orchestrates the content plan generation process.
 * - GenerateContentPlanInput - The input type for the generateContentPlan function.
 * - GenerateContentPlanOutput - The return type for the generateContentPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentPlanInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  businessType: z.string().describe('The type of business (e.g., retail, service, technology).'),
  natureOfBusiness: z.string().describe('A detailed description of the business and its operations.'),
  contentPillars: z.string().describe('The main themes or topics for content creation, separated by commas.'),
  eventsAndHolidays: z.string().describe('Relevant events and holidays for the next 3 months, separated by commas.'),
  targetAudience: z.string().describe('A description of the target audience for the content.'),
  toneOfVoice: z.string().describe('The desired tone of voice for the content (e.g., professional, friendly, humorous).'),
  servicesProducts: z.string().describe('A list of the services or products offered by the business, separated by commas.'),
  businessLocation: z.string().describe('The location of the business.'),
  contactInfo: z.string().describe('Contact information for the business (e.g., website, social media).'),
  graphicsPostsPerMonth: z.number().describe('The desired number of graphics posts per month.'),
  reelsPerMonth: z.number().describe('The desired number of reels per month.'),
  seasonalPromotions: z.string().describe('Details about any seasonal promotions planned for the next 3 months.'),
  fixedHashtags: z.string().describe('A list of fixed hashtags to include in every post, separated by commas.'),
});

export type GenerateContentPlanInput = z.infer<typeof GenerateContentPlanInputSchema>;

const GenerateContentPlanOutputSchema = z.object({
  contentPlan: z.string().describe('A detailed 3-month content plan, including post ideas, descriptions, and suggested posting dates.'),
});

export type GenerateContentPlanOutput = z.infer<typeof GenerateContentPlanOutputSchema>;

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

  Create a 3-month content plan with specific post ideas, descriptions, and suggested posting dates. Ensure the content aligns with the business's nature, target audience, and tone of voice. Take into account events, holidays, and seasonal promotions to make the content timely and relevant. Use a variety of post types including graphics posts and reels.

  The content plan must be at least 500 words long.

  Output the content plan in a readable format, including month, post date, content idea, post description, and fixed hashtags.
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
