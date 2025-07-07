import {z} from 'zod';

export const SuggestHashtagsInputSchema = z.object({
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

export const SuggestHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of relevant hashtags.'),
});
export type SuggestHashtagsOutput = z.infer<typeof SuggestHashtagsOutputSchema>;
