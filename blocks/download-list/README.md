# download-list

A list (or grid of cards) of files to download: icon by file type, title, description,
type and size.

**Use when** the owner asks for "manualer", "prislista som PDF", "blanketter", downloadable
certificates, or a documents section on a product category page. Product manuals that the
shop manages (the manuals plugin) belong on the product page through the site's own
component; this block is for hand-listed files.

**Where the files live**: under the site's public folder (`/manualer/x.pdf`, uploaded
through the media library or attached in chat and committed with the change), or as
Vendure assets (`https` URL, opens in a new tab). A repo file gets the `download`
attribute; an external one does not.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Dokument" |
| `text` | string? | |
| `files` | `DownloadItem[]` | `size` as written ("2,4 MB"); `type` overrides the extension-derived label |
| `layout` | `'list' \| 'grid'` | |

**Pitfalls**

- The media library uploads images only; a PDF comes in as a chat attachment saved
  under `uploads/`, or is already in the repo. Do not base64 it into the code.
- Keep file names ASCII and lowercase; some browsers mangle `å ä ö` in downloads.
