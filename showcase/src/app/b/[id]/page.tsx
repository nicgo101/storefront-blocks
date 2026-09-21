import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blocks } from '@/generated/blocks';
import { manifest } from '@/lib/manifest';

export function generateStaticParams() {
  return Object.keys(blocks).map((id) => ({ id }));
}

export default async function BlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = blocks[id];
  const meta = manifest.blocks.find((b) => b.id === id);
  if (!entry || !meta) notFound();
  const [{ default: Block }, { sample }] = await Promise.all([entry.load(), entry.sample()]);
  return (
    <>
      <div className="mx-auto flex max-w-[80rem] items-baseline gap-3 px-6 py-3 text-sm text-muted-foreground">
        <Link href="/" className="underline-offset-4 hover:underline">← alla block</Link>
        <span className="font-medium text-foreground">{meta.name}</span>
        <code className="text-xs">{id}</code>
        <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{meta.tier}</span>
      </div>
      <div data-block={id}>
        <Block {...sample} />
      </div>
    </>
  );
}
