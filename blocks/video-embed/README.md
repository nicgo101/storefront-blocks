# video-embed

A YouTube or Vimeo video behind a click-to-play poster. Nothing from the video host loads
until the visitor presses play, which is why it needs no cookie consent gate; the embed
uses `youtube-nocookie.com` / Vimeo `dnt=1`.

**Use when** the owner asks for "lägg in vår film", a how-to video on a product or guide
page, or a presentation on the about page. Not for the shop's own video cards (those come
from the connected backend and the site's video widget).

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `provider` | `'youtube' \| 'vimeo'` | |
| `videoId` | string | the id only: `https://youtu.be/dQw4w9WgXcQ` → `dQw4w9WgXcQ`; `https://vimeo.com/76979871` → `76979871` |
| `videoTitle` | string | accessible name (play button label, iframe title) |
| `poster` | image? | shown before the click; YouTube falls back to its own thumbnail (`i.ytimg.com`, must be allowed in `next.config` `images.remotePatterns`), Vimeo to a muted panel, so prefer a poster from the media library |
| `width` | `'narrow' \| 'wide'` | |

**Pitfalls**

- Never paste the full URL as `videoId`; extract the id.
- The YouTube fallback thumbnail host may not be in the site's `remotePatterns`; a poster
  from the media library avoids the out-of-scope config change.
