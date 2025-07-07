import { z } from 'zod';

export const GenerateContentPlanInputSchema = z.object({
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

export const PostSchema = z.object({
  month: z.string().describe('The month for the post (e.g., "Month 1", "Month 2").'),
  postDate: z.string().describe('The suggested date for posting (e.g., "Week 1, Day 3").'),
  contentIdea: z.string().describe('The core idea or title for the content post.'),
  postDescription: z.string().describe('A detailed description, caption, or script for the post.'),
  postType: z.enum(['graphic', 'reel']).describe('The type of the post.'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags for this specific post.'),
});

export type Post = z.infer<typeof PostSchema>;

export const GenerateContentPlanOutputSchema = z.object({
  contentPlan: z.array(PostSchema).describe('A detailed 3-month content plan, with an array of post objects.'),
});

export type GenerateContentPlanOutput = z.infer<typeof GenerateContentPlanOutputSchema>;
