import { User, Settings, LogOut } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

export default function ProfileModal() {
  const { isOpen, openModal, closeModal } = useModalStore();

  if (!isOpen('profileModal')) {
    return null;
  }

  const handleBackdropClick = () => {
    closeModal('profileModal');
  };

  return (
    <div className="fixed w-[100%] h-[100%] z-25" onClick={handleBackdropClick}>
      <div
        className="bg-[var(--accent-bg)] p-2 flex-col h-40 w-55 fixed flex items-center justify-center z-50 bottom-23 left-3 rounded-xl border border-[var(--border)] shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full flex-1 h-[30%] rounded-xl hover:bg-[var(--active-nav-item)] p-1 flex items-center"
          onClick={() => openModal('profile')}
        >
          <User className="icon-filter w-8 h-8 ml-1" />
          <div className="text-[var(--accent-text)] ml-3 text-xl font-medium select-none">My profile</div>
        </div>
        <div
          className="w-full flex-1 h-[30%] rounded-xl hover:bg-[var(--active-nav-item)] p-1 flex items-center"
          onClick={() => openModal('settings')}
        >
          <Settings className="icon-filter w-8 h-8 ml-1" />
          <div className="text-[var(--accent-text)] ml-3 text-xl font-medium select-none">Settings</div>
        </div>
        <div
          className="w-full flex-1 h-[30%] rounded-xl hover:bg-[var(--active-nav-item)] p-1 flex items-center"
          onClick={() => openModal('logout')}
        >
          <LogOut className="icon-filter w-8 h-8 ml-1" />
          <div className="text-[var(--accent-text)] ml-3 text-xl font-medium select-none">Exit</div>
        </div>
      </div>
    </div>
  );
}
