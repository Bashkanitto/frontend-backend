'use client';

import React from 'react';
import { Edit3 } from 'lucide-react';

type WalletCardProps = {
  name: string;
  amount: number;
  icon: React.ElementType;
  editable?: boolean;
};

export const WalletCard: React.FC<WalletCardProps> = ({
  name,
  amount,
  icon: Icon,
  editable = true,
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-gray-100 rounded-xl">
        <Icon size={24} className="text-gray-700" />
      </div>
      {editable && (
        <button className="text-gray-400 hover:text-gray-600">
          <Edit3 className="w-5 h-5" />
        </button>
      )}
    </div>
    <p className="text-gray-400 text-sm mb-1">{name}</p>
    <p className="text-3xl font-bold">€{amount.toLocaleString()}</p>
  </div>
);
