import Link from 'next/link';
import { manifest } from '@/lib/manifest';

const CATEGORY_LABEL: Record<string, string> = {
  hero: 'Hero', content: 'Innehåll', media: 'Media', 'social-proof': 'Omdömen', commerce: 'Butik', contact: 'Kontakt', navigation: 'Navigation',
};

export default function Index() {
  const groups = new Map<string, typeof manifest.blocks>();
  for (const b of manifest.blocks) groups.set(b.category, [...(groups.get(b.category) ?? []), b]);
  return (
    <main className="mx-auto max-w-[80rem] px-6 py-10">
      <h1 className="text-2xl font-semibold">Block ({manifest.blocks.length})</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manifest {manifest.version}. Varje block renderas med sina exempel-props på /b/&lt;id&gt;.</p>

      <section className="mt-8 rounded-lg border border-border bg-card p-5">
        <h2 className="text-lg font-medium">Exempelsidor</h2>
        <p className="mt-1 text-sm text-muted-foreground">Hela sidor byggda av block, i den ordning en webbmästare skulle stapla dem.</p>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {[['startsida', 'Startsida', '14 block: informationsrad, hero, USP, kampanjrutor, kategorier, produktflikar, omdömen, märken, FAQ, nyhetsbrev, sidfot'], ['om-oss', 'Om oss', '11 block: brödtext, sicksack, siffror, tidslinje, medarbetare, certifieringar, galleri, video'], ['kontakt', 'Kontakt', '8 block: karta, formulär, butiker, flikar, dokument, flytande knapp']].map(([slug, name, desc]) => (
            <li key={slug} className="min-w-[16rem] flex-1 rounded-md border border-border bg-background p-3">
              <Link href={`/exempel/${slug}`} className="font-medium underline-offset-4 hover:underline">{name}</Link>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </section>
      {[...groups.entries()].map(([cat, list]) => (
        <section key={cat} className="mt-8">
          <h2 className="text-lg font-medium">{CATEGORY_LABEL[cat] ?? cat}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((b) => (
              <li key={b.id} className="rounded-lg border border-border bg-card p-4">
                <Link href={`/b/${b.id}`} className="font-medium underline-offset-4 hover:underline">{b.name}</Link>
                <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{b.tier}</span>
                <p className="mt-1 text-sm text-muted-foreground">{b.summary}</p>
                <code className="mt-2 block text-xs text-muted-foreground">{b.id}</code>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
