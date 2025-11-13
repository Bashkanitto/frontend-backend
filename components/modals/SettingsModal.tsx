import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';

export default function SettingsModal() {
  const { closeModal } = useModalStore();

  // Настройки
  const [settings] = useState({
    language: 'English',
    currency: 'Euro €',
    theme: 'Light',
  });

  return (
    <div className="p-8 w-[440px]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button
          onClick={() => closeModal('settings')}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">General</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700 font-medium">Language</span>
              <button className="flex items-center gap-2 text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-lg">
                {settings.language}
                <span className="text-gray-400">▼</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700 font-medium">Currency</span>
              <button className="flex items-center gap-2 text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-lg">
                {settings.currency}
                <span className="text-gray-400">▼</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700 font-medium">Theme</span>
              <button className="flex items-center gap-2 text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-lg">
                {settings.theme}
                <span className="text-gray-400">▼</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Help & Support
          </h3>

          <div className="space-y-3">
            <button className="w-full text-left text-gray-700 font-medium py-3 hover:bg-gray-100 rounded-lg px-3">
              Contact Us
            </button>
            <button className="w-full text-left text-gray-700 font-medium py-3 hover:bg-gray-100 rounded-lg px-3">
              FAQ
            </button>
            <button className="w-full text-left text-gray-700 font-medium py-3 hover:bg-gray-100 rounded-lg px-3">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
