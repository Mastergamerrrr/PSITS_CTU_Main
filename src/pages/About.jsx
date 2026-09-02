import {
  ArrowRight,
  Award,
  Building2,
  Eye,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltIdentityCard from '../components/about/TiltIdentityCard';
import OfficerCard from '../components/about/OfficerCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { officerGroups } from '../data/mockData';

const values = [
  {
    value: 'Excellence',
    description: 'We set a high standard for technical work and personal growth.',
    icon: Sparkles,
    layout: 'lg:col-span-7',
    tone: 'dark',
  },
  {
    value: 'Integrity',
    description: 'We make responsible decisions and treat trust as part of the work.',
    icon: ShieldCheck,
    layout: 'lg:col-span-5',
    tone: 'pale',
  },
  {
    value: 'Innovation',
    description: 'We test ideas, share what we learn, and stay open to better answers.',
    icon: Lightbulb,
    layout: 'lg:col-span-5',
    tone: 'white',
  },
  {
    value: 'Community',
    description: 'We create space for students to contribute, grow, and help others.',
    icon: HeartHandshake,
    layout: 'lg:col-span-7',
    tone: 'blue',
  },
];

export default function About() {
  return (
    <div className="overflow-hidden bg-bg-light">
      <section className="page-wash">
        <div className="content-shell grid items-center gap-12 py-16 md:min-h-[44rem] md:grid-cols-[1.06fr_0.94fr] md:gap-10 lg:gap-20">
          <ScrollReveal className="min-w-0 max-w-2xl">
            <p className="section-kicker">About PSITS-CTU Main</p>
            <h1 className="display-title mt-6 max-w-[15ch] text-5xl sm:text-6xl md:text-[3.35rem] lg:text-[4.35rem]">
              Built by students. <span className="text-primary">Better together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-text-body sm:text-lg sm:leading-8">
              PSITS connects CTU Main computing students through technical learning, responsible leadership, and community.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to="/membership" className="interactive-lift inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-[1.5rem] bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
                Join PSITS <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/about#mission-vision" className="inline-flex min-h-12 items-center whitespace-nowrap font-semibold text-text-primary hover:text-primary">
                Our purpose
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1} className="min-w-0">
            <TiltIdentityCard />
          </ScrollReveal>
        </div>
      </section>

      <section id="mission-vision" className="scroll-mt-24 bg-bg-light py-28 sm:py-36">
        <div className="content-shell">
          <div className="about-purpose-grid grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <ScrollReveal className="h-full">
              <article className="about-purpose-card about-purpose-card-mission flex h-full flex-col rounded-[1.5rem] border border-transparent bg-white p-7 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3 text-primary">
                  <span className="about-purpose-icon grid h-11 w-11 place-items-center rounded-full bg-bg-light" aria-hidden="true">
                    <Target size={20} />
                  </span>
                  <p className="font-semibold">Our mission</p>
                </div>
                <h2 className="mt-8 max-w-3xl text-4xl leading-[1.08] sm:text-6xl">
                  Help students become capable, responsible technology leaders.
                </h2>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-text-body">
                  We connect classroom learning with practical experience, ethical leadership, industry perspectives, and service to the campus community.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={1} className="h-full">
              <article className="about-purpose-card about-purpose-card-vision flex h-full flex-col rounded-[1.5rem] border border-primary-neutral bg-white/70 p-7 sm:p-10 lg:p-12">
                <span className="about-purpose-icon grid h-11 w-11 place-items-center rounded-full bg-white text-primary" aria-hidden="true">
                  <Eye size={21} />
                </span>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.1em] text-primary">Our vision</p>
                <h3 className="mt-3 text-3xl sm:text-4xl">A future shaped by responsible technologists.</h3>
                <p className="mt-auto max-w-lg pt-8 leading-8 text-text-body">
                  A respected student organization whose graduates are known for technical competence, integrity, and meaningful service.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="values" className="scroll-mt-20 bg-white py-28 sm:py-36" aria-labelledby="values-title">
        <div className="content-shell">
          <ScrollReveal className="max-w-3xl">
            <p className="section-kicker">Our shared standard</p>
            <h2 id="values-title" className="text-4xl sm:text-6xl">How we work together.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-body">
              Four values shape how members collaborate, officers lead, and PSITS represents CTU Main.
            </p>
          </ScrollReveal>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
            {values.map(({ value, description, icon: Icon, layout, tone }, index) => {
              const isDark = tone === 'dark' || tone === 'blue';
              const surfaceClass = {
                dark: 'bg-bg-dark',
                pale: 'bg-bg-light',
                white: 'border border-primary-neutral bg-white',
                blue: 'bg-primary',
              }[tone];

              return (
                <ScrollReveal as="li" key={value} delay={index} className={layout}>
                  <article className={[
                    'about-value-card relative flex min-h-64 h-full flex-col overflow-hidden rounded-[1.5rem] p-7 sm:min-h-72 sm:p-8',
                    surfaceClass,
                  ].join(' ')}>
                    <span className="about-value-orbit" aria-hidden="true" />
                    <div className="relative z-[1] flex items-start justify-between gap-5">
                      <span className={[
                        'font-mono text-sm font-semibold tracking-[0.08em]',
                        isDark ? 'text-primary-neutral' : 'text-primary',
                      ].join(' ')}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={[
                        'about-value-icon grid h-12 w-12 place-items-center rounded-full',
                        isDark ? 'bg-white/15 text-white' : 'bg-white text-primary',
                      ].join(' ')} aria-hidden="true">
                        <Icon size={22} strokeWidth={1.7} />
                      </span>
                    </div>
                    <div className="relative z-[1] mt-auto max-w-md pt-16">
                      <h3 className={['text-2xl sm:text-3xl', isDark ? 'text-white' : 'text-text-primary'].join(' ')}>{value}</h3>
                      <p className={['mt-4 leading-7', isDark ? 'text-blue-100' : 'text-text-body'].join(' ')}>{description}</p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="officers" className="content-shell scroll-mt-24 py-28 sm:py-36">
        <ScrollReveal className="max-w-4xl">
          <div className="flex items-center gap-3 text-primary">
            <Users size={20} aria-hidden="true" />
            <p className="font-semibold">Student leadership</p>
          </div>
          <h2 className="mt-6 text-4xl sm:text-6xl">The people responsible for moving the chapter forward.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-body">
            Meet the 34 student leaders who coordinate programs, represent members, and keep PSITS-CTU Main moving forward for S.Y. 2026-2027.
          </p>
          <p className="mt-4 text-sm font-semibold text-primary">Select any card to view the role profile.</p>
        </ScrollReveal>

        <div className="mt-20 space-y-28 sm:space-y-36">
          {officerGroups.map((group, groupIndex) => (
            <section key={group.id} aria-labelledby={`${group.id}-title`}>
              <ScrollReveal>
                <div className="border-t-2 border-primary pt-7">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                    <div className="max-w-2xl">
                      <p className="font-mono text-sm font-semibold text-primary">0{groupIndex + 1}</p>
                      <h3 id={`${group.id}-title`} className="mt-3 text-3xl sm:text-5xl">{group.label}</h3>
                      <p className="mt-4 max-w-xl leading-7 text-text-body">{group.description}</p>
                    </div>
                    <span className="inline-flex w-fit shrink-0 rounded-full border border-primary-neutral bg-white px-4 py-2 text-sm font-semibold text-text-primary">
                      {group.members.length} positions
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {group.members.map((officer, index) => (
                  <OfficerCard
                    key={officer.id}
                    officer={officer}
                    groupLabel={group.label}
                    number={index + 1}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-white py-28 sm:py-36" aria-labelledby="affiliations-title">
        <div className="content-shell">
          <ScrollReveal className="max-w-3xl">
            <h2 id="affiliations-title" className="text-4xl sm:text-6xl">Rooted at CTU. Connected nationwide.</h2>
          </ScrollReveal>

          <ScrollReveal delay={1} className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
            <article className="flex items-start gap-5">
              <Award size={25} className="mt-1 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <h3 className="text-2xl">PSITS National Chapter</h3>
                <p className="mt-4 leading-7 text-text-body">
                  Our chapter belongs to the nationwide network of information technology student societies.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-5">
              <Building2 size={25} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-2xl">CCICT at CTU Main Campus</h3>
                <p className="mt-4 leading-7 text-text-body">
                  CCICT is our home college and accrediting body within the CTU Main academic community.
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
