'use client';

import { useModalStore } from '@/store/useModalStore';
import { useEffect } from 'react';
import AddWalletModal from './modals/AddWalletModal';
import AddCategoryModal from './modals/AddCategoryModal';
import AddTransactionModal from './modals/AddTransactionModal';
import AccountModal from './modals/AccountModal';

export default function Modal() {
  const { isOpen, closeAll } = useModalStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeAll();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAll]);

  const hasOpenModal =
    isOpen('add') ||
    isOpen('addCategory') ||
    isOpen('addWallet') ||
    isOpen('profileMenu'); // Теперь только одна модалка для профиля

  if (!hasOpenModal) return null;

  const renderModalContent = () => {
    if (isOpen('add')) return <AddTransactionModal />;
    if (isOpen('addCategory')) return <AddCategoryModal />;
    if (isOpen('addWallet')) return <AddWalletModal />;
    if (isOpen('profileMenu')) return <AccountModal />; // Новая единая модалка
    return null;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeAll}
    >
      <div
        className="bg-[var(--background)] rounded-3xl shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalContent()}
      </div>
    </div>
  );
}
