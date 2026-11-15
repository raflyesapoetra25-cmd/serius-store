import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-ink py-2 overflow-hidden border-b-[1.5px] border-ink">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        <p className="font-inter font-medium text-[12px] uppercase tracking-[0.06em] text-acid-lime text-center truncate">
          1 PCS ONLY • NO RESTOCK • BRANDED & KURASI KETAT • STOK DIKUNCI 15 MENIT SAAT CHECKOUT
        </p>
      </div>
    </div>
  );
};