# text-columns

Two or three columns of heading + paragraphs + optional link. No icons, no images.

**Use when** the owner asks for "tre korta texter bredvid varandra", store / web / phone,
service areas, or a compact "about" section. With icons use `usp-row`; with images use
`cta-cards` or `image-text`.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `columns` | `TextColumn[]` | 2 or 3 (4 works but is tight); `paragraphs` one per item |
| `variant` | `'plain' \| 'band'` | |
