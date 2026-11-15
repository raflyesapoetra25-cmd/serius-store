import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const HeaderMinimal: React.FC = () => {
  return (
    <header className="w-full bg-paper border-b-[1.5px] border-ink sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px] h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-acid-lime border-[1.5px] border-ink shadow-brutal-sm flex items-center justify-center">
            <span className="font-grotesk font-bold text-lg md:text-xl text-ink leading-none">S</span>
          </div>
          <span className="font-grotesk font-bold text-2xl md:text-3xl uppercase tracking-tighter text-ink mt-1 hidden md:block">
            Serius
          </span>
        </Link>
        <div className="flex items-center gap-2 text-success">
          <ShieldCheck size={20} />
          <span className="font-inter font-medium text-[12px] md:text-[14px] uppercase tracking-[0.06em] mt-0.5 text-ink">
            Pembayaran aman · Data terenkripsi
          </span>
        </div>
      </div>
    </header>
  );
};