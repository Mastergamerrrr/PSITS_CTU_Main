import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-wash min-h-[65vh] grid place-items-center px-4 py-20 text-center">
      <div className="max-w-lg">
        <p className="font-mono text-sm font-semibold text-primary">404 / route_not_found</p>
        <h1 className="display-title mt-4 text-5xl sm:text-6xl">This page moved off campus.</h1>
        <p className="mt-5 text-text-muted">The link may be outdated, or the page may not exist yet.</p>
        <Link to="/" className="interactive-lift mt-8 inline-flex min-h-11 items-center gap-2 rounded-[1.5rem] bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
          <ArrowLeft size={17} /> Back to home
        </Link>
      </div>
    </section>
  );
}
