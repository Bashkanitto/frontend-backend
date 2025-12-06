'use client';

import { useState } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';
import { currencyNames } from '@/lib/currencyUtils';
import { User, Settings, LogOut, Mail, Lock, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const t = translations[language];

  const [currentView, setCurrentView] = useState<AccountView>('profile');
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const menuItems = [
    { id: 'profile' as AccountView, label: t.profile, icon: User },
    { id: 'settings' as AccountView, label: t.settings, icon: Settings },
    { id: 'logout' as AccountView, label: t.logout, icon: LogOut },
  ];

  const languageOptions = {
    en: 'English',
    ru: 'Русский',
  };

  const themeOptions = {
    light: t.light,
    dark: t.dark,
    system: t.system,
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
              <div className="space-y-2">
                <Label htmlFor="username">{t.username}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                    className="pl-10"
                    placeholder={t.username}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="pl-10"
                    placeholder={t.email}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value="••••••••"
                    disabled
                    className="pl-10 cursor-not-allowed"
                  />
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="w-full">
                {t.save}
              </Button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label>{t.language}</Label>
                <Select
                  value={language}
                  onValueChange={(value: 'en' | 'ru') => setLanguage(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageOptions).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.currency}</Label>
                <Select
                  value={currency}
                  onValueChange={(value: 'KZT' | 'USD' | 'EUR') =>
                    setCurrency(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencyNames).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.theme}</Label>
                <Select
                  value={themeMode}
                  onValueChange={(value: 'light' | 'dark' | 'system') =>
                    setThemeMode(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themeOptions).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'logout':
        return (
          <div className="flex-1 flex items-top justify-center p-8">
            <div className="text-center max-w-md">
              <h4 className="text-xl font-semibold mb-2">
                {language === 'en'
                  ? 'Log out of your account?'
                  : 'Выйти из аккаунта?'}
              </h4>

              <p className="text-sm text-muted-foreground mb-6">
                {language === 'en'
                  ? 'Are you sure you want to log out? You will need to sign in again to access your account.'
                  : 'Вы уверены, что хотите выйти? Вам нужно будет снова войти, чтобы получить доступ к своему аккаунту.'}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCurrentView('profile')}
                >
                  {t.cancel}
                </Button>
                <Button onClick={handleLogout} className="flex-1">
                  {t.logout}
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-medium mb-2">
                {language === 'en'
                  ? 'Manage your account'
                  : 'Управление аккаунтом'}
              </h4>
              <p className="text-sm text-muted-foreground max-w-xs">
                {language === 'en'
                  ? 'Select an option from the menu to edit your profile, change settings, or log out'
                  : 'Выберите опцию из меню для редактирования профиля, изменения настроек или выхода'}
              </p>
            </div>
          </div>
        );
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'profile':
        return t.profile;
      case 'settings':
        return t.settings;
      case 'logout':
        return t.logout;
      default:
        return t.settings;
    }
  };

  return (
    <div className="flex w-[800px] h-[600px] bg-background rounded-2xl overflow-hidden border">
      <div className="w-64 bg-secondary/30 p-6 border-r">
        <h2 className="text-xl font-semibold mb-6">
          {language === 'en' ? 'Account' : 'Аккаунт'}
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
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
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
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">{getHeaderTitle()}</h3>
          <button
            onClick={() => closeModal('profileMenu')}
            className="p-2 rounded-lg hover:bg-secondary transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
