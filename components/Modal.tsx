'use client';

import { useModalStore } from '@/store/useModalStore';
import { useEffect } from 'react';
import AddWalletModal from './modals/AddWalletModal';
import AddCategoryModal from './modals/AddCategoryModal';
import AddTransactionModal from './modals/AddTransactionModal';
import MyProfileModal from './modals/MyProfileModal';
import SettingsModal from './modals/SettingsModal';
import LogoutModal from './modals/LogoutModal';

export default function Modal() {
  const { isOpen, closeAll } = useModalStore();


  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeAll(); // закрываем все модалки
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAll]);

  // Если ни одно модальное окно не открыто
  if (
    !isOpen('add') &&
    !isOpen('addCategory') &&
    !isOpen('addWallet') &&
    !isOpen('profile') &&
    !isOpen('settings') &&
    !isOpen('logout')
  )
    return null;

  // Рендер содержимого в зависимости от активного модального окна
  const renderModalContent = () => {
    if (isOpen('add')) {
      return <AddTransactionModal />;
    } else if (isOpen('addCategory')) {
      return <AddCategoryModal />;
    } else if (isOpen('addWallet')) {
      return <AddWalletModal />;
    } else if (isOpen('profile')) {
      return <MyProfileModal />;
    } else if (isOpen('settings')) {
      return <SettingsModal />;
    } else if (isOpen('logout')) {
      return <LogoutModal />;
    }

    return null;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeAll}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalContent()}
      </div>
    </div>
  );
}
