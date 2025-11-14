import { useModalStore } from '@/store/useModalStore';
import { useState } from 'react';
import { User } from 'lucide-react';

export default function ProfileModal() {
  const { closeModal } = useModalStore();

  const [profileData, setProfileData] = useState({
    name: 'Marmar1473',
    email: 'example@gmail.com',
  });

  return (
    <div
      className="p-8 w-[440px] z-50 rounded-3xl"
      style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--foreground)', color: 'var(--accent-bg)' }}
          >
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{profileData.name}</h2>
            <p style={{ color: 'var(--secondary-text)' }} className="text-sm">
              {profileData.email}
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
          <label className="block text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
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
          <label className="block text-sm font-semibold mb-2">
            Email
          </label>
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

        <button
          className="w-full font-semibold py-3 rounded-xl transition"
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
