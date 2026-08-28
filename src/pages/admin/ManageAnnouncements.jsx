import { useState } from 'react';
import { Plus, Pencil, Trash2, Pin, AlertCircle } from 'lucide-react';
import { announcements as initialAnnouncements } from '../../data/mockData';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function ManageAnnouncements() {
  const [list, setList] = useState(initialAnnouncements);

  function handleDelete(id) {
    if (window.confirm('Delete this announcement?')) {
      setList((prev) => prev.filter((a) => a.id !== id));
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl">Manage announcements</h1>
          <p className="text-text-muted mt-1">Post, edit, and remove announcements.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> New Announcement
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-[1.5rem] bg-white px-5 py-4 text-sm text-text-body">
        <AlertCircle size={16} className="flex-shrink-0" />
        Create/Edit forms and Firestore persistence will be added in Phase 2.
      </div>

      <div className="flex flex-col gap-4">
        {list.map((ann) => (
          <div
            key={ann.id}
            className={[
              'flex items-start gap-4 rounded-[1.5rem] bg-white p-5',
              ann.pinned ? 'border border-secondary' : '',
            ].join(' ')}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {ann.pinned && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-secondary bg-secondary/15 px-3 py-1 text-xs font-semibold text-text-primary">
                    <Pin size={10} /> Pinned
                  </span>
                )}
                <Badge category={ann.category} />
                <span className="text-xs text-text-muted">{ann.date}</span>
              </div>
              <p className="font-bold text-text-primary">{ann.title}</p>
              <p className="text-text-muted text-sm mt-1 line-clamp-2">{ann.content}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                className="grid h-10 w-10 place-items-center rounded-full text-text-muted hover:bg-bg-light hover:text-primary"
                aria-label="Edit announcement"
                title="Edit (Phase 2)"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => handleDelete(ann.id)}
                className="grid h-10 w-10 place-items-center rounded-full text-text-muted hover:bg-red-50 hover:text-red-600"
                aria-label="Delete announcement"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center py-12 text-text-muted">No announcements yet.</p>
        )}
      </div>
    </div>
  );
}
