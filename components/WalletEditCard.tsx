import { Edit } from 'lucide-react';
import { updateWallet, deleteWallet, type Wallet } from '../app/actions';

type WalletEditCardProps = {
  wallet: Wallet;
  icon: React.ElementType;
  currencySymbol: string;
  isOpen?: boolean;
};

export function WalletEditCard({
  wallet,
  icon: Icon,
  currencySymbol,
  isOpen = false,
}: WalletEditCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <details className="group" open={isOpen}>
        <summary className="p-6 cursor-pointer list-none">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 group-open:rotate-180 transition-transform"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
          <div className="text-gray-600 text-sm mb-1">{wallet.name}</div>
          <div className="text-3xl font-bold">
            {currencySymbol}
            {wallet.amount.toLocaleString()}
          </div>
        </summary>

        <div className="px-6 pb-6 pt-2 border-t border-gray-200">
          <form action={updateWallet} className="space-y-3">
            <input type="hidden" name="id" value={wallet.id} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wallet Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={wallet.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={wallet.amount}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (wallet/banknote/landmark)
              </label>
              <input
                type="text"
                name="icon"
                defaultValue={wallet.icon}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="submit"
                formAction={deleteWallet}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </details>
    </div>
  );
}
