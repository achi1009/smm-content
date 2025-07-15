"use client";

import { useState } from "react";
import type { GenerateContentPlanInput, Post } from "@/ai/schemas/content-plan";
import { useToast } from "@/hooks/use-toast";
import { generateContentPlanAction } from "@/lib/actions";
import { Header } from "@/components/header";
import { ContentForm } from "@/components/content-form";
import { ContentDisplay } from "@/components/content-display";
import * as z from "zod";
import { GenerateContentPlanInputSchema } from "@/ai/schemas/content-plan";

type ContentPlanState = {
  posts: Post[];
  formSnapshot: GenerateContentPlanInput | null;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<ContentPlanState>({
    posts: [],
    formSnapshot: null,
  });
  const { toast } = useToast();

  const handleGenerateContent = async (
    data: z.infer<typeof GenerateContentPlanInputSchema>
  ) => {
    setIsLoading(true);
    setContent({ posts: [], formSnapshot: null });
    try {
      const result = await generateContentPlanAction(data);
      if (result.error) {
        throw new Error(result.error);
      }
      setContent({
        posts: result.contentPlan?.contentPlan || [],
        formSnapshot: data,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error generating content",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcc9d6] text-foreground">
      <Header />
      <main className="grid lg:grid-cols-2 gap-8 p-4 md:p-8">
        <ContentForm onSubmit={handleGenerateContent} isLoading={isLoading} />
        <ContentDisplay isLoading={isLoading} posts={content.posts} />
      </main>
    </div>
  );
}
