import type {Metadata} from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'ContentForge AI',
  description: 'Your AI-powered content strategy partner.',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], variable: '--font-code' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', inter.variable, sourceCodePro.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
