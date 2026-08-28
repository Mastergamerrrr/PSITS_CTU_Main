# Product Requirements Document (PRD)
## PSITS-CTU Main Website / Student Portal

**Organization:** Philippine Society of Information Technology Students – Cebu Technological University Main Campus (PSITS-CTU Main)  
**Department:** College of Computer, Information and Communications Technology (CCICT)

## 1. Purpose & Background

PSITS-CTU Main is the official co-curricular organization representing computing and IT students at CTU Main. It serves as a bridge between students, university administration, and the local IT industry, promoting technical excellence, social responsibility, ethics, and research in IT.

This document defines requirements for an official website/portal that showcases the organization, its activities, and provides member-facing tools.

## 2. Goals & Objectives

- Establish a professional, modern online presence reflecting both CTU branding and a tech-forward identity.
- Centralize information on events, competitions, and workshops.
- Provide a channel for student registration/membership and communication.
- Support the org's mission: technical excellence, social responsibility, ethical development, and IT research.
- Serve as a bridge point for industry partners, alumni, and university administration.

### Success Metrics

- % of CCICT students registered/active on the portal
- Event sign-up conversion rate
- Number of workshops/hackathons published and tracked per semester
- Reduction in manual (paper/Facebook-only) event coordination

## 3. Target Users / Personas

| Persona | Needs |
|---|---|
| **IT/CS Student (Member)** | View events, register for workshops/competitions, access resources, see announcements |
| **PSITS Officer/Admin** | Post announcements, manage event registrations, manage member directory, publish results |
| **Prospective Member** | Learn about PSITS, join the org, see past activities |
| **Industry Partner / Guest Speaker** | View org profile, past collaborations, contact channel |
| **University Administration** | Oversight of activities, verify org legitimacy/reports |

## 4. Scope

### 4.1 In Scope (Core Features — MVP)

1. **Home / Landing Page**
   - Hero section (mission statement, tagline)
   - Highlights of upcoming events
   - Core pillars (Skills & Development, Competitions, Community & Networking)
2. **About Page**
   - Org identity, mission, vision
   - Officer roster / org chart
   - CCICT / CTU affiliation info
3. **Events & Activities**
   - Listing of coding bootcamps, workshops, hackathons, debugging challenges, design contests, IT Quiz Bowls, IT Days
   - Event detail pages (schedule, venue, registration link/form)
   - Past events gallery/archive
4. **Membership**
   - Membership registration form
   - Member directory (admin-facing)
   - Digital membership ID / confirmation (stretch goal)
5. **Announcements / News Feed**
   - Org updates, results of competitions, regional tech summit representation news
6. **Resources**
   - Links to GitHub org/open-source project collaborations
   - Workshop materials/slides archive
7. **Contact / Social Links**
   - Contact form, social media links (Facebook, GitHub, etc.)
8. **Admin Panel (Officer-only)**
   - CRUD for events, announcements, and members
   - Basic role-based access (Admin/Officer vs. Member vs. Guest)

### 4.2 Out of Scope (for MVP)

- Payment processing (e.g., paid membership dues) — may be phase 2
- Full LMS-style course content delivery
- Mobile native app (web-responsive only for MVP)
- Deep integration with university's official SIS/enrollment system

## 5. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Users can view all published events without logging in | Must |
| FR-2 | Users can register for an event via a form | Must |
| FR-3 | Officers can create/edit/delete events and announcements | Must |
| FR-4 | Users can submit a membership application | Must |
| FR-5 | System sends confirmation (email or on-screen) after registration | Should |
| FR-6 | Officers can view a dashboard of registrants per event | Should |
| FR-7 | Public GitHub project links are displayed on Resources page | Should |
| FR-8 | Site supports light/dark mode toggle | Could |
| FR-9 | Officers can tag events by category (bootcamp, hackathon, seminar, social) | Should |
| FR-10 | Search/filter events by category or date | Could |

## 6. Non-Functional Requirements

- **Branding:** Follow the PSITS-CTU Main design system in `design.md`, with white and electric blue as the dominant website palette and CTU gold reserved for small heritage accents.
- **Responsiveness:** Fully responsive across mobile, tablet, desktop.
- **Performance:** Initial page load under 3 seconds on typical campus wifi/mobile data.
- **Accessibility:** WCAG 2.1 AA where feasible (contrast, keyboard nav, alt text).
- **Security:** Basic auth for officer/admin accounts; input validation/sanitization on all forms.
- **Maintainability:** Codebase should be simple enough for successive student officer teams (annual turnover) to maintain.
- **Hosting cost:** Prefer low/no-cost hosting suitable for a student org budget (e.g., static hosting + serverless backend, or free-tier DB).

## 7. Information Architecture (Sitemap)

```text
Home
├── About
│   ├── Mission & Vision
│   └── Officers
├── Events
│   ├── Upcoming
│   ├── Past / Archive
│   └── [Event Detail Page]
├── Membership
│   └── Join Form
├── Resources
│   └── GitHub / Workshop Materials
├── Announcements
├── Contact
└── Admin (auth-gated)
    ├── Manage Events
    ├── Manage Announcements
    └── Manage Members
```

## 8. Assumptions & Constraints

- Assumes a small volunteer/student dev team maintains the site; simplicity over complexity is preferred.
- Assumes no dedicated backend infra budget — lightweight stack recommended (e.g., static site generator + headless CMS, or a simple full-stack framework with free-tier hosting).
- Content (event details, officer names) will be provided/updated by PSITS officers, not developers.
- Design must align with `design.md` (color palette, typography, components, spacing, accessibility).

## 9. Open Questions

- Will membership have paid dues requiring payment integration in a later phase?
- Should the portal integrate with existing PSITS national chapter systems/branding guidelines?
- Is single sign-on (e.g., university email domain) required for member registration?
- Who owns long-term hosting/domain costs across officer term transitions?

## 10. Milestones (Suggested)

| Phase | Deliverable |
|---|---|
| Phase 1 | Static site: Home, About, Events (read-only), Contact |
| Phase 2 | Membership form + Announcements + basic Admin CRUD |
| Phase 3 | Event registration workflow + registrant dashboard |
| Phase 4 (stretch) | Dark/light mode, search/filter, digital member ID |

*Related documents: `design.md` (visual design system), `agents.md` (AI coding agent guidelines for this repo).*
