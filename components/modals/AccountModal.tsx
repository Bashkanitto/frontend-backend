'use client';

import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useRouter } from 'next/navigation';
import {
  User,
  Settings,
  LogOut,
  Mail,
  Lock,
  ChevronDown,
  X,
} from 'lucide-react';

type AccountView = 'menu' | 'profile' | 'settings' | 'logout';

export default function AccountModal() {
  const { closeModal } = useModalStore();
  const { user, logout } = useAuthStore();
  const {
    themeMode,
    setThemeMode,
    language,
    setLanguage,
    currency,
    setCurrency,
  } = useSettingsStore();
  const router = useRouter();

  const [currentView, setCurrentView] = useState<AccountView>('profile');
  const [openDropdown, setOpenDropdown] = useState<
    'language' | 'currency' | 'theme' | null
  >(null);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const menuItems = [
    { id: 'profile' as AccountView, label: 'Profile', icon: User },
    { id: 'settings' as AccountView, label: 'Settings', icon: Settings },
    { id: 'logout' as AccountView, label: 'Log Out', icon: LogOut },
  ];

  const languageOptions = {
    en: 'English',
    ru: 'Русский',
  };

  const currencyOptions = {
    EUR: '€ EUR',
    KZT: '₸ KZT',
    RUB: '₽ RUB',
  };

  const themeOptions = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  };

  const handleLogout = () => {
    logout();
    closeModal('profileMenu');
    router.push('/login');
  };

  const handleSaveProfile = () => {
    console.log('Profile updated:', profileData);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return (
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-6">
              {/* Username Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
                  Username
                </label>
                <div
                  className="flex items-center w-full rounded-xl px-4 border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <User
                    className="w-5 h-5"
                    style={{ color: 'var(--secondary-text)' }}
                  />
                  <div
                    className="h-6 mx-4 border-l"
                    style={{ borderColor: 'var(--border)' }}
                  />
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                    className="w-full py-3 bg-transparent focus:outline-none"
                    style={{
                      color: 'var(--foreground)',
                    }}
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
                  Email
                </label>
                <div
                  className="flex items-center w-full rounded-xl px-4 border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Mail
                    className="w-5 h-5"
                    style={{ color: 'var(--secondary-text)' }}
                  />
                  <div
                    className="h-6 mx-4 border-l"
                    style={{ borderColor: 'var(--border)' }}
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full py-3 bg-transparent focus:outline-none"
                    style={{
                      color: 'var(--foreground)',
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
                  Password
                </label>
                <div
                  className="flex items-center w-full rounded-xl px-4 border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Lock
                    className="w-5 h-5"
                    style={{ color: 'var(--secondary-text)' }}
                  />
                  <div
                    className="h-6 mx-4 border-l"
                    style={{ borderColor: 'var(--border)' }}
                  />
                  <input
                    type="password"
                    value="••••••••"
                    disabled
                    className="w-full py-3 bg-transparent cursor-not-allowed"
                    style={{
                      color: 'var(--secondary-text)',
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="w-full py-3 rounded-xl font-semibold transition hover:opacity-90 mt-4"
                style={{
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
                  Language
                </label>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === 'language' ? null : 'language'
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span>{languageOptions[language]}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                {openDropdown === 'language' && (
                  <div
                    className="absolute top-full mt-1 w-full rounded-xl shadow-lg z-50 overflow-hidden border"
                    style={{
                      backgroundColor: 'var(--secondary-bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {(
                      Object.keys(languageOptions) as Array<
                        keyof typeof languageOptions
                      >
                    ).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setOpenDropdown(null);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[var(--sidebar-hover)] transition"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {languageOptions[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
                  Currency
                </label>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === 'currency' ? null : 'currency'
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span>{currencyOptions[currency]}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                {openDropdown === 'currency' && (
                  <div
                    className="absolute top-full mt-1 w-full rounded-xl shadow-lg z-50 overflow-hidden border"
                    style={{
                      backgroundColor: 'var(--secondary-bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {(
                      Object.keys(currencyOptions) as Array<
                        keyof typeof currencyOptions
                      >
                    ).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setOpenDropdown(null);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[var(--sidebar-hover)] transition"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {currencyOptions[curr]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-[var(--secondary-text)]">
                  Theme
                </label>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === 'theme' ? null : 'theme')
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition border"
                  style={{
                    backgroundColor: 'var(--secondary-bg)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span>{themeOptions[themeMode]}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                {openDropdown === 'theme' && (
                  <div
                    className="absolute top-full mt-1 w-full rounded-xl shadow-lg z-50 overflow-hidden border"
                    style={{
                      backgroundColor: 'var(--secondary-bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {(
                      Object.keys(themeOptions) as Array<
                        keyof typeof themeOptions
                      >
                    ).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => {
                          setThemeMode(theme);
                          setOpenDropdown(null);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[var(--sidebar-hover)] transition"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {themeOptions[theme]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'logout':
        return (
          <div className="flex-1 flex items-top justify-center p-8">
            <div className="text-center max-w-md">
              <h4 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Log out of your account?
              </h4>

              <p className="text-sm text-[var(--secondary-text)] mb-6">
                Are you sure you want to log out? You will need to sign in again
                to access your account.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-xl font-semibold transition hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--foreground)',
                    color: 'var(--background)',
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[var(--foreground)]" />
              </div>
              <h4 className="text-lg font-medium text-[var(--foreground)] mb-2">
                Manage your account
              </h4>
              <p className="text-sm text-[var(--secondary-text)] max-w-xs">
                Select an option from the menu to edit your profile, change
                settings, or log out
              </p>
            </div>
          </div>
        );
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'profile':
        return 'Profile';
      case 'settings':
        return 'Settings';
      case 'logout':
        return 'Log Out';
      default:
        return 'Account Settings';
    }
  };

  return (
    <div className="flex w-[800px] h-[600px] bg-[var(--background)] rounded-2xl overflow-hidden">
      <div className="w-64 bg-[var(--background-darker)] p-6 border-r border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">
          Account
        </h2>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                  currentView === item.id
                    ? 'bg-[var(--sidebar-active)] text-[var(--foreground)]'
                    : 'hover:bg-[var(--sidebar-hover)] text-[var(--foreground)]'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {getHeaderTitle()}
          </h3>
          <button
            onClick={() => closeModal('profileMenu')}
            className="p-2 rounded-lg hover:bg-[var(--secondary-bg)] transition"
            style={{ color: 'var(--foreground)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
