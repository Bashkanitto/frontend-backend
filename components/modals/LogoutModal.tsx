'use client';

import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function LogoutModal() {
  const { closeModal } = useModalStore();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    closeModal('logout');
    router.push('/login');
  };

  return (
    <div
      className="p-8 w-[380px] rounded-3xl"
      style={{
        backgroundColor: 'var(--accent-bg)',
        color: 'var(--foreground)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Confirm Log Out</h2>
        <button
          onClick={() => closeModal('logout')}
          style={{ color: 'var(--secondary-text)' }}
          className="text-2xl hover:opacity-80 transition"
        >
          ×
        </button>
      </div>

      <p style={{ color: 'var(--foreground)' }} className="mb-8">
        Are you sure you want to log out?
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => closeModal('logout')}
          className="flex-1 font-semibold py-3 rounded-xl transition hover:opacity-90"
          style={{
            backgroundColor: 'var(--secondary-bg)',
            color: 'var(--foreground)',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 font-semibold py-3 rounded-xl transition hover:opacity-90"
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--accent-bg)',
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
