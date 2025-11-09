'use client';

import React from 'react';

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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      )}
    </div>
    <p className="text-gray-400 text-sm mb-1">{name}</p>
    <p className="text-3xl font-bold">€{amount.toLocaleString()}</p>
  </div>
);
