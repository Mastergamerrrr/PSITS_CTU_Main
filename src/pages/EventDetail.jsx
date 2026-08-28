import { useParams, Link } from 'react-router-dom';
import {
  Calendar, MapPin, Users, Clock, ArrowLeft, AlertCircle,
} from 'lucide-react';
import { events } from '../data/mockData';
import Badge from '../components/ui/Badge';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

function formatShort(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle size={48} className="text-text-muted" />
        <h1 className="text-3xl text-text-primary">Event not found</h1>
        <p className="text-text-muted">This event doesn't exist or may have been removed.</p>
        <Link
          to="/events"
          className="text-primary hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-light">

      {/* Header */}
      <section className="page-wash py-16 sm:py-20">
        <div className="content-shell">
          <Link
            to="/events"
            className="mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            <ArrowLeft size={14} /> All Events
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge category={event.category} />
            {event.status === 'upcoming' && event.registrationOpen && (
              <span className="rounded-full border border-secondary bg-secondary/15 px-3 py-1 text-xs font-semibold text-text-primary">
                Registration open
              </span>
            )}
            {event.status === 'past' && (
              <span className="rounded-full border border-primary-neutral bg-white px-3 py-1 text-xs font-medium text-text-muted">
                Past event
              </span>
            )}
          </div>

          <h1 className="display-title mb-6 max-w-4xl text-[clamp(2.8rem,7vw,5rem)]">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-text-muted text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-primary" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              <span>{event.venue}</span>
            </div>
            {event.maxParticipants && (
              <div className="flex items-center gap-2">
                <Users size={15} className="text-primary" />
                <span>Max {event.maxParticipants} participants</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="content-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_21rem]">

          {/* Main content */}
          <div className="flex-1">
            <h2 className="mb-4 text-3xl">About this event</h2>
            <p className="mb-6 max-w-3xl leading-8 text-text-body">{event.description}</p>

            {event.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-sm text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Event at a glance */}
            <div className="rounded-[1.5rem] bg-white p-6 sm:p-8">
              <h3 className="mb-6 text-2xl">Event details</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-text-muted mb-0.5">Date</dt>
                  <dd className="font-medium text-text-primary">{formatDate(event.date)}</dd>
                </div>
                {event.endDate && event.endDate !== event.date && (
                  <div>
                    <dt className="text-text-muted mb-0.5">End Date</dt>
                    <dd className="font-medium text-text-primary">{formatDate(event.endDate)}</dd>
                  </div>
                )}
                {event.time && (
                  <div>
                    <dt className="text-text-muted mb-0.5">Time</dt>
                    <dd className="font-medium text-text-primary">{event.time}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-text-muted mb-0.5">Venue</dt>
                  <dd className="font-medium text-text-primary">{event.venue}</dd>
                </div>
                {event.maxParticipants && (
                  <div>
                    <dt className="text-text-muted mb-0.5">Capacity</dt>
                    <dd className="font-medium text-text-primary">{event.maxParticipants} participants</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-28 rounded-[1.5rem] bg-white p-6 sm:p-7">
              <h3 className="mb-5 text-2xl">Registration</h3>

              {event.status === 'upcoming' ? (
                event.registrationOpen ? (
                  <>
                    {event.registrationDeadline && (
                      <p className="text-xs text-text-muted mb-4">
                        Deadline:{' '}
                        <strong className="text-text-primary">
                          {formatShort(event.registrationDeadline)}
                        </strong>
                      </p>
                    )}
                    <Link
                      to="/membership"
                      className="interactive-lift block w-full rounded-[1.5rem] bg-primary px-5 py-3 text-center font-semibold text-white hover:bg-primary-hover"
                    >
                      Register Now
                    </Link>
                    <p className="text-xs text-text-muted text-center mt-3">
                      You must be a PSITS member to register.
                    </p>
                  </>
                ) : (
                  <div className="rounded-xl bg-bg-light p-4 text-center">
                    <p className="text-text-muted text-sm">
                      Registration is not yet open for this event.
                    </p>
                  </div>
                )
              ) : (
                <div className="rounded-xl bg-bg-light p-4 text-center">
                  <p className="text-text-muted text-sm">This event has already concluded.</p>
                </div>
              )}

              <div className="mt-5 pt-5 border-t border-border-light">
                <p className="text-xs text-text-muted mb-1">Have questions?</p>
                <Link to="/contact" className="text-xs text-primary hover:underline">
                  Contact us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
