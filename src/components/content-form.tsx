'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import type { GenerateContentPlanInput } from '@/ai/flows/generate-content-plan';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const GenerateContentPlanInputSchema = z.object({
  businessName: z.string().min(1, 'Business name is required.'),
  businessType: z.string().min(1, 'Business type is required.'),
  natureOfBusiness: z.string().min(1, 'Nature of business is required.'),
  contentPillars: z.string().min(1, 'Content pillars are required.'),
  eventsAndHolidays: z.string().optional(),
  targetAudience: z.string().min(1, 'Target audience is required.'),
  toneOfVoice: z.string().min(1, 'Tone of voice is required.'),
  servicesProducts: z.string().min(1, 'Services or products are required.'),
  businessLocation: z.string().optional(),
  contactInfo: z.string().optional(),
  graphicsPostsPerMonth: z.coerce.number().int().min(0, 'Must be a non-negative number.'),
  reelsPerMonth: z.coerce.number().int().min(0, 'Must be a non-negative number.'),
  seasonalPromotions: z.string().optional(),
  fixedHashtags: z.string().optional(),
});

const sampleData: GenerateContentPlanInput = {
  businessName: 'The Cozy Corner Cafe',
  businessType: 'Cafe / Coffee Shop',
  natureOfBusiness: 'A friendly neighborhood cafe serving artisanal coffee, homemade pastries, and light lunches. We focus on creating a warm, inviting atmosphere for students, remote workers, and local residents.',
  contentPillars: 'Community, Quality Coffee, Behind the Scenes, Daily Specials',
  eventsAndHolidays: 'National Coffee Day, Halloween, Start of Fall Semester',
  targetAudience: 'University students, young professionals, remote workers, and local families. Aged 18-45.',
  toneOfVoice: 'Warm, friendly, and slightly witty.',
  servicesProducts: 'Espresso drinks, drip coffee, cold brew, tea, croissants, muffins, sandwiches, salads',
  businessLocation: '123 Main Street, Anytown, USA',
  contactInfo: 'www.cozycorner.com, @cozycornercafe on Instagram',
  graphicsPostsPerMonth: 10,
  reelsPerMonth: 4,
  seasonalPromotions: 'Pumpkin Spice Latte launch in September, Halloween-themed cookies in October.',
  fixedHashtags: '#cozycornercafe #anytowncoffee #specialtycoffee',
};

type ContentFormProps = {
  onSubmit: (data: GenerateContentPlanInput) => void;
  isLoading: boolean;
};

export function ContentForm({ onSubmit, isLoading }: ContentFormProps) {
  const form = useForm<z.infer<typeof GenerateContentPlanInputSchema>>({
    resolver: zodResolver(GenerateContentPlanInputSchema),
    defaultValues: {
      businessName: '',
      businessType: '',
      natureOfBusiness: '',
      contentPillars: '',
      eventsAndHolidays: '',
      targetAudience: '',
      toneOfVoice: '',
      servicesProducts: '',
      businessLocation: '',
      contactInfo: '',
      graphicsPostsPerMonth: 8,
      reelsPerMonth: 4,
      seasonalPromotions: '',
      fixedHashtags: '',
    },
  });

  const loadSampleData = () => {
    form.reset(sampleData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>Fill out the form below to generate your content plan.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="businessName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Business Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="businessType" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Business Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField name="natureOfBusiness" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Nature of Business</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="contentPillars" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Content Pillars</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Comma-separated (e.g., Education, Inspiration)</FormDescription><FormMessage /></FormItem>
            )} />
             <FormField name="targetAudience" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Target Audience</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="toneOfVoice" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Tone of Voice</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="servicesProducts" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Services/Products</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Comma-separated</FormDescription><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="graphicsPostsPerMonth" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Monthly Graphic Posts</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="reelsPerMonth" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Monthly Reels</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField name="fixedHashtags" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Fixed Hashtags</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Comma-separated hashtags to include in every post.</FormDescription><FormMessage /></FormItem>
            )} />
            <FormField name="eventsAndHolidays" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Events & Holidays</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Relevant for the next 3 months.</FormDescription><FormMessage /></FormItem>
            )} />
            <FormField name="seasonalPromotions" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Seasonal Promotions</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="businessLocation" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Business Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="contactInfo" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Contact Info</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={loadSampleData}>Load Sample Data</Button>
            <Button type="submit" disabled={isLoading} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Plan
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
