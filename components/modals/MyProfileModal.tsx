'use client';

import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

export default function ProfileModal() {
  const { closeModal } = useModalStore();
  const { user } = useAuthStore();

  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleSave = () => {
    // TODO: В будущем здесь можно добавить сохранение изменений
    console.log('Profile updated:', profileData);
    closeModal('profile');
  };

  if (!user) return null;

  return (
    <div
      className="p-8 w-[440px] z-50 rounded-3xl"
      style={{
        backgroundColor: 'var(--accent-bg)',
        color: 'var(--foreground)',
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'var(--foreground)',
              color: 'var(--accent-bg)',
            }}
          >
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p style={{ color: 'var(--secondary-text)' }} className="text-sm">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => closeModal('profile')}
          style={{ color: 'var(--secondary-text)' }}
          className="text-2xl hover:opacity-80 transition"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            value={profileData.username}
            onChange={(e) =>
              setProfileData({ ...profileData, username: e.target.value })
            }
            className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--secondary-bg)',
              color: 'var(--foreground)',
              borderColor: 'var(--border)',
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--secondary-bg)',
              color: 'var(--foreground)',
              borderColor: 'var(--border)',
            }}
          />
        </div>

        <div
          className="p-4 rounded-xl"
          style={{ backgroundColor: 'var(--secondary-bg)' }}
        >
          <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
            <strong>Account created:</strong>{' '}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full font-semibold py-3 rounded-xl transition hover:opacity-90"
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--accent-bg)',
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
