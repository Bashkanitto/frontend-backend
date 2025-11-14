'use client';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, className = '', ...props }: CardProps) => (
  <div
    className={`${className} bg-[var(--background)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}
    {...props}
  >
    {children}
  </div>
);
