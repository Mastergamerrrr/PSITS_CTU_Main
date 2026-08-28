/**
 * mockData.js
 * Placeholder data for PSITS-CTU Main website.
 * Replace with Firestore queries when backend is wired up (Phase 2).
 */

// ── Events ──────────────────────────────────────────────────────────────────
export const events = [
  {
    id: '1',
    title: 'Code Clash: Web Dev Hackathon 2026',
    category: 'hackathon',
    date: '2026-09-15',
    endDate: '2026-09-16',
    time: '8:00 AM',
    venue: 'CCICT Building, Room 301',
    description:
      'A 24-hour hackathon challenging teams to build innovative web applications addressing real-world problems in education and healthcare. Open to all CCICT students. Teams of 3-5 members.',
    image: null,
    registrationOpen: true,
    registrationDeadline: '2026-09-10',
    maxParticipants: 80,
    tags: ['Web Dev', 'Team', 'Competition'],
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Python Bootcamp for Beginners',
    category: 'bootcamp',
    date: '2026-09-05',
    endDate: '2026-09-06',
    time: '9:00 AM - 5:00 PM',
    venue: 'CCICT Computer Lab 1',
    description:
      'Three-day intensive Python bootcamp covering fundamentals, data structures, OOP, and a mini-project. Certificate of completion will be issued to all participants who complete all sessions.',
    image: null,
    registrationOpen: true,
    registrationDeadline: '2026-09-02',
    maxParticipants: 40,
    tags: ['Python', 'Beginner', 'Certificate'],
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'IT Quiz Bowl: Intramural Eliminations',
    category: 'quiz',
    date: '2026-08-30',
    endDate: null,
    time: '1:00 PM',
    venue: 'CCICT AVR',
    description:
      'Intra-department quiz bowl covering networking, programming, data structures, and general IT trivia. Top 3 teams advance to the university-wide finals.',
    image: null,
    registrationOpen: false,
    registrationDeadline: null,
    maxParticipants: 60,
    tags: ['Quiz', 'Team', 'Competition'],
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'UI/UX Design Challenge 2026',
    category: 'design',
    date: '2026-07-28',
    endDate: null,
    time: '8:00 AM',
    venue: 'Online (Figma Workspace)',
    description:
      'Remote design competition where participants redesign a provided mobile app screen to improve usability and aesthetics. Judged by industry mentors from local tech companies.',
    image: null,
    registrationOpen: false,
    registrationDeadline: '2026-07-20',
    maxParticipants: 50,
    tags: ['Design', 'Figma', 'Remote'],
    status: 'past',
  },
  {
    id: '5',
    title: 'Tech Talk: AI in Healthcare',
    category: 'seminar',
    date: '2026-07-15',
    endDate: null,
    time: '2:00 PM - 4:00 PM',
    venue: 'CCICT AVR & Online',
    description:
      'Guest lecture by industry professionals on the intersection of artificial intelligence and healthcare, covering diagnostics, medical imaging, and ethical considerations.',
    image: null,
    registrationOpen: false,
    registrationDeadline: null,
    maxParticipants: 120,
    tags: ['AI', 'Healthcare', 'Seminar'],
    status: 'past',
  },
  {
    id: '6',
    title: 'PSITS General Assembly & Org Night',
    category: 'social',
    date: '2026-07-05',
    endDate: null,
    time: '5:00 PM',
    venue: 'CTU Main Grounds',
    description:
      'Annual general assembly and org night featuring presentations of the org roadmap, officer introductions, games, food, and community building for all CCICT students.',
    image: null,
    registrationOpen: false,
    registrationDeadline: null,
    maxParticipants: 200,
    tags: ['Social', 'Community'],
    status: 'past',
  },
];

// ── Announcements ────────────────────────────────────────────────────────────
export const announcements = [
  {
    id: 'a1',
    title: 'Code Clash registration is open',
    content:
      'Registration for Code Clash: Web Dev Hackathon 2026 is open. Form teams of 3-5 members and register before September 10. Slots are limited, so secure yours through the Events page.',
    date: '2026-08-25',
    pinned: true,
    category: 'events',
  },
  {
    id: 'a2',
    title: 'PSITS Represents CTU at Regional IT Summit',
    content:
      'Five PSITS members represented CTU Main at the Regional IT Summit held in Cebu City last July 20-21. They joined the hackathon track and placed 2nd overall.',
    date: '2026-07-22',
    pinned: true,
    category: 'achievement',
  },
  {
    id: 'a3',
    title: 'Python Bootcamp: Final Reminder',
    content:
      'Only 10 slots remain for the Python Bootcamp for Beginners (Aug 20-22). Registration closes on August 15. Submit your form through the Events page.',
    date: '2026-08-26',
    pinned: false,
    category: 'events',
  },
  {
    id: 'a4',
    title: 'UI/UX Challenge Results',
    content:
      '1st Place: Maria Santos (BSIT-3A), 2nd Place: Juan dela Cruz (BSCS-2B), 3rd Place: Ana Reyes (BSIT-2C). Certificates will be released this week.',
    date: '2026-07-30',
    pinned: false,
    category: 'results',
  },
  {
    id: 'a5',
    title: 'Membership Drive for S.Y. 2026-2027',
    content:
      'PSITS membership registration for the new school year is now open. Submit your membership form on this portal. Annual membership fee collection will be announced separately.',
    date: '2026-08-18',
    pinned: false,
    category: 'membership',
  },
];

