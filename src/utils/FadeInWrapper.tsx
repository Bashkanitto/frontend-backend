import { m, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeInWrapper({
  children,
  time,
}: {
  children: React.ReactNode;
  time?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: time ?? 0.6, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}
