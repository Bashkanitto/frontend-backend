import { useModalStore } from '@/store/useModalStore';
import { useEffect } from 'react';
import { useState } from 'react';
export default function Modal() {
  const { isOpen, closeModal } = useModalStore();
  const [amount, setAmount] = useState('25,00');
  const [comment, setComment] = useState('');

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

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1) || '0');
  };

  const handleClear = () => {
    setAmount('0');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-[680px] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          {/* Left side - Form */}
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold text-gray-400 mb-6">Expenses</h2>
            
            {/* Amount display */}
            <div className="bg-gray-100 rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-2xl">€</span>
                <span className="text-4xl font-bold text-gray-900">{amount}</span>
              </div>
            </div>

            {/* Comment input */}
            <input
              type="text"
              placeholder="Add a comment ..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-100 rounded-2xl px-6 py-4 mb-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            {/* Dropdowns */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-300">
                <span>💳</span>
                <span>Wallet</span>
                <span className="text-gray-500">▼</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-300">
                <span>🏷️</span>
                <span>Category</span>
                <span className="text-gray-500">▼</span>
              </button>
            </div>
          </div>

          {/* Right side - Numpad */}
          <div className="w-[340px] bg-gray-50 p-6 flex flex-col">
            <div className="grid grid-cols-4 gap-3 flex-1">
              {/* Row 1 */}
              <button
                onClick={() => handleNumberClick('1')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                1
              </button>
              <button
                onClick={() => handleNumberClick('2')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                2
              </button>
              <button
                onClick={() => handleNumberClick('3')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                3
              </button>
              <button
                onClick={handleBackspace}
                className="bg-black hover:bg-gray-800 rounded-2xl text-white text-2xl font-bold h-20 flex items-center justify-center"
              >
                ⌫
              </button>

              {/* Row 2 */}
              <button
                onClick={() => handleNumberClick('4')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                4
              </button>
              <button
                onClick={() => handleNumberClick('5')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                5
              </button>
              <button
                onClick={() => handleNumberClick('6')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                6
              </button>
              <button
                onClick={handleClear}
                className="bg-black hover:bg-gray-800 rounded-2xl text-white text-2xl font-bold h-20 flex items-center justify-center"
              >
                C
              </button>

              {/* Row 3 */}
              <button
                onClick={() => handleNumberClick('7')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                7
              </button>
              <button
                onClick={() => handleNumberClick('8')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                8
              </button>
              <button
                onClick={() => handleNumberClick('9')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                9
              </button>
              <button
                onClick={closeModal}
                className="bg-black hover:bg-gray-800 rounded-2xl row-span-2 h-[172px] flex items-center justify-center text-white text-4xl"
              >
                ✓
              </button>

              {/* Row 4 */}
              <button
                className="bg-black hover:bg-gray-800 rounded-2xl text-white text-3xl font-bold h-20 flex items-center justify-center"
              >
                +
              </button>
              <button
                onClick={() => handleNumberClick('0')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                0
              </button>
              <button
                onClick={() => handleNumberClick(',')}
                className="bg-gray-300 hover:bg-gray-400 rounded-2xl text-3xl font-bold text-gray-800 h-20"
              >
                ,
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}