# GuardianLink Static Site (Eleventy + Tailwind)

A modern, mobile‑first static site that connects cyber volunteers with NGOs. Built on Eleventy 2.x with TailwindCSS and a small set of custom filters/utilities for profiles, events, and marketing pages.

## What’s Included
- **Eleventy** with Nunjucks templates, custom filters (`date`, `absoluteUrl`, `w3cDate`, `findUser`, `userTypeLabel`, `formatDate`, `where`).
- **TailwindCSS** theme with brand palette, gradient CTAs, animated hero aurora, and custom buttons/cards.
- **Layouts & components**: single base layout, head, header (CTA cluster), footer (social icons shown but disabled links), post layout.
- **Pages**: home (`/`), events (`/events/`), resources (`/resources/`), profiles (list + volunteer `/profiles/volunteers/` and NGO `/profiles/ngos/` splits), contact + thank-you, about, 404, sitemap, robots.
- **Profiles**: individual pages via `src/profiles/profile.njk` plus filtered lists; supporting data in `_data/users.json` and `_data/profiles.json`.
- **Assets**: logo swaps, Code Forged Digital credit, social icons (non-clickable), hero imagery with aurora effect.
- **Build pipeline**: Tailwind compiled to `src/assets/css/main.css` (ignored in git), Eleventy outputs to `_site/`.

## Project Structure (current)
```
.
├─ .eleventy.js
├─ tailwind.config.js
├─ postcss.config.js
├─ netlify.toml
├─ src/
│  ├─ _data/
│  │  ├─ site.json            # primary site metadata (title/description/url/etc)
│  │  ├─ global.json          # mirrors site metadata
│  │  ├─ navigation.js        # (currently empty; header CTAs are hardcoded)
│  │  ├─ users.json           # user records for profiles
│  │  └─ profiles.json        # profile records (referencing users)
│  ├─ _includes/
│  │  ├─ layouts/base.html
│  │  ├─ layouts/post.html
│  │  ├─ components/basehead.html
│  │  ├─ components/header.html
│  │  └─ components/footer.html
│  ├─ assets/
│  │  ├─ css/tailwind.css     # Tailwind source + custom layers
│  │  ├─ css/main.css         # built output (gitignored)
│  │  └─ images/              # logos, hero, placeholders
│  ├─ blog/                   # event entries (reuse blog collection)
│  │  ├─ post-1.md
│  │  └─ post-2.md
│  ├─ pages/
│  │  ├─ index.njk            # homepage
│  │  ├─ blog.html            # /events/
│  │  ├─ resources.html       # /resources/
│  │  ├─ contact.html         # /contact/
│  │  ├─ contact-thank-you.html
│  │  ├─ about.html
│  │  ├─ 404.html
│  │  ├─ robots.txt
│  │  └─ sitemap.xml.html
│  └─ profiles/
│     ├─ index.njk            # legacy list (mixed)
│     ├─ volunteers.njk       # /profiles/volunteers/
│     ├─ ngos.njk             # /profiles/ngos/
│     └─ profile.njk          # individual profiles
└─ package.json
```

## Running the Site
- Install deps: `npm install`
- Dev (serve + watch): `npm run dev` or `npm start`
- Build: `npm run build` (runs Tailwind build then Eleventy to `_site/`)
- CSS only: `npm run dev:css` (watch) or `npm run build:css`

## Content & Data
- **Metadata**: update `src/_data/site.json` (and optionally `global.json`) for title/description/url/twitter/image.
- **Profiles**: edit `src/_data/users.json` and `src/_data/profiles.json` (IDs align via `user_id`). Volunteer list filters `user_type == 1`; NGO list filters `user_type == 0`.
- **Events**: add/edit Markdown in `src/blog/` (collection reused for events). Each entry uses `layout: layouts/post.html`.
- **Resources**: edit `src/pages/resources.html`.
- **CTA labels/links**: header CTAs and hero buttons are in `header.html` and `index.njk`.
- **Footer**: social icons are displayed but intentionally disabled (no outbound links); Code Forged Digital credit links out.

## Styling Highlights
- Brand palette (navy/teal/sand) in `tailwind.config.js`.
- Custom utilities: gradient CTAs with 3D shadow, ghost/secondary buttons, animated `hero-aurora`, hero overlay gradient, card/search styles, badges.
- Hero image boosted brightness/saturation to reveal background; aurora animation layered above.

## Accessibility & Defaults
- Skip link, focus-visible friendly defaults.
- Lazy/async images via Markdown transform.
- External link hardening for `target="_blank"`.
- Typography: Inter loaded via Google Fonts.

## Build/Deploy Notes
- Output: `_site/` (gitignored).
- Tailwind output: `src/assets/css/main.css` (gitignored).
- Netlify config present; adjust if deploying elsewhere.

## TODO Ideas
- Add real social URLs and enable buttons when ready.
- Add event images/metadata and refine event template.
- Replace placeholder profile images and copy.
- Extend navigation data if you reintroduce nav links. 
