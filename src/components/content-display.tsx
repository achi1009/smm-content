'use client';

import {
  FileText,
  Loader2,
  Download,
  Image as ImageIcon,
  Video as VideoIcon,
  Palette,
  Hash,
  Megaphone,
  RefreshCw,
  Copy,
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Post } from '@/ai/schemas/content-plan';

type ContentDisplayProps = {
  isLoading: boolean;
  posts: Post[];
};

function PostCard({ post }: { post: Post }) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Copied!", description: `${type} copied to clipboard.` });
    }, () => {
      toast({ variant: 'destructive', title: "Failed to copy", description: `Could not copy ${type}.` });
    });
  };

  const getFullPostContent = () => {
    let fullContent = `Title: ${post.title}\n\nContent: ${post.content}\n\nCaption: ${post.caption}`;
    if (post.hashtags && post.hashtags.length > 0) {
      fullContent += `\n\nHashtags: ${post.hashtags.join(' ')}`;
    }
    return fullContent;
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between gap-2 p-3 bg-muted/50 border-b">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-foreground text-background font-bold">
            {post.postType.toUpperCase()} POST
          </Badge>
          <Badge variant="outline">{post.month}</Badge>
          {post.tags.map((tag, i) => (
             <Badge key={i} variant={tag.toLowerCase().includes('featured') ? 'default' : 'secondary'}>{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => copyToClipboard(getFullPostContent(), "Post content")}>
            <span className="sr-only">Copy Post Content</span>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="mr-2 h-4 w-4" />
            Revise
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-muted/50 p-4 rounded-md border space-y-2 text-sm text-foreground">
          <h4 className="font-bold text-base text-foreground">Graphics Post Content:</h4>
          <div>
            <span className="font-semibold">Title:</span> {post.title}
          </div>
          <div>
            <span className="font-semibold">Content:</span> <span className='whitespace-pre-wrap'>{post.content}</span>
          </div>
           <div>
            <span className="font-semibold">Caption:</span> <span className='whitespace-pre-wrap'>{post.caption}</span>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
            <div>
              <h5 className="font-semibold">Overall Visuals</h5>
              <p className="text-sm text-muted-foreground">{post.visualSuggestion}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Hash className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
            <div>
              <h5 className="font-semibold">Hashtags</h5>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {post.hashtags.map((tag, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{tag}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Megaphone className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
            <div>
              <h5 className="font-semibold">CTA</h5>
              <p className="text-sm text-muted-foreground">{post.cta}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export function ContentDisplay({ isLoading, posts }: ContentDisplayProps) {
  const { toast } = useToast();

  const exportContent = () => {
    if (!posts || posts.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No content to export',
        description: 'Please generate a content plan first.',
      });
      return;
    }

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Your 3-Month Content Plan', 14, 22);
    
    const tableData = posts.map(post => {
        return [
          post.month,
          post.postType.toUpperCase(),
          post.title,
          post.content,
          post.caption,
          post.hashtags.join(' '),
        ];
    });

    autoTable(doc, {
        startY: 30,
        head: [['Month', 'Type', 'Title', 'Content', 'Caption', 'Hashtags']],
        body: tableData,
        theme: 'grid',
        styles: {
            fontSize: 8,
            cellPadding: 2,
            valign: 'top',
        },
        headStyles: {
            fillColor: [63, 76, 179],
            textColor: 255,
            fontStyle: 'bold',
        },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 15 },
            2: { cellWidth: 30 },
            3: { cellWidth: 'auto' },
            4: { cellWidth: 'auto' },
            5: { cellWidth: 25 },
        },
    });

    doc.save('content-plan.pdf');
    toast({ title: 'Success', description: 'Content plan exported as PDF.' });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="p-4 border rounded-lg space-y-4">
            <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-8 w-24" />
            </div>
            <div className='p-4 rounded-md bg-muted/50 space-y-2'>
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
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

  const postsByMonth = posts.reduce((acc, post) => {
    const month = post.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const months = Object.keys(postsByMonth).sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your 3-Month Content Plan</CardTitle>
            <CardDescription>Here is your AI-generated content strategy.</CardDescription>
          </div>
          <Button onClick={exportContent} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow min-h-0 pt-4">
        <Tabs defaultValue={months[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
             {months.map(month => (
              <TabsTrigger key={month} value={month}>{month}</TabsTrigger>
            ))}
          </TabsList>
            {months.map(month => (
              <TabsContent key={month} value={month} className="m-0 mt-4">
                <ScrollArea className="h-[550px] w-full">
                  <div className="space-y-4 pr-4">
                    {postsByMonth[month].map((post, index) => (
                      <PostCard key={`${month}-${index}`} post={post} />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
