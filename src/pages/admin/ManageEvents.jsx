import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { events as initialEvents } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function ManageEvents() {
  // Local state mirrors mockData. Firestore will replace this in Phase 2.
  const [eventList, setEventList] = useState(initialEvents);

  function handleDelete(id) {
    if (window.confirm('Delete this event? This action cannot be undone.')) {
      setEventList((prev) => prev.filter((e) => e.id !== id));
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl">Manage events</h1>
          <p className="text-text-muted mt-1">Create, edit, and remove events.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> New Event
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-[1.5rem] bg-white px-5 py-4 text-sm text-text-body">
        <AlertCircle size={16} className="flex-shrink-0" />
        Create/Edit forms and Firestore persistence will be added in Phase 2.
        Delete works locally (resets on page refresh).
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-light">
              <tr>
                {['Title', 'Date', 'Category', 'Status', 'Reg. Open', 'Actions'].map((h) => (
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
              {eventList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-text-muted">
                    No events found.
                  </td>
                </tr>
              ) : (
                eventList.map((event) => (
                  <tr key={event.id} className="hover:bg-bg-light transition-colors">
                    <td className="px-5 py-3 font-medium text-text-primary max-w-xs">
                      <div className="truncate">{event.title}</div>
                    </td>
                    <td className="px-5 py-3 text-text-muted whitespace-nowrap">{event.date}</td>
                    <td className="px-5 py-3"><Badge category={event.category} /></td>
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
                    <td className="px-5 py-3">
                      <span className={event.registrationOpen ? 'text-primary font-medium text-xs' : 'text-text-muted text-xs'}>
                        {event.registrationOpen ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="grid h-10 w-10 place-items-center rounded-full text-text-muted hover:bg-bg-light hover:text-primary"
                          aria-label="Edit event"
                          title="Edit (Phase 2)"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="grid h-10 w-10 place-items-center rounded-full text-text-muted hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete event"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border-light bg-bg-light text-xs text-text-muted">
          {eventList.length} event{eventList.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
