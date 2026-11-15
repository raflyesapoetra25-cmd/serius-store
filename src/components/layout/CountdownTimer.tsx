import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

interface CountdownTimerProps {
  expiresAt: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt }) => {
  const { formatted, isExpired, isCritical, isWarning } = useCountdown(expiresAt);

  let bgClass = "bg-ink";
  let textClass = "text-acid-lime";
  let label = "Stok dikunci khusus buat kamu. Lewat dari waktu ini, barang dilepas lagi.";
  let animateClass = "";

  if (isExpired) {
    bgClass = "bg-gray-200";
    textClass = "text-gray-600";
    label = "WAKTU HABIS";
  } else if (isCritical) {
    bgClass = "bg-tomato";
    textClass = "text-ink";
    label = "BURUAN! KURANG DARI 1 MENIT";
    animateClass = "animate-pulse"; 
  } else if (isWarning) {
    bgClass = "bg-ink";
    textClass = "text-amber";
    label = "SISA WAKTU MENIPIS";
  }

  return (
    <div className={`w-full ${bgClass} border-[1.5px] border-ink rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-brutal text-center transition-colors duration-300`}>
      <div className={`font-mono font-bold text-[64px] md:text-[96px] leading-none tracking-tighter ${textClass} ${animateClass}`} aria-live="polite">
        {formatted}
      </div>
      <p className={`mt-4 font-inter font-medium text-[14px] md:text-[16px] max-w-md ${isCritical ? 'text-ink font-bold' : (isExpired ? 'text-gray-600' : 'text-gray-200')}`}>
        {label}
      </p>
    </div>
  );
};