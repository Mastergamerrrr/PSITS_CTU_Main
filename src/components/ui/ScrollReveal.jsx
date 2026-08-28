import { useEffect, useRef, useState } from 'react';

const delayClasses = [
  '',
  'scroll-reveal-delay-1',
  'scroll-reveal-delay-2',
  'scroll-reveal-delay-3',
];

export default function ScrollReveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
}) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={elementRef}
      className={[
        'scroll-reveal',
        visible ? 'scroll-reveal-visible' : '',
        delayClasses[delay] ?? '',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}
