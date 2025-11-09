'use client';

export default function Button({ children }: { children?: React.ReactNode }) {
  return (
    <button
      className={`h-10 rounded-xl flex items-center transition-all duration-200`}
    >
      {children}
    </button>
  );
}
