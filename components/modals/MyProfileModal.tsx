import { useModalStore } from '@/store/useModalStore';
import { useState } from 'react';

export default function ProfileModal() {
  const { closeModal } = useModalStore();

  const [profileData, setProfileData] = useState({
    name: 'Marmar1473',
    email: 'example@gmail.com',
  });

  return (
    <div className="p-8 w-[440px] z-50">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {profileData.name}
            </h2>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
        </div>
        <button
          onClick={() => closeModal('profile')}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
}
