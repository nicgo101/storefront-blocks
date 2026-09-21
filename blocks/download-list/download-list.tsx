import { Download, FileText, FileSpreadsheet, FileImage, FileArchive, File, type LucideIcon } from 'lucide-react';

export type DownloadItem = {
  title: string;
  /** Site-relative (`/manualer/x.pdf`) or an `https` URL (a Vendure asset). */
  href: string;
  description?: string;
  /** Shown as written: "2,4 MB". */
  size?: string;
  /** Overrides the type derived from the file extension. */
  type?: string;
};

export type DownloadListProps = {
  title?: string | null;
  text?: string;
  files: DownloadItem[];
  /** `list`: one row per file. `grid`: cards, two or three per row. */
  layout?: 'list' | 'grid';
};

const ICONS: Record<string, LucideIcon> = { pdf: FileText, doc: FileText, docx: FileText, txt: FileText, xls: FileSpreadsheet, xlsx: FileSpreadsheet, csv: FileSpreadsheet, png: FileImage, jpg: FileImage, jpeg: FileImage, svg: FileImage, zip: FileArchive };

export function fileType(href: string, explicit?: string): string {
  if (explicit) return explicit.toUpperCase();
  const m = /\.([a-z0-9]{1,5})(?:[?#].*)?$/i.exec(href);
  return m ? m[1].toUpperCase() : 'FIL';
}

export default function DownloadList({ title = 'Dokument', text, files, layout = 'list' }: DownloadListProps) {
  return (
    <section className="bg-background">
      <div className={layout === 'list' ? 'mx-auto max-w-3xl px-6 py-16 md:py-20' : 'mx-auto max-w-[80rem] px-6 py-16 md:py-20'}>
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`${layout === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'divide-y divide-border rounded-lg border border-border'} ${title || text ? 'mt-8' : ''}`}>
          {files.map((f, i) => {
            const type = fileType(f.href, f.type);
            const Icon = ICONS[type.toLowerCase()] ?? File;
            const external = /^https?:\/\//.test(f.href);
            return (
              <li key={i} className={layout === 'grid' ? 'rounded-lg border border-border bg-card' : ''}>
                <a href={f.href} download={external ? undefined : ''} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined} className="group flex items-center gap-4 p-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-primary" aria-hidden="true"><Icon className="size-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium underline-offset-4 group-hover:underline">{f.title}</span>
                    {f.description ? <span className="block text-sm text-muted-foreground">{f.description}</span> : null}
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">{type}{f.size ? ` · ${f.size}` : ''}</span>
                  </span>
                  <Download className="size-5 shrink-0 text-muted-foreground transition group-hover:text-primary" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
