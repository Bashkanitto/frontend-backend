import React from 'react';

type TransactionItemProps = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  icon: Icon,
  title,
  subtitle,
  amount,
  date,
}) => {
  return (
    <div className="flex items-center justify-between bg-[var(--sidebar-hover)] rounded-xl p-3 mb-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg">
          <Icon className="text-gray-700" size={22} />
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-800">{amount}</p>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
    </div>
  );
};
