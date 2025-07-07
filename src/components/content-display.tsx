'use client';

import { FileText, Loader2, Download, Copy, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Post } from '@/ai/schemas/content-plan';

type ContentDisplayProps = {
  isLoading: boolean;
  posts: Post[];
};

export function ContentDisplay({ isLoading, posts }: ContentDisplayProps) {
  const { toast } = useToast();

  const formatContentForExport = () => {
    return posts.map(post => {
      return `
## ${post.contentIdea} (${post.postType})

**Date:** ${post.postDate}, ${post.month}

**Description:**
${post.postDescription}

**Hashtags:**
${post.hashtags.join(' ')}
      `.trim();
    }).join('\n\n---\n\n');
  };

  const exportContent = () => {
    if (!posts || posts.length === 0) return;
    const formattedContent = formatContentForExport();
    const blob = new Blob([formattedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content-plan.md';
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

  if (!posts || posts.length === 0) {
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
        <CardDescription>Here is your AI-generated content strategy. Expand each item to see details.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow min-h-0">
        <ScrollArea className="h-[550px] w-full pr-4">
          <Accordion type="single" collapsible className="w-full">
            {posts.map((post, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4 text-left">
                    {post.postType === 'graphic' ? <ImageIcon className="w-5 h-5 text-primary" /> : <VideoIcon className="w-5 h-5 text-primary" />}
                    <div>
                      <p className="font-semibold">{post.contentIdea}</p>
                      <p className="text-sm text-muted-foreground">{post.postDate}, {post.month}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold">Description</h4>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(post.postDescription, 'Description')}>
                          <Copy className="mr-2 h-3 w-3" /> Copy
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{post.postDescription}</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold">Hashtags</h4>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(post.hashtags.join(' '), 'Hashtags')}>
                          <Copy className="mr-2 h-3 w-3" /> Copy
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="font-code">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={exportContent} variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Export Plan as Markdown
        </Button>
      </CardFooter>
    </Card>
  );
}
