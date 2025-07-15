"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";
import type { GenerateContentPlanInput } from "@/ai/schemas/content-plan";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const GenerateContentPlanInputSchema = z.object({
  businessName: z.string().min(1, "Business name is required."),
  natureOfBusiness: z.string().min(1, "Nature of business is required."),
  contentPillars: z.string().min(1, "Content pillars are required."),
  eventsAndHolidays: z.string().default(""),
  targetAudience: z.string().min(1, "Target audience is required."),
  toneOfVoice: z.string().min(1, "Tone of voice is required."),
  servicesProducts: z.string().min(1, "Services or products are required."),
  graphicsPostsPerMonth: z.coerce
    .number()
    .int()
    .min(0, "Must be a non-negative number."),
  reelsPerMonth: z.coerce
    .number()
    .int()
    .min(0, "Must be a non-negative number."),
  fixedHashtags: z.string().default(""),
});

const sampleData: GenerateContentPlanInput = {
  businessName: "The Cozy Corner Cafe",
  natureOfBusiness: "Cafe / Coffee Shop",
  contentPillars:
    "Community, Quality Coffee, Behind the Scenes, Daily Specials",
  eventsAndHolidays: "National Coffee Day, Halloween, Start of Fall Semester",
  targetAudience:
    "University students, young professionals, remote workers, and local families. Aged 18-45.",
  toneOfVoice: "Warm, friendly, and slightly witty.",
  servicesProducts:
    "Espresso drinks, drip coffee, cold brew, tea, croissants, muffins, sandwiches, salads",
  graphicsPostsPerMonth: 8,
  reelsPerMonth: 4,
  fixedHashtags: "#cozycornercafe #anytowncoffee #specialtycoffee",
};

type ContentFormProps = {
  onSubmit: (data: z.infer<typeof GenerateContentPlanInputSchema>) => void;
  isLoading: boolean;
};

export function ContentForm({ onSubmit, isLoading }: ContentFormProps) {
  const form = useForm<z.infer<typeof GenerateContentPlanInputSchema>>({
    resolver: zodResolver(GenerateContentPlanInputSchema),
    defaultValues: {
      businessName: "",
      natureOfBusiness: "",
      contentPillars: "",
      eventsAndHolidays: "",
      targetAudience: "",
      toneOfVoice: "",
      servicesProducts: "",
      graphicsPostsPerMonth: 0,
      reelsPerMonth: 0,
      fixedHashtags: "",
    },
  });

  const loadSampleData = () => {
    form.reset(sampleData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>
          Fill out the form below to generate your content plan. 🚀✨📅
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                name="businessName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Business Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="natureOfBusiness"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nature of business <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="contentPillars"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Content <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated (e.g., Education, Inspiration)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="servicesProducts"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Services/Products/ <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormDescription>Comma-separated</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                name="toneOfVoice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tone of Voice <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="targetAudience"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Target Audience <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                name="graphicsPostsPerMonth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Monthly Graphic Posts{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      value={field.value?.toString() ?? ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[...Array(9).keys()].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="reelsPerMonth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Monthly <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      value={field.value?.toString() ?? ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[...Array(6).keys()].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="fixedHashtags"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fixed Hashtags</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated hashtags to include in every post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="eventsAndHolidays"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Events & Holidays</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated Events & Holiday Relevant for the next 3
                    months.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              className="bg-[#dcc9d6] hover:bg-[#000] hover:text-white"
              onClick={loadSampleData}
            >
              Load Sample Data
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "#000",
                color: "white",
              }}
              className="hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Plan
            </Button>
          </CardFooter>
          <div className="text-xs text-muted-foreground text-center mt-4 pb-4">
            ⚠️ Important: The tool can make mistakes; please double-check.
          </div>
        </form>
      </Form>
    </Card>
  );
}
