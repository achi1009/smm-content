'use client';

import { FileText, Lightbulb, Loader2, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

type ContentDisplayProps = {
  isLoading: boolean;
  isSuggesting: boolean;
  contentPlan: string;
  hashtags: string[];
  onSuggestHashtags: () => void;
};

export function ContentDisplay({ isLoading, isSuggesting, contentPlan, hashtags, onSuggestHashtags }: ContentDisplayProps) {
  const { toast } = useToast();

  const exportContent = () => {
    if (!contentPlan) return;
    const blob = new Blob([contentPlan], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content-plan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Success', description: 'Content plan exported.' });
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Copied!", description: `${type} copied to clipboard.` });
    }, () => {
      toast({ variant: 'destructive', title: "Failed to copy", description: `Could not copy ${type}.` });
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!contentPlan) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[500px] text-center border-dashed">
        <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
          <FileText className="w-10 h-10" />
        </div>
        <CardTitle>Your Content Plan Awaits</CardTitle>
        <CardDescription className="mt-2 max-w-sm">
          Fill in your business details on the left, and our AI will craft a personalized 3-month content strategy for you.
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Your 3-Month Content Plan</CardTitle>
        <CardDescription>Here is your AI-generated content strategy. You can export it or get hashtag suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow min-h-0">
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
          <pre className="whitespace-pre-wrap text-sm font-sans">{contentPlan}</pre>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        {hashtags.length > 0 && (
          <div className="w-full">
             <Separator className="my-4" />
            <div className='flex justify-between items-center mb-2'>
              <h3 className="font-semibold text-md">Suggested Hashtags</h3>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(hashtags.join(' '), 'Hashtags')}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="font-code">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
        <Separator className="my-4" />
        <div className="flex justify-between w-full">
           <Button onClick={onSuggestHashtags} disabled={isSuggesting}>
            {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
            Suggest Hashtags
          </Button>
          <Button onClick={exportContent} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Plan
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
