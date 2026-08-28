import { CalendarDays, Users, Megaphone, TrendingUp } from 'lucide-react';
import { events, announcements } from '../../data/mockData';

const statCards = [
  {
    label: 'Total Events',
    value: events.length,
    icon: CalendarDays,
    color: 'text-primary',
    bg: 'bg-blue-50',
  },
  {
    label: 'Upcoming Events',
    value: events.filter((e) => e.status === 'upcoming').length,
    icon: TrendingUp,
    color: 'text-primary',
    bg: 'bg-blue-50',
  },
  {
    label: 'Announcements',
    value: announcements.length,
    icon: Megaphone,
    color: 'text-primary',
    bg: 'bg-blue-50',
  },
  {
    label: 'Registered Members',
    value: '320+',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-secondary/20',
  },
];

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <div className="mb-8">
        <h1 className="text-4xl">Dashboard</h1>
        <p className="text-text-muted mt-1">Overview of PSITS-CTU Main portal activity.</p>
      </div>

      {/* Stub notice */}
      <div className="mb-8 rounded-[1.5rem] bg-white px-5 py-4 text-sm text-text-body">
        <strong>Phase 2 notice:</strong> Authentication and live Firestore data will be wired
        in the next phase. Data shown here uses mock data.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-[1.5rem] bg-white p-5"
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${bg}`}>
              <Icon size={22} className={color} />
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-text-primary">{value}</p>
              <p className="text-xs text-text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent events table */}
      <div className="overflow-hidden rounded-[1.5rem] bg-white">
        <div className="border-b border-primary-neutral/60 px-5 py-4">
          <h2 className="text-2xl">Recent events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-light">
              <tr>
                {['Event', 'Date', 'Status', 'Category'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 font-semibold text-text-muted uppercase text-xs tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {events.slice(0, 5).map((event) => (
                <tr key={event.id} className="hover:bg-bg-light transition-colors">
                  <td className="px-5 py-3 font-medium text-text-primary max-w-xs truncate">
                    {event.title}
                  </td>
                  <td className="px-5 py-3 text-text-muted whitespace-nowrap">{event.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={[
                        'rounded-full border px-3 py-1 text-xs font-medium capitalize',
                        event.status === 'upcoming'
                          ? 'text-primary border-primary bg-blue-50'
                          : 'text-text-muted border-border-light',
                      ].join(' ')}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 capitalize text-text-muted">{event.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
