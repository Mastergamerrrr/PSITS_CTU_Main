import { useRef } from 'react';

function tiltIsAvailable(event) {
  return event.pointerType === 'mouse'
    && window.matchMedia('(pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function TiltIdentityCard() {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!tiltIsAvailable(event)) return;

    const card = cardRef.current;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 12;

    card.classList.add('about-identity-card-active');
    card.style.setProperty('--card-pointer-x', `${x * 100}%`);
    card.style.setProperty('--card-pointer-y', `${y * 100}%`);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    card.classList.remove('about-identity-card-active');
    card.style.removeProperty('--card-pointer-x');
    card.style.removeProperty('--card-pointer-y');
    card.style.removeProperty('transform');
  };

  return (
    <figure
      className="about-card-stage mx-auto w-full max-w-md md:mx-0 md:justify-self-end"
      aria-label="Interactive PSITS-CTU Main identity card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <div ref={cardRef} className="about-identity-card relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-bg-dark p-7 text-white sm:p-9">
        <div className="about-card-layer about-card-layer-front relative flex items-start justify-between gap-5">
          <div>
            <p className="font-display text-lg font-extrabold text-white">PSITS-CTU</p>
            <p className="mt-1 text-xs font-semibold text-primary-neutral">Main Campus</p>
          </div>
          <p className="font-mono text-xs text-primary-neutral">S.Y. 2026-2027</p>
        </div>

        <div className="about-card-layer about-card-layer-mark absolute inset-x-0 top-1/2 grid -translate-y-1/2 place-items-center">
          <div className="grid h-48 w-48 place-items-center rounded-full border border-white/20 bg-white/[0.06] sm:h-56 sm:w-56">
            <img src="/psits.jpg" alt="PSITS emblem" className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32" />
          </div>
        </div>

        <div className="about-card-layer about-card-layer-front absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9">
          <p className="max-w-xs font-display text-2xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-3xl">
            Learn together. Build what matters.
          </p>
        </div>
      </div>
    </figure>
  );
}
