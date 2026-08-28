import { Github, Star, ExternalLink, BookOpen, Video, FileText } from 'lucide-react';
import { githubProjects, workshopMaterials } from '../data/mockData';
import PageHeader from '../components/layout/PageHeader';

const TYPE_ICONS = {
  slides:    FileText,
  figma:     ExternalLink,
  recording: Video,
};

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function Resources() {
  return (
    <div className="bg-bg-light">

      <PageHeader
        eyebrow="Learning resources"
        title={<>Keep learning after <span className="text-primary">the session ends.</span></>}
        description="Explore open-source projects, workshop materials, recordings, and shared references from PSITS activities."
      />

      {/* GitHub Projects */}
      <section className="content-shell py-16 sm:py-20">
        <div className="flex items-center gap-3 mb-8">
          <Github size={22} className="text-text-primary" />
          <h2 className="text-4xl">GitHub projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {githubProjects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-hover flex flex-col gap-4 rounded-[1.5rem] bg-white p-6 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-dark">
                  <Github size={18} className="text-white" />
                </div>
                <ExternalLink
                  size={14}
                  className="text-text-muted group-hover:text-primary transition-colors"
                />
              </div>
              <div>
                <p className="font-bold text-text-primary group-hover:text-primary transition-colors">
                  {project.name}
                </p>
                <p className="text-text-muted text-sm mt-1 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  {project.language}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-secondary" fill="currentColor" />
                  {project.stars}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="https://github.com/psits-ctu-main"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-[1.5rem] border border-primary-neutral bg-white px-5 py-2.5 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary"
          >
            <Github size={16} /> View GitHub Organization
          </a>
        </div>
      </section>

      {/* Workshop Materials */}
      <section className="bg-white py-16 sm:py-20">
        <div className="content-shell">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={22} className="text-primary" />
            <h2 className="text-4xl">Workshop materials</h2>
          </div>
          <div className="flex flex-col gap-4">
            {workshopMaterials.map((material) => {
              const Icon = TYPE_ICONS[material.type] ?? FileText;
              return (
                <div
                  key={material.id}
                  className="flex items-center gap-5 rounded-[1.5rem] bg-bg-light p-5 sm:p-6"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary truncate">
                      {material.title}
                    </p>
                    <p className="text-text-muted text-sm mt-0.5 line-clamp-1">
                      {material.description}
                    </p>
                    <p className="text-xs text-text-muted mt-1">{formatDate(material.date)}</p>
                  </div>
                  <span className="rounded-full border border-secondary bg-white px-3 py-1 text-xs font-semibold text-text-primary">Coming soon</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