// ── Officers ─────────────────────────────────────────────────────────────────
export const officers = [
  { id: 'o1',  name: 'Alex M. Reyes',          position: 'President',                    year: '4th Year BSIT', avatar: null },
  { id: 'o2',  name: 'Bianca T. Santos',        position: 'Vice President, Internal',    year: '4th Year BSCS', avatar: null },
  { id: 'o3',  name: 'Carlo J. Mendoza',        position: 'Vice President, External',    year: '3rd Year BSIT', avatar: null },
  { id: 'o4',  name: 'Diana R. Cruz',           position: 'Secretary',                    year: '3rd Year BSIT', avatar: null },
  { id: 'o5',  name: 'Emil A. Torres',          position: 'Treasurer',                    year: '3rd Year BSCS', avatar: null },
  { id: 'o6',  name: 'Faith G. Lim',            position: 'Auditor',                      year: '2nd Year BSIT', avatar: null },
  { id: 'o7',  name: 'Gerard P. Bautista',      position: 'P.R.O.',                       year: '3rd Year BSIT', avatar: null },
  { id: 'o8',  name: 'Hannah N. Garcia',        position: 'Business Manager',             year: '3rd Year BSCS', avatar: null },
  { id: 'o9',  name: 'Ivan C. Villanueva',      position: 'Technical Director',           year: '4th Year BSIT', avatar: null },
  { id: 'o10', name: 'Julia M. Delos Reyes',    position: 'Events Coordinator',           year: '2nd Year BSIT', avatar: null },
  { id: 'o11', name: 'Kenneth L. Aquino',       position: 'Historian / Documentarian',    year: '2nd Year BSCS', avatar: null },
  { id: 'o12', name: 'Lovely Anne B. Flores',   position: 'Muse',                         year: '3rd Year BSIT', avatar: null },
];

// ── GitHub Projects ───────────────────────────────────────────────────────────
export const githubProjects = [
  {
    id: 'g1',
    name: 'psits-ctu-main-web',
    description: 'Official PSITS-CTU Main website and portal built with React, Vite, and Tailwind.',
    url: 'https://github.com/psits-ctu-main/psits-ctu-main-web',
    stars: 12,
    language: 'JavaScript',
  },
  {
    id: 'g2',
    name: 'ctudebug-judge',
    description: 'Online judge and playground for CTU debugging challenges with a Node.js backend.',
    url: 'https://github.com/psits-ctu-main/ctudebug-judge',
    stars: 8,
    language: 'JavaScript',
  },
  {
    id: 'g3',
    name: 'ctu-schedule-helper',
    description: 'Auto-schedule maker CLI tool built during the IT Day hackathon.',
    url: 'https://github.com/psits-ctu-main/ctu-schedule-helper',
    stars: 5,
    language: 'Python',
  },
];

export const workshopMaterials = [
  {
    id: 'w1',
    title: 'Python Bootcamp 2026: Slides and Exercises',
    description: 'All slides, code examples, and exercises from the 3-day Python Bootcamp.',
    url: '#',
    type: 'slides',
    date: '2026-09-06',
  },
  {
    id: 'w2',
    title: 'UI/UX Design Challenge: Figma Resources',
    description: 'Design brief, component library, and judging rubric from the 2025 Design Challenge.',
    url: '#',
    type: 'figma',
    date: '2026-07-28',
  },
  {
    id: 'w3',
    title: 'Tech Talk: AI in Healthcare Recording and Deck',
    description: 'Full session recording and presenter slides from the AI in Healthcare tech talk.',
    url: '#',
    type: 'recording',
    date: '2026-07-15',
  },
];

// ── Org Stats ─────────────────────────────────────────────────────────────────
export const orgStats = [
  { label: 'Active Members',  value: '320+' },
  { label: 'Events This Year',value: '18'   },
  { label: 'Competitions',    value: '9'    },
  { label: 'Years Active',    value: '12'   },
];
