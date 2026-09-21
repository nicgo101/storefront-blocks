'use client';

import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type ContentTab = {
  /** Tab label. */
  label: string;
  /** Stable id used in the URL hash and as the tab value; letters, digits and dashes. */
  id: string;
  /** Plain text paragraphs (one per array item)… */
  paragraphs?: string[];
  /** …or JSX. */
  content?: ReactNode;
};

export type TabsContentProps = {
  title?: string | null;
  text?: string;
  /** Two to six tabs. */
  tabs: ContentTab[];
  /** Which tab opens first; default the first. */
  defaultTab?: string;
  width?: 'narrow' | 'wide';
};

export default function TabsContentBlock({ title = null, text, tabs, defaultTab, width = 'narrow' }: TabsContentProps) {
  const first = tabs.find((t) => t.id === defaultTab)?.id ?? tabs[0]?.id;
  return (
    <section className="bg-background">
      <div className={width === 'narrow' ? 'mx-auto max-w-3xl px-6 py-16 md:py-20' : 'mx-auto max-w-[80rem] px-6 py-16 md:py-20'}>
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 text-muted-foreground">{text}</p> : null}
        <Tabs defaultValue={first} className={title || text ? 'mt-8' : ''}>
          <TabsList aria-label={title ?? 'Innehåll'} className="flex-wrap">
            {tabs.map((t) => <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>)}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.id} value={t.id} className="mt-6 text-foreground">
              {t.content ?? (t.paragraphs ?? []).map((p, i) => <p key={i} className={i ? 'mt-4 text-muted-foreground' : 'text-muted-foreground'}>{p}</p>)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
