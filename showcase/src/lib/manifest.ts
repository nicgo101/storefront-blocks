import raw from '../../../manifest.json';

export type BlockFile = { path: string; target: string };
export type BlockProp = { name: string; type: string; required?: boolean; default?: unknown; description?: string };
export type BlockMeta = {
  id: string;
  version: number;
  name: string;
  summary: string;
  category: 'hero' | 'content' | 'media' | 'social-proof' | 'commerce' | 'contact' | 'navigation';
  tier: 'generic' | 'shop';
  files: BlockFile[];
  uses: { ui?: string[]; packages?: string[]; site?: string[] };
  props?: BlockProp[];
  thumbnail: string;
  dir: string;
};
export type Manifest = { version: string; builtAt: string; blocks: BlockMeta[] };

export const manifest = raw as Manifest;
