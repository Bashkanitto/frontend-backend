'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <svg width="60" height="60" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="60 120"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // показываем лоадер при смене пути
    setLoading(true);

    // имитация времени загрузки страницы (можно убрать или заменить)
    const timeout = setTimeout(() => setLoading(false), 300);

    return () => clearTimeout(timeout);
  }, [pathname]); // срабатывает при каждом изменении пути

  if (!loading) return null;
  return <Loader />;
}
