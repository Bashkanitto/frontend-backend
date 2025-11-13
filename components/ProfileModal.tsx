import Image from 'next/image';

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
        className="bg-[var(--accent-bg)] p-2 flex-col h-40 w-55 fixed flex items-center justify-center z-50 bottom-23 left-3 rounded-xl border border-gray-300 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full flex-1 h-[30%] rounded-xl hover:bg-[var(--active-nav-item)] p-1 flex items-center"
          onClick={() => openModal('profile')}
        >
          <Image
            alt="profileimg"
            src={'/icons/profile_icon.svg'}
            height={35}
            width={35}
          ></Image>
          <div className="ml-3 text-xl font-medium select-none">My profile</div>
        </div>
        <div
          className="w-full flex-1 h-[30%] rounded-xl hover:bg-[var(--active-nav-item)] p-1 flex items-center"
          onClick={() => openModal('settings')}
        >
          <Image
            alt="settingsimg"
            src={'/icons/settings_icon.svg'}
            height={35}
            width={35}
          ></Image>
          <div className="ml-3 text-xl font-medium select-none">Settings</div>
        </div>
        <div
          className="w-full flex-1 h-[30%] rounded-xl hover:bg-[var(--active-nav-item)] p-1 flex items-center"
          onClick={() => openModal('logout')}
        >
          <Image
            alt="logoutimg"
            src={'/icons/logout_icon.svg'}
            height={35}
            width={35}
          ></Image>
          <div className="ml-3 text-xl font-medium select-none">Exit</div>
        </div>
      </div>
    </div>
  );
}
