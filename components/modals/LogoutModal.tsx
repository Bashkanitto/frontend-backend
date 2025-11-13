import { useModalStore } from '@/store/useModalStore';

export default function LogoutModal() {
  const { closeModal } = useModalStore();
  return (
    <div className="p-8 w-[380px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Confirm Log Out</h2>
        <button
          onClick={() => closeModal('logout')}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      <p className="text-gray-700 mb-8">Are you sure you want to log out?</p>

      <div className="flex gap-3">
        <button
          onClick={() => closeModal('logout')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Логика выхода
            console.log('Logging out...');
            closeModal('logout');
          }}
          className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl"
        >
          OK
        </button>
      </div>
    </div>
  );
}
