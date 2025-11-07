import { useModalStore } from '@/store/useModalStore';
import { useEffect } from 'react';

export default function Modal() {
  const { isOpen, closeModal } = useModalStore();
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  // ✅ Если модалка закрыта — не рендерим вообще
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-[var(--background)] rounded-2xl shadow-xl p-6 w-80 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">типо калькулятор</h2>
        <p className="text-gray-600 mb-4">
          1 2 3<br />
          4 5 6<br />7 8 9
        </p>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          X
        </button>
      </div>
    </div>
  );
}
