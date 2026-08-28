export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="page-wash relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border-[3rem] border-white/70" aria-hidden="true" />
      <div className="content-shell relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          {eyebrow && (
            <p className="section-kicker mb-5">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="display-title max-w-[15ch] text-[clamp(2.7rem,7vw,4.75rem)]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-text-body sm:text-lg sm:leading-8">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
