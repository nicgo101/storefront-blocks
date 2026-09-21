import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type RichTextProps = {
  /** Section heading above the text; `null` for none. */
  title?: string | null;
  /** Small label above the heading. */
  eyebrow?: string;
  /** Body as JSX (headings, paragraphs, lists, quotes). Preferred. */
  children?: ReactNode;
  /** Body as an HTML string from the site's own code or content files. Never from user input. */
  html?: string;
  /** Column width. `narrow` (~42rem, best for reading), `wide` (~56rem). */
  width?: 'narrow' | 'wide';
  /** Text size. */
  size?: 'base' | 'lg';
};

/**
 * Typography via @tailwindcss/typography, mapped onto the semantic tokens so it follows
 * the site's colours. Every storefront has the plugin and `prose` in use already.
 */
const PROSE = 'prose prose-slate max-w-none text-foreground prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-p:text-foreground/90 prose-a:text-primary prose-a:underline-offset-4 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-li:marker:text-primary prose-hr:border-border prose-img:rounded-lg';

export default function RichText({ title = null, eyebrow, children, html, width = 'narrow', size = 'base' }: RichTextProps) {
  return (
    <section className="bg-background">
      <div className={cn('mx-auto px-6 py-16 md:py-20', width === 'narrow' ? 'max-w-3xl' : 'max-w-4xl')}>
        {eyebrow ? <p className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</p> : null}
        {title ? <h2 className="mt-1 mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2> : null}
        {html !== undefined
          ? <div className={cn(PROSE, size === 'lg' && 'prose-lg')} dangerouslySetInnerHTML={{ __html: html }} />
          : <div className={cn(PROSE, size === 'lg' && 'prose-lg')}>{children}</div>}
      </div>
    </section>
  );
}
