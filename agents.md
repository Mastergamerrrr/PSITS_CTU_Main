# AGENTS.md — PSITS-CTU Main Website/Portal

This file gives AI coding agents the context needed to work correctly and consistently on this repository.

## 1. Project Summary

Official website/portal for **PSITS-CTU Main** (Philippine Society of Information Technology Students – Cebu Technological University Main Campus), under CCICT. See `prd.md` for full requirements and `design.md` for the visual design system. Agents should read both before making significant UI or feature changes.

## 2. Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS 3
- **Routing:** React Router
- **Icons:** Lucide React
- **Backend:** Not connected; current form/admin interactions are interface prototypes
- **Hosting:** Static hosting suitable for a student organization budget

## 3. Design & Branding Rules

All UI work must follow `design.md`. Key rules:

- **Primary color:** Tech Electric Blue `#0066FF` — navigation, primary buttons, active states
- **Dominant surfaces:** White `#FFFFFF` and Blue Mist `#F1F6FF`
- **Secondary accent:** CTU Heritage Gold `#F5B800` — small heritage/award details only
- **Strong blue surface:** Campus Blue `#0B3B8F` — footer and selected high-contrast moments
- **Primary text:** Midnight Navy `#14213D`
- **Muted text/borders:** Slate Gray `#64748B`

Do not introduce new brand colors without explicit approval. White and blue should remain visually dominant; avoid large black, charcoal, or gold sections.

## 4. Coding Conventions

- Prefer clear, readable code over cleverness — future maintainers will be rotating student volunteers.
- Comment non-obvious logic, especially auth/permissions and form validation.
- Keep components small and single-purpose.
- Use semantic HTML and accessible markup (labels on inputs, alt text on images, proper heading hierarchy).
- File/folder naming: `kebab-case` for files, `PascalCase` for React components.
- No hardcoded secrets/API keys in source — use environment variables.

## 5. Feature Priorities

Follow the priority order in `prd.md` §5 and §10. Do not build out-of-scope items unless explicitly requested.

Core MVP surfaces:

1. Home page
2. About / Officers page
3. Events listing + event detail pages
4. Membership registration form
5. Announcements feed
6. Admin CRUD (officer-only, auth-gated when a backend is added)

## 6. Roles & Permissions Model

| Role | Access |
|---|---|
| Guest / Public | View home, about, events, announcements; submit membership form |
| Member | Optional phase 2+ access to member-only resources |
| Officer/Admin | Full CRUD on events, announcements, members; view registrant dashboards |

Gate production admin routes/components behind auth checks and never expose admin CRUD endpoints without verifying role.

## 7. Testing & Validation Expectations

- Validate all form inputs client- and server-side when a backend is connected.
- Test responsive layouts at mobile (375px), tablet (768px), and desktop (1280px+) breakpoints.
- Verify color contrast against `design.md` accessibility notes.
- When adding new pages, update the sitemap in `prd.md` §7 if the information architecture changes.

## 8. What Not to Do

- Do not add payment/dues processing.
- Do not build a native mobile app.
- Do not integrate with the university SIS unless explicitly instructed.
- Do not let gold or near-black dominate the interface.
- Do not commit secrets, API keys, or `.env` files.

## 9. Related Files

- `prd.md` — product requirements, scope, personas, roadmap
- `design.md` — visual design system, components, spacing, accessibility
