'use client';
import Image from 'next/image';

type CategoriesButtonProps = {
  iconUrl: string;
  categoryName: string;
};

export function CategoriesButton(props: CategoriesButtonProps) {
  return (
    <button className="m-2 h-15 bg-white border border-gray-300 flex px-3 rounded-lg items-center justify-between gap-3 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <Image
          className="mx-2"
          alt="categoryicon"
          height={30}
          width={30}
          src={props.iconUrl}
        />
        <span className="text-lg font-medium text-black">
          {props.categoryName}
        </span>
      </div>
      <Image
        alt="editicon"
        height={20}
        width={20}
        src={'/icons/edit_icon.svg'}
      />
    </button>
  );
}

export default function Categories() {
  const categories = [
    { name: 'Food', icon: '/icons/cart_icon.svg' },
    { name: 'Transport', icon: '/icons/bus_icon.svg' },
    { name: 'Health', icon: '/icons/health_icon.svg' },
    { name: 'Shopping', icon: '/icons/shop_icon.svg' },
    { name: 'Entertainment', icon: '/icons/gamepad_icon.svg' },
    { name: 'Travel', icon: '/icons/plane_icon.svg' },

    { name: 'Entertainmentsdkfj', icon: '/icons/gamepad_icon.svg' },
    { name: 'Travelasdlkfn', icon: '/icons/plane_icon.svg' },
    { name: 'Foodsdklfxn', icon: '/icons/cart_icon.svg' },
    { name: 'Transporsdlfknt', icon: '/icons/bus_icon.svg' },
    { name: 'Healtlksdjfh', icon: '/icons/health_icon.svg' },
    { name: 'Shoppislkdfnng', icon: '/icons/shop_icon.svg' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoriesButton
          key={category.name}
          categoryName={category.name}
          iconUrl={category.icon}
        />
      ))}
    </div>
  );
}

// 'use client';
// import { Card } from '@/components/Card';
// import Image from 'next/image';
// import React, { useState } from 'react';

// export default function SettingsPage() {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const [language, setLanguage] = useState<'en' | 'ru' | 'kk'>('en');
//   const [currency, setCurrency] = useState<'KZT' | 'USD' | 'EUR'>('KZT');
//   const [notifications, setNotifications] = useState(true);
//   const [faceId, setFaceId] = useState(false);

//   const toggleNotifications = () => setNotifications(!notifications);
//   const toggleFaceId = () => setFaceId(!faceId);

//   const languageLabels = {
//     en: 'English',
//     ru: 'Русский',
//     kk: 'Қазақша',
//   };

//   const currencyLabels = {
//     KZT: 'KZT ₸',
//     USD: 'USD $',
//     EUR: 'EUR €',
//   };

//   const themeLabels = {
//     light: 'Light',
//     dark: 'Dark',
//   };

//   return (
//     <div className="w-full h-full ">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">
//             General
//           </h2>

//           <div className="space-y-4">
//             <div className="bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between">
//               <span className="text-[var(--foreground)] font-medium">
//                 Language
//               </span>
//               <select
//                 value={language}
//                 onChange={(e) =>
//                   setLanguage(e.target.value as 'en' | 'ru' | 'kk')
//                 }
//                 className="bg-transparent text-[var(--foreground)] font-medium border-none outline-none cursor-pointer"
//               >
//                 {Object.entries(languageLabels).map(([key, label]) => (
//                   <option key={key} value={key}>
//                     {label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between">
//               <span className="text-[var(--foreground)] font-medium">
//                 Currency
//               </span>
//               <select
//                 value={currency}
//                 onChange={(e) =>
//                   setCurrency(e.target.value as 'KZT' | 'USD' | 'EUR')
//                 }
//                 className="bg-transparent text-[var(--foreground)] font-medium border-none outline-none cursor-pointer"
//               >
//                 {Object.entries(currencyLabels).map(([key, label]) => (
//                   <option key={key} value={key}>
//                     {label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between">
//               <span className="text-[var(--foreground)] font-medium">
//                 Theme
//               </span>
//               <select
//                 value={theme}
//                 onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
//                 className="bg-transparent text-[var(--foreground)] font-medium border-none outline-none cursor-pointer"
//               >
//                 {Object.entries(themeLabels).map(([key, label]) => (
//                   <option key={key} value={key}>
//                     {label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">
//             Security
//           </h2>

//           <div className="space-y-4">
//             <div className="bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between">
//               <span className="text-[var(--foreground)] font-medium">
//                 Face ID
//               </span>
//               <button
//                 onClick={toggleFaceId}
//                 className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
//                   faceId ? 'bg-black' : 'bg-gray-300'
//                 }`}
//               >
//                 <span
//                   className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
//                     faceId ? 'translate-x-6' : 'translate-x-0'
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between">
//               <span className="text-[var(--foreground)] font-medium">
//                 Notification
//               </span>
//               <button
//                 onClick={toggleNotifications}
//                 className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
//                   notifications ? 'bg-black' : 'bg-gray-300'
//                 }`}
//               >
//                 <span
//                   className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
//                     notifications ? 'translate-x-6' : 'translate-x-0'
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">
//             Help & Support
//           </h2>

//           <div className="space-y-4">
//             <button className="w-full bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between hover:bg-[var(--sidebar-hover)] transition-colors">
//               <span className="text-[var(--foreground)] font-medium">
//                 Contact Us
//               </span>
//               <Image
//                 width={24}
//                 height={24}
//                 src="icons/contactUs_icon.svg"
//                 alt="Contact Us"
//                 className="w-6 h-6 [filter:var(--icon-filter)]"
//               />
//             </button>

//             <button className="w-full bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between hover:bg-[var(--sidebar-hover)] transition-colors">
//               <span className="text-[var(--foreground)] font-medium">FAQ</span>
//               <Image
//                 width={24}
//                 height={24}
//                 src="icons/faq_icon.svg"
//                 alt="FAQ"
//                 className="w-6 h-6 [filter:var(--icon-filter)]"
//               />
//             </button>

//             <button className="w-full bg-[var(--background2)] rounded-xl p-4 flex items-center justify-between hover:bg-[var(--sidebar-hover)] transition-colors">
//               <span className="text-[var(--foreground)] font-medium">
//                 Privacy Policy
//               </span>
//               <Image
//                 width={24}
//                 height={24}
//                 src="icons/shield_icon.svg"
//                 alt="Privacy Policy"
//                 className="w-6 h-6 [filter:var(--icon-filter)]"
//               />
//             </button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
