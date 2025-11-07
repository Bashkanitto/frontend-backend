"use client";

import { usePageStore } from "@/store/usePageStore";

export default function Button() {
  const { currentPage } = usePageStore();

  const buttonTitles = {
    home: "Add transaction",
    settings: "Log out",
    statistic: "Add transaction",
    wallet: "Add wallet",
    add: "",
  };

  // Условия для разных страниц
  const isSettings = currentPage === "settings";
  const bgColor = isSettings ? "bg-red-500" : "bg-[var(--foreground)]";
  const iconSrc = isSettings ? "/logout.svg" : "/plus_icon.svg";
  const iconFilter = isSettings
    ? "[filter:var(--icon-filter)]"
    : "[filter:var(--icon-filter-back)]";

  return (
    <button
      className={`h-10 ${bgColor} rounded-xl flex items-center transition-all duration-200`}
    >
      <img
        src={iconSrc}
        className={`${iconFilter} w-7 ml-4 mr-2`}
        alt="button icon"
      />
      <p
        className={`mr-4 font-semibold ${
          isSettings
            ? "text-[var(--foreground)]" // ← текст чёрный на светлой, белый на тёмной
            : "text-[var(--background)]"
        }`}
      >
        {buttonTitles[currentPage]}
      </p>
    </button>
  );
}
