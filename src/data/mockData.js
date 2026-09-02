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
    image: '/events/hackathon-campus.jpg',
    featured: true,
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
    image: '/events/workshop-learning.jpg',
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
    image: '/events/quiz-bowl-campus.jpg',
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
    image: '/events/workshop-learning.jpg',
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
    image: '/events/workshop-learning.jpg',
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
    image: '/events/hackathon-campus.jpg',
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
// Names, academic details, and portrait paths are intentionally blank until
// the official S.Y. 2026-2027 roster is supplied.
export const officerGroups = [
  {
    id: 'executives',
    label: 'Executives',
    description: 'The officers responsible for chapter direction, governance, operations, and accountability.',
    members: [
      { id: 'exec-01', name: null, position: 'President', year: null, avatar: null, summary: 'Leads the chapter, sets its direction, and coordinates the executive council.' },
      { id: 'exec-02', name: null, position: 'Internal Vice-President', year: null, avatar: null, summary: 'Oversees internal operations, member coordination, and chapter programs.' },
      { id: 'exec-03', name: null, position: 'External Vice-President', year: null, avatar: null, summary: 'Builds partnerships and represents the chapter in external engagements.' },
      { id: 'exec-04', name: null, position: 'General Secretary', year: null, avatar: null, summary: 'Maintains official records, correspondence, minutes, and organizational documents.' },
      { id: 'exec-05', name: null, position: 'Treasurer', year: null, avatar: null, summary: 'Manages budgets, financial records, and the responsible use of chapter funds.' },
      { id: 'exec-06', name: null, position: 'Auditor', year: null, avatar: null, summary: 'Reviews financial activity and helps keep chapter resources transparent and accountable.' },
      { id: 'exec-07', name: null, position: 'Communication Officer', year: null, avatar: null, summary: 'Coordinates official announcements and keeps members informed across channels.' },
      { id: 'exec-08', name: null, position: 'Logistics Officer', year: null, avatar: null, summary: 'Prepares venues, equipment, materials, and operational requirements for activities.' },
      { id: 'exec-09', name: null, position: 'Logistics Officer', year: null, avatar: null, summary: 'Prepares venues, equipment, materials, and operational requirements for activities.' },
      { id: 'exec-10', name: null, position: 'Logistics Officer', year: null, avatar: null, summary: 'Prepares venues, equipment, materials, and operational requirements for activities.' },
      { id: 'exec-11', name: null, position: 'Logistics Officer', year: null, avatar: null, summary: 'Prepares venues, equipment, materials, and operational requirements for activities.' },
      { id: 'exec-12', name: null, position: 'Site Administrator', year: null, avatar: null, summary: 'Maintains the chapter website and supports accurate, timely portal content.' },
      { id: 'exec-13', name: null, position: 'Site Administrator', year: null, avatar: null, summary: 'Maintains the chapter website and supports accurate, timely portal content.' },
    ],
  },
  {
    id: 'committees',
    label: 'Committees',
    description: 'The creative, technical, documentation, and events teams that turn chapter plans into student experiences.',
    members: [
      { id: 'committee-01', name: null, position: 'Secretariat', year: null, avatar: null, summary: 'Supports documentation, attendance, records, and administrative coordination.' },
      { id: 'committee-02', name: null, position: 'Media and Technology Director', year: null, avatar: null, summary: 'Directs the chapter’s media systems, digital platforms, and technology initiatives.' },
      { id: 'committee-03', name: null, position: 'Graphics and Designs', year: null, avatar: null, summary: 'Creates clear, consistent visuals for chapter programs, campaigns, and announcements.' },
      { id: 'committee-04', name: null, position: 'Graphics and Designs', year: null, avatar: null, summary: 'Creates clear, consistent visuals for chapter programs, campaigns, and announcements.' },
      { id: 'committee-05', name: null, position: 'Graphics and Designs', year: null, avatar: null, summary: 'Creates clear, consistent visuals for chapter programs, campaigns, and announcements.' },
      { id: 'committee-06', name: null, position: 'Graphics and Designs', year: null, avatar: null, summary: 'Creates clear, consistent visuals for chapter programs, campaigns, and announcements.' },
      { id: 'committee-07', name: null, position: 'Photography and Videography', year: null, avatar: null, summary: 'Documents chapter activities through thoughtful event photography and video.' },
      { id: 'committee-08', name: null, position: 'Photography and Videography', year: null, avatar: null, summary: 'Documents chapter activities through thoughtful event photography and video.' },
      { id: 'committee-09', name: null, position: 'Event Director', year: null, avatar: null, summary: 'Leads event planning and coordinates teams from preparation through completion.' },
      { id: 'committee-10', name: null, position: 'Event Officer', year: null, avatar: null, summary: 'Supports event planning, participant coordination, and on-site program delivery.' },
      { id: 'committee-11', name: null, position: 'Event Officer', year: null, avatar: null, summary: 'Supports event planning, participant coordination, and on-site program delivery.' },
      { id: 'committee-12', name: null, position: 'Technical Support Director', year: null, avatar: null, summary: 'Directs technical preparation and support for chapter programs and platforms.' },
      { id: 'committee-13', name: "Jian Kris D. Laborte", position: 'Technical Support Officer', year: "3rd Year BSIT", avatar: "/officers/Jian1.webp", summary: 'Provides equipment, software, and troubleshooting support during chapter activities.' },
      { id: 'committee-14', name: null, position: 'Technical Support Officer', year: null, avatar: null, summary: 'Provides equipment, software, and troubleshooting support during chapter activities.' },
    ],
  },
  {
    id: 'representatives',
    label: 'Representatives',
    description: 'The student voices connecting each year level and schedule with the wider PSITS community.',
    members: [
      { id: 'representative-01', name: null, position: '1st Year Representative (Day)', year: null, avatar: null, summary: 'Represents first-year day students and brings their concerns and ideas to the council.' },
      { id: 'representative-02', name: null, position: '1st Year Representative (Night)', year: null, avatar: null, summary: 'Represents first-year night students and brings their concerns and ideas to the council.' },
      { id: 'representative-03', name: null, position: '2nd Year Representative (Day)', year: null, avatar: null, summary: 'Represents second-year day students and keeps their cohort connected to chapter programs.' },
      { id: 'representative-04', name: null, position: '2nd Year Representative (Night)', year: null, avatar: null, summary: 'Represents second-year night students and keeps their cohort connected to chapter programs.' },
      { id: 'representative-05', name: null, position: '3rd Year Representative (Day)', year: null, avatar: null, summary: 'Represents third-year day students and communicates opportunities, feedback, and concerns.' },
      { id: 'representative-06', name: null, position: '4th Year Representative (Day)', year: null, avatar: null, summary: 'Represents fourth-year day students and communicates opportunities, feedback, and concerns.' },
      { id: 'representative-07', name: null, position: "Representatives' Director", year: null, avatar: null, summary: 'Coordinates the year-level representatives and brings their shared priorities to the council.' },
    ],
  },
];

export const officers = officerGroups.flatMap(({ id: group, members }) => (
  members.map((member) => ({
    ...member,
    group,
  }))
));

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
