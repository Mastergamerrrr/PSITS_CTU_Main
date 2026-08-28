import { useState } from 'react';
import { Search, Download, AlertCircle } from 'lucide-react';

// Mock registered members. These will come from Firestore in Phase 2.
const MOCK_MEMBERS = [
  { id: 'm1', name: 'Maria Santos',   studentId: '22-1234-00001', course: 'BSIT', year: '3rd Year', email: 'maria@ctu.edu.ph',   dateRegistered: '2025-07-18' },
  { id: 'm2', name: 'Juan dela Cruz', studentId: '22-1234-00002', course: 'BSCS', year: '2nd Year', email: 'juan@ctu.edu.ph',    dateRegistered: '2025-07-19' },
  { id: 'm3', name: 'Ana Reyes',      studentId: '22-1234-00003', course: 'BSIT', year: '2nd Year', email: 'ana@ctu.edu.ph',     dateRegistered: '2025-07-20' },
  { id: 'm4', name: 'Carlo Mendoza',  studentId: '22-1234-00004', course: 'BSIT', year: '4th Year', email: 'carlo@ctu.edu.ph',   dateRegistered: '2025-07-22' },
  { id: 'm5', name: 'Bianca Torres',  studentId: '22-1234-00005', course: 'BSCS', year: '3rd Year', email: 'bianca@ctu.edu.ph',  dateRegistered: '2025-07-25' },
  { id: 'm6', name: 'Ryan Castillo',  studentId: '22-1234-00006', course: 'BSIT', year: '1st Year', email: 'ryan@ctu.edu.ph',    dateRegistered: '2025-07-26' },
  { id: 'm7', name: 'Celine Aquino',  studentId: '22-1234-00007', course: 'BSIS', year: '2nd Year', email: 'celine@ctu.edu.ph',  dateRegistered: '2025-07-28' },
];

export default function ManageMembers() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.studentId.includes(search) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl">Manage members</h1>
          <p className="text-text-muted mt-1">View and manage membership applications.</p>
        </div>
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-[1.5rem] border border-primary-neutral bg-white px-5 py-2 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary"
          title="Export CSV (Phase 2)"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-[1.5rem] bg-white px-5 py-4 text-sm text-text-body">
        <AlertCircle size={16} className="flex-shrink-0" />
        Showing mock data. Firestore member collection and CSV export will be integrated in Phase 2.
      </div>

      {/* Search */}
      <div className="mb-5 relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          placeholder="Search by name, ID, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-h-11 w-full rounded-[1.5rem] border border-primary-neutral py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-light">
              <tr>
                {['Name', 'Student ID', 'Course', 'Year', 'Email', 'Registered'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 font-semibold text-text-muted uppercase text-xs tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-text-muted">
                    No members match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-5 py-3 font-medium text-text-primary">{m.name}</td>
                    <td className="px-5 py-3 text-text-muted font-mono text-xs">{m.studentId}</td>
                    <td className="px-5 py-3 text-text-muted">{m.course}</td>
                    <td className="px-5 py-3 text-text-muted">{m.year}</td>
                    <td className="px-5 py-3 text-text-muted">{m.email}</td>
                    <td className="px-5 py-3 text-text-muted">{m.dateRegistered}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border-light bg-bg-light text-xs text-text-muted">
          Showing {filtered.length} of {MOCK_MEMBERS.length} members
        </div>
      </div>
    </div>
  );
}
