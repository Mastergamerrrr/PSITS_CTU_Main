import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  FileCode2,
  FileText,
  Github,
  LayoutTemplate,
  PlayCircle,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import { githubProjects, workshopMaterials } from '../data/mockData';
import ContentHero from '../components/content/ContentHero';
import EmptyState from '../components/content/EmptyState';
import FilterChip from '../components/content/FilterChip';
import ScrollReveal from '../components/ui/ScrollReveal';

const TYPE_FILTERS = ['all', 'slides', 'figma', 'recording'];

const TYPE_CONFIG = {
  slides: { label: 'Slides and exercises', icon: FileText },
  figma: { label: 'Design files', icon: LayoutTemplate },
  recording: { label: 'Session recording', icon: PlayCircle },
};

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function LearningFeature() {
  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-white">
      <div className="aspect-[2/1] overflow-hidden sm:aspect-[5/2] lg:aspect-[2/1]">
        <img
          src="/events/workshop-learning.jpg"
          alt="Students learning together in a campus computer laboratory"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles size={15} /> Workshop archive</span>
          <h2 className="mt-2 text-2xl sm:text-3xl">Keep the learning going</h2>
          <p className="mt-2 text-sm leading-6 text-text-body">Revisit workshop files, recordings, and code references after every PSITS session.</p>
        </div>
        <a href="#resource-library" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-primary-hover">
          Browse library <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

function MaterialCard({ material }) {
  const config = TYPE_CONFIG[material.type] || TYPE_CONFIG.slides;
  const Icon = config.icon;
  const available = material.url && material.url !== '#';

  return (
    <article className="grid gap-5 rounded-[1.5rem] bg-white p-5 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:p-6">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-bg-light text-primary">
        <Icon size={23} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-text-muted">
          <span>{config.label}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={material.date}>{formatDate(material.date)}</time>
        </div>
        <h3 className="mt-2 text-xl leading-tight">{material.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-body">{material.description}</p>
      </div>
      {available ? (
        <a
          href={material.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          <Download size={16} aria-hidden="true" /> Open
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center justify-center rounded-[1.5rem] bg-bg-light px-4 text-sm font-semibold text-text-muted">
          Coming soon
        </span>
      )}
    </article>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'group flex h-full flex-col rounded-[1.5rem] p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7',
        featured ? 'bg-bg-dark text-white md:col-span-7 md:row-span-2' : 'bg-white text-text-primary md:col-span-5',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={[
          'grid h-12 w-12 place-items-center rounded-2xl',
          featured ? 'bg-white/10 text-white' : 'bg-bg-light text-text-primary',
        ].join(' ')}>
          <Github size={22} aria-hidden="true" />
        </span>
        <ExternalLink size={18} className={featured ? 'text-blue-100' : 'text-text-muted group-hover:text-primary'} aria-hidden="true" />
      </div>
      <div className={featured ? 'mt-auto pt-12' : 'mt-8'}>
        <p className={[
          'font-display font-extrabold tracking-[-0.03em]',
          featured ? 'text-3xl text-white' : 'text-xl text-text-primary group-hover:text-primary',
        ].join(' ')}>{project.name}</p>
        <p className={[
          'mt-3 leading-6',
          featured ? 'max-w-xl text-blue-100' : 'text-sm text-text-body',
        ].join(' ')}>{project.description}</p>
      </div>
      <div className={[
        'mt-6 flex items-center gap-5 text-xs font-semibold',
        featured ? 'text-blue-100' : 'text-text-muted',
      ].join(' ')}>
        <span className="inline-flex items-center gap-1.5"><FileCode2 size={14} />{project.language}</span>
        <span className="inline-flex items-center gap-1.5"><Star size={14} />{project.stars} stars</span>
      </div>
    </a>
  );
}

export default function Resources() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');

  const filteredMaterials = useMemo(() => workshopMaterials.filter((material) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${material.title} ${material.description} ${material.type}`.toLowerCase().includes(query);
    const matchesType = type === 'all' || material.type === type;
    return matchesSearch && matchesType;
  }), [search, type]);

  function resetFilters() {
    setSearch('');
    setType('all');
  }

  return (
    <div className="bg-bg-light">
      <ContentHero
        eyebrow="Learning resources"
        title={<>Learning that <span className="text-primary">lasts.</span></>}
        description="Find code, slides, design files, and recordings created through PSITS workshops and student projects."
        actions={(
          <>
            <a href="#resource-library" className="interactive-lift inline-flex min-h-11 items-center rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover">
              Explore the library
            </a>
            <a href="https://github.com/psits-ctu-main" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-[1.5rem] border border-primary-neutral bg-white px-5 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary">
              <Github size={17} aria-hidden="true" /> View GitHub
            </a>
          </>
        )}
        visual={<LearningFeature />}
      />

      <section id="resource-library" className="scroll-mt-24 border-y border-primary-neutral/60 bg-white">
        <div className="content-shell py-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(16rem,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search learning resources</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search slides, recordings, and design files"
                className="min-h-12 w-full rounded-[1.5rem] border border-primary-neutral bg-bg-light py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:justify-end lg:overflow-visible lg:pb-0" aria-label="Filter resources by type">
              {TYPE_FILTERS.map((filter) => (
                <FilterChip key={filter} active={type === filter} onClick={() => setType(filter)}>
                  {filter === 'all' ? 'All resources' : TYPE_CONFIG[filter].label}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl sm:text-4xl">Workshop library</h2>
            <p className="mt-2 text-sm text-text-muted" aria-live="polite">
              {filteredMaterials.length} {filteredMaterials.length === 1 ? 'resource' : 'resources'} in this view.
            </p>
          </div>
          {(search || type !== 'all') && (
            <button type="button" onClick={resetFilters} className="min-h-11 text-sm font-semibold text-primary hover:text-primary-hover">
              Reset filters
            </button>
          )}
        </div>

        {filteredMaterials.length === 0 ? (
          <EmptyState
            title="No resources match"
            description="Try another keyword or return to the complete workshop library."
            actionLabel="Show all resources"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid gap-4">
            {filteredMaterials.map((material, index) => (
              <ScrollReveal key={material.id} delay={index % 3}>
                <MaterialCard material={material} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="content-shell">
          <div className="max-w-2xl">
            <BookOpen size={25} className="text-primary" aria-hidden="true" />
            <h2 className="mt-5 text-3xl sm:text-4xl">Built by the community</h2>
            <p className="mt-3 leading-7 text-text-body">Explore public student projects and see how PSITS members turn workshop ideas into working software.</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-12">
            {githubProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
