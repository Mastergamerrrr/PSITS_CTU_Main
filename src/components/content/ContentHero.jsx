import ScrollReveal from '../ui/ScrollReveal';

export default function ContentHero({
  eyebrow,
  title,
  description,
  actions,
  visual,
  visualClassName = '',
}) {
  return (
    <section className="page-wash relative overflow-hidden">
      <div className="content-shell py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <ScrollReveal className="min-w-0 max-w-2xl">
            {eyebrow && (
              <p className="mb-5 text-sm font-semibold tracking-[0.08em] text-primary">
                {eyebrow}
              </p>
            )}
            <h1 className="display-title max-w-[12ch] text-[clamp(2.65rem,6vw,4.8rem)]">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-xl text-base leading-7 text-text-body sm:text-lg sm:leading-8">
                {description}
              </p>
            )}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </ScrollReveal>

          {visual && (
            <ScrollReveal delay={1} className={`min-w-0 ${visualClassName}`}>
              {visual}
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
