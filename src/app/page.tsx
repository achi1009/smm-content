'use client';

import { useState } from 'react';
import type { GenerateContentPlanInput } from '@/ai/flows/generate-content-plan';
import { useToast } from '@/hooks/use-toast';
import { generateContentPlanAction, suggestHashtagsAction } from '@/lib/actions';
import { Header } from '@/components/header';
import { ContentForm } from '@/components/content-form';
import { ContentDisplay } from '@/components/content-display';

type ContentPlanState = {
  plan: string;
  hashtags: string[];
  formSnapshot: GenerateContentPlanInput | null;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [content, setContent] = useState<ContentPlanState>({
    plan: '',
    hashtags: [],
    formSnapshot: null,
  });
  const { toast } = useToast();

  const handleGenerateContent = async (data: GenerateContentPlanInput) => {
    setIsLoading(true);
    setContent({ plan: '', hashtags: [], formSnapshot: null });
    try {
      const result = await generateContentPlanAction(data);
      if (result.error) {
        throw new Error(result.error);
      }
      setContent({
        plan: result.contentPlan?.contentPlan || '',
        hashtags: [],
        formSnapshot: data,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error generating content',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestHashtags = async () => {
    if (!content.plan || !content.formSnapshot) return;

    setIsSuggesting(true);
    try {
      const result = await suggestHashtagsAction({
        ...content.formSnapshot,
        generatedContentPlan: content.plan,
      });
      if (result.error) {
        throw new Error(result.error);
      }
      setContent(prev => ({ ...prev, hashtags: result.hashtags?.hashtags || [] }));
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error suggesting hashtags',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="grid lg:grid-cols-2 gap-8 p-4 md:p-8">
        <ContentForm onSubmit={handleGenerateContent} isLoading={isLoading} />
        <ContentDisplay
          isLoading={isLoading}
          isSuggesting={isSuggesting}
          contentPlan={content.plan}
          hashtags={content.hashtags}
          onSuggestHashtags={handleSuggestHashtags}
        />
      </main>
    </div>
  );
}
