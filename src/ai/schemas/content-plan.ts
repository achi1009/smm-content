import { z } from 'zod';

export const GenerateContentPlanInputSchema = z.object({
  currentDate: z.string().optional().describe('The current date in ISO format. The AI will generate a plan for the three months following this date.'),
  businessName: z.string().describe('The name of the business.'),
  businessType: z.string().describe('The type of business (e.g., retail, service, technology).'),
  natureOfBusiness: z.string().describe('A detailed description of the business and its operations.'),
  contentPillars: z.string().describe('The main themes or topics for content creation, separated by commas.'),
  eventsAndHolidays: z.string().optional().describe('Relevant events and holidays for the next 3 months, separated by commas.'),
  targetAudience: z.string().describe('A description of the target audience for the content.'),
  toneOfVoice: z.string().describe('The desired tone of voice for the content (e.g., professional, friendly, humorous).'),
  servicesProducts: z.string().describe('A list of the services or products offered by the business, separated by commas.'),
  businessLocation: z.string().describe('The location of the business.'),
  contactInfo: z.string().describe('Contact information for the business (e.g., website, social media).'),
  graphicsPostsPerMonth: z.number().describe('The desired number of graphics posts per month.'),
  reelsPerMonth: z.number().describe('The desired number of reels per month.'),
  seasonalPromotions: z.string().optional().describe('Details about any seasonal promotions planned for the next 3 months.'),
  fixedHashtags: z.string().optional().describe('A list of fixed hashtags to include in every post, separated by commas.'),
});

export type GenerateContentPlanInput = z.infer<typeof GenerateContentPlanInputSchema>;

export const PostSchema = z.object({
  month: z.string().describe('The month for the post (e.g., "January", "February").'),
  postType: z.enum(['graphic', 'reel']).describe('The type of the post.'),
  tags: z.array(z.string()).describe('A list of relevant tags for this post (e.g., "Featured Service", "Promotion").'),
  title: z.string().describe('A short, catchy title for the post.'),
  content: z.string().describe('The main body content of the post.'),
  caption: z.string().describe('A friendly and engaging caption for the post.'),
  visualSuggestion: z.string().describe('A suggestion for the visual element of the post (e.g., "Professional business visual").'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags for this specific post.'),
  cta: z.string().describe('A clear call to action for the audience (e.g., "Contact us today!").'),
});

export type Post = z.infer<typeof PostSchema>;

export const GenerateContentPlanOutputSchema = z.object({
  contentPlan: z.array(PostSchema).describe('A detailed 3-month content plan, with an array of post objects.'),
});

export type GenerateContentPlanOutput = z.infer<typeof GenerateContentPlanOutputSchema>;
