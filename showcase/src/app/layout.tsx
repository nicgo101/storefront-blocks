import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = { title: 'storefront-blocks', description: 'Block showcase' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-[80rem] items-center gap-4 px-6 py-3 text-sm">
            <Link href="/" className="font-semibold">storefront-blocks</Link>
            <span className="text-muted-foreground">showcase</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
