// Test stand-in for `next/cache`: the directives are no-ops outside Next.
export function cacheLife(_profile: string): void {}
export function cacheTag(..._tags: string[]): void {}
export function revalidateTag(_tag: string): void {}
