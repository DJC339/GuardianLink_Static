# GuardianLink Static Site (Eleventy + Tailwind)

A modern, mobile-first static site that connects cyber volunteers with NGOs. Built on Eleventy 2.x with TailwindCSS and custom filters/utilities for profiles, events, and marketing pages. Refactored as a capstone project from the Coding for Veterans Secure Software Development Program.

## What’s Included
- **Eleventy** with Nunjucks templates and custom filters (`date`, `absoluteUrl`, `w3cDate`, `findUser`, `userTypeLabel`, `formatDate`, `where`, `filterByType`).
- **TailwindCSS** theme with brand palette, gradient CTAs, animated hero aurora, and custom buttons/cards.
- **Layouts & components**: base layout, head, header (CTA cluster with Home/Contact/Resources/Events), footer (social icons shown but disabled), post layout, reusable gradient + search header macro.
- **Pages**: home (`/`), events (`/events/` with calendar, upcoming, archive), resources (`/resources/` table), profiles split (volunteers `/profiles/volunteers/` with modal detail, NGOs `/profiles/ngos/` carousel), contact + thank-you, about, 404, sitemap, robots.
- **Profiles**: individual pages via `src/profiles/profile.njk` plus filtered lists; data in `_data/users.json` and `_data/profiles.json`.
- **Assets**: GuardianLink/Code Forged branding, social icons (non-clickable), hero imagery with aurora effect.
- **Build pipeline**: Tailwind compiled to `src/assets/css/main.css` (gitignored), Eleventy outputs to `_site/`.

## Project Structure
```
.
├─ .eleventy.js
├─ tailwind.config.js
├─ postcss.config.js
├─ netlify.toml
├─ src/
│  ├─ _data/
│  │  ├─ site.json            # primary site metadata
│  │  ├─ global.json          # mirrors site metadata
│  │  ├─ navigation.js        # currently empty; header CTAs are hardcoded
│  │  ├─ users.json           # user records for profiles
│  │  └─ profiles.json        # profile records (referencing users)
│  ├─ _includes/
│  │  ├─ layouts/base.html
│  │  ├─ layouts/post.html
│  │  ├─ components/basehead.html
│  │  ├─ components/header.html
│  │  ├─ components/footer.html
│  │  └─ components/gradient-search-header.njk
│  ├─ assets/
│  │  ├─ css/tailwind.css     # Tailwind source + custom layers
│  │  ├─ css/main.css         # built output (gitignored)
│  │  └─ images/              # logos, hero, placeholders
│  ├─ blog/                   # event entries (reusing blog collection)
│  │  ├─ post-1.md
│  │  ├─ post-2.md
│  │  └─ december-event.md    # sample current-month event
│  ├─ pages/
│  │  ├─ index.njk            # homepage
│  │  ├─ events.njk           # /events/ (calendar + lists)
│  │  ├─ resources.html       # /resources/
│  │  ├─ contact.html         # /contact/
│  │  ├─ contact-thank-you.html
│  │  ├─ about.html
│  │  ├─ 404.html
│  │  ├─ robots.txt
│  │  └─ sitemap.xml.html
│  └─ profiles/
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
- **Events**: add/edit Markdown in `src/blog/` (collection reused for events). Each entry uses `layout: layouts/post.html` and feeds the calendar/upcoming/archive on `/events/`.
- **Resources**: edit `src/pages/resources.html` (table rows).
- **CTA labels/links**: header CTAs and hero buttons are in `header.html` and `index.njk`.
- **Footer**: social icons are displayed but intentionally disabled; Code Forged Digital credit links out.

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
- Add event images/metadata for richer cards.
- Replace placeholder profile images and copy.
- Move header CTAs into `navigation.js` if you want data-driven nav.
