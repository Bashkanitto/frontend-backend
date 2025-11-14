import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { useSettingsStore } from '@/store/useSettingsStore'; // твоё zustand хранилище для ThemeMode

export default function SettingsModal() { 
  
  const { closeModal } = useModalStore();
  const { themeMode, setThemeMode } = useSettingsStore(); // zustand
  const [settings, setSettings] = useState({
    language: 'English',
    currency: 'Euro €',
    themeMode: themeMode, // из zustand
  });

  const [openDropdown, setOpenDropdown] = useState<'language' | 'currency' | 'themeMode' | null>(null);

type SettingsKeys = 'language' | 'currency' | 'themeMode';
type ThemeMode = 'light' | 'dark' | 'system';

const options: Record<SettingsKeys, string[]> = {
  language: ['English', 'Русский'],
  currency: ['Euro €', 'Tenge ₸', 'Ruble ₽'],
  themeMode: ['Light', 'Dark', 'System'],
};

const handleSelect = (type: SettingsKeys, value: string) => {
  if (type === 'themeMode') {
    setThemeMode(value as ThemeMode); // приведение типа
  }
  setSettings((prev) => ({ ...prev, [type]: value }));
  setOpenDropdown(null);
};


  return (
    <div
      className="p-8 w-[440px] rounded-3xl"
      style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--foreground)' }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button
          onClick={() => closeModal('settings')}
          style={{ color: 'var(--secondary-text)' }}
          className="text-2xl hover:opacity-80 transition"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4">General</h3>
          <div className="space-y-3">
            {(['language', 'currency', 'themeMode'] as const).map((item) => (
              <div key={item} className="relative w-full">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                  className="flex justify-between items-center w-full py-3 px-3 rounded-lg transition"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    color: 'var(--foreground)',
                  }}
                >
                  {settings[item]}
                  <span style={{ color: 'var(--secondary-text)' }}>▼</span>
                </button>

                {openDropdown === item && (
                  <div
                    className="absolute top-full mt-1 w-full rounded-lg shadow-lg z-50"
                    style={{ backgroundColor: 'var(--secondary-bg)' }}
                  >
                    {options[item].map((option) => (
                      <div
                        key={option}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        onClick={() => handleSelect(item, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="pt-4 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <h3 className="text-lg font-bold mb-4">Help & Support</h3>
          <div className="space-y-3">
            {['Contact Us', 'FAQ', 'Privacy Policy'].map((text) => (
              <button
                key={text}
                className="w-full text-left font-medium py-3 px-3 rounded-lg transition"
                style={{
                  color: 'var(--foreground)',
                  backgroundColor: 'var(--secondary-bg)',
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
