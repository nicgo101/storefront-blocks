# before-after

Two images laid over each other with a draggable divider. A native range input drives
it, so mouse, touch and keyboard all work and the slider is announced to screen readers.

**Use when** the owner asks for "före och efter", renovation, cleaning, repair or
restoration results, or a comparison between two states of the same thing.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `before`, `after` | images | the SAME size and framing; the box takes `after`'s aspect ratio |
| `beforeLabel`, `afterLabel` | string | corner labels, default "Före" / "Efter" |
| `initial` | 0 to 100 | divider start position |
| `width` | `'narrow' \| 'wide'` | |

**Pitfalls**

- Different crops between the two photos make the effect look broken; ask the owner for
  a pair shot from the same spot, or crop both to the same frame in the media library.
- Both images load at full size; keep them under ~300 kB each.
