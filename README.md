# PSITS-CTU Main Website and Portal

Official website and student portal prototype for the **Philippine Society of Information Technology Students (PSITS)** at **Cebu Technological University – Main Campus**, under CCICT.

The project gives students a central place to learn about the organization, browse events and announcements, access resources, and submit a membership application. It also includes prototype administrative screens for managing portal content.

## Current status

This repository currently contains a frontend prototype. Pages use local mock data, form submissions are not persisted, and the admin area is not connected to production authentication or a backend. Do not use the admin routes to manage real data until role-based authentication and server-side authorization are implemented.

## Features

- Responsive public home and organization pages
- Officer and organization information
- Event listing and event detail pages
- Announcements feed
- Membership registration form interface
- Student resources and contact pages
- Prototype admin dashboard for events, announcements, and members
- Accessible navigation, skip links, reduced-motion support, and semantic page structure

## Tech stack

- React 18
- Vite 5
- React Router 6
- Tailwind CSS 3
- Lucide React
- Three.js

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <repository-url>
cd PSITS_CTU_Main
npm install
npm run dev
```

Open the local URL shown by Vite, typically `http://localhost:5173`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check:hero-framing` | Validate the home hero's responsive framing |
| `npm run check:hero-performance` | Validate static-fallback and mobile render profiles |
| `npm run check:officer-images` | Enforce WebP/AVIF officer portraits at 150 KB or less |

Before submitting changes, run:

```bash
npm run build
npm run check:hero-framing
npm run check:hero-performance
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Home |
| `/about` | Organization and officers |
| `/events` | Event listing |
| `/events/:id` | Event details |
| `/membership` | Membership registration |
| `/announcements` | Announcements feed |
| `/resources` | Student resources |
| `/contact` | Contact information |
| `/admin/login` | Prototype admin login |
| `/admin/*` | Prototype content-management screens |

## Project structure

```text
PSITS_CTU_Main/
├── public/                 # Static assets
├── scripts/                # Project validation scripts
├── src/
│   ├── components/         # Shared UI, layout, and feature components
│   ├── data/               # Temporary mock content
│   ├── pages/              # Public pages
│   │   └── admin/          # Prototype admin pages
│   ├── App.jsx             # Routes and shared page shell
│   ├── index.css           # Global and Tailwind styles
│   └── main.jsx            # React entry point
├── design.md               # Brand and interface design system
├── prd.md                  # Product requirements and roadmap
└── package.json
```

## Design and development guidelines

Read [`prd.md`](./prd.md) and [`design.md`](./design.md) before making significant feature or interface changes.

The visual system is centered on Tech Electric Blue (`#0066FF`), white, and Blue Mist (`#F1F6FF`). CTU Heritage Gold (`#F5B800`) is reserved for small accents, while Campus Blue (`#0B3B8F`) is used for selected high-contrast surfaces. New UI should remain responsive and accessible at 375 px, 768 px, and 1280 px or wider.

Keep components focused and readable, use semantic HTML, label form controls, provide image alt text, and never commit secrets or `.env` files. When a backend is added, validate input on both the client and server and enforce officer roles server-side for every admin operation.

## Data and backend integration

Temporary content lives in `src/data/mockData.js`. When connecting a backend:

1. Replace mock-data imports with a dedicated API or data-access layer.
2. Add secure authentication and role verification for officer/admin access.
3. Persist and validate membership submissions server-side.
4. Protect CRUD operations with server-side authorization; hiding UI controls is not sufficient.
5. Store credentials in environment variables and document required variable names without publishing their values.

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to a static host. The included `vercel.json` rewrites Vercel requests to `index.html`, allowing direct links such as `/events/1` to work with `BrowserRouter`. Other static hosts need an equivalent SPA fallback rule.

Officer portraits belong in `public/officers/`. Use a centered 4:5 WebP or AVIF image no larger than 150 KB, then set the matching officer's `avatar` path in `src/data/mockData.js` (for example, `/officers/juan-dela-cruz.webp`). Production builds validate these requirements automatically.

## Contributing

Keep changes within the scope and priorities defined in `prd.md`. Verify the production build, check relevant responsive breakpoints, and confirm keyboard navigation and color contrast before opening a pull request.
