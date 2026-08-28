import { ArrowRight, Award, Building2, Eye, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltIdentityCard from '../components/about/TiltIdentityCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { officers, orgStats } from '../data/mockData';

const values = [
  { value: 'Excellence', description: 'We set a high standard for technical work and personal growth.' },
  { value: 'Integrity', description: 'We make responsible decisions and treat trust as part of the work.' },
  { value: 'Innovation', description: 'We test ideas, share what we learn, and stay open to better answers.' },
  { value: 'Community', description: 'We create space for students to contribute, grow, and help others.' },
];

function LeadershipName({ officer, prominent = false }) {
  return (
    <article>
      <p className="text-sm font-semibold text-primary">{officer.position}</p>
      <h3 className={prominent ? 'mt-3 text-4xl sm:text-6xl' : 'mt-3 text-2xl sm:text-3xl'}>{officer.name}</h3>
      <p className="mt-3 text-sm text-text-muted">{officer.year}</p>
    </article>
  );
}

export default function About() {
  const [president, ...otherOfficers] = officers;
  const vicePresidents = otherOfficers.slice(0, 2);
  const council = otherOfficers.slice(2);

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

      <section className="bg-white" aria-label="Organization impact">
        <div className="content-shell">
          <dl className="grid grid-cols-3">
            {[orgStats[0], orgStats[1], orgStats[3]].map(({ label, value }, index) => (
              <div key={label} className={['min-w-0 py-8 sm:py-10', index > 0 ? 'border-l border-primary-neutral/60 pl-5 sm:pl-8' : 'pr-4'].join(' ')}>
                <dd className="font-mono text-2xl font-semibold text-text-primary sm:text-4xl">{value}</dd>
                <dt className="mt-2 text-xs leading-5 text-text-muted sm:text-sm">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="mission-vision" className="scroll-mt-24 bg-bg-light py-28 sm:py-36">
        <div className="content-shell grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <ScrollReveal>
            <div className="flex items-center gap-3 text-primary">
              <Target size={20} aria-hidden="true" />
              <p className="font-semibold">Our mission</p>
            </div>
            <h2 className="mt-7 max-w-3xl text-4xl leading-[1.08] sm:text-6xl">
              Help students become capable, responsible technology leaders.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-body">
              We connect classroom learning with practical experience, ethical leadership, industry perspectives, and service to the campus community.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1} className="self-end border-l-2 border-primary pl-7 sm:pl-9">
            <Eye size={24} className="text-primary" aria-hidden="true" />
            <h3 className="mt-8 text-3xl sm:text-4xl">Our vision</h3>
            <p className="mt-5 max-w-lg leading-8 text-text-body">
              A respected student organization whose graduates are known for technical competence, integrity, and meaningful service.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-28 sm:py-36" aria-labelledby="values-title">
        <div className="content-shell">
          <ScrollReveal className="max-w-3xl">
            <h2 id="values-title" className="text-4xl sm:text-6xl">How we work together.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-body">
              Four values shape how members collaborate, officers lead, and PSITS represents CTU Main.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1} className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1.15fr_0.8fr]">
            {values.map(({ value, description }) => (
              <article key={value}>
                <h3 className="text-2xl text-primary sm:text-3xl">{value}</h3>
                <p className="mt-4 leading-7 text-text-body">{description}</p>
              </article>
            ))}
          </ScrollReveal>
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
            PSITS-CTU Main officers for S.Y. 2026-2027 coordinate programs, represent members, and keep the organization accountable.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1} className="mt-20 border-t-2 border-primary pt-10">
          <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24">
            <LeadershipName officer={president} prominent />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
              {vicePresidents.map((officer) => (
                <LeadershipName key={officer.id} officer={officer} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-28">
          <h3 className="text-2xl">Executive council</h3>
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {council.map((officer) => (
              <article key={officer.id}>
                <h4 className="text-lg">{officer.name}</h4>
                <p className="mt-2 text-sm font-semibold text-primary">{officer.position}</p>
                <p className="mt-1 text-xs text-text-muted">{officer.year}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
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
