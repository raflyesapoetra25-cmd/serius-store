import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-ink text-paper border-t-[1.5px] border-ink pt-12 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-acid-lime border-[1.5px] border-ink flex items-center justify-center">
                <span className="font-grotesk font-bold text-xl text-ink leading-none">S</span>
              </div>
              <span className="font-grotesk font-bold text-3xl uppercase tracking-tighter text-paper">
                Serius Store
              </span>
            </div>
            <p className="font-inter text-gray-200 max-w-sm">
              Thrift branded kurasi QC. Satu barang, satu pemilik — begitu diamankan, langsung dikunci buat kamu.
            </p>
          </div>
          <div>
            <h4 className="font-grotesk font-bold text-[18px] mb-4 text-acid-lime">BANTUAN</h4>
            <ul className="flex flex-col gap-2 font-inter text-gray-200">
              <li><a href="#" className="hover:text-white">Cara Beli & Kunci Stok</a></li>
              <li><a href="#" className="hover:text-white">Pengiriman & Resi</a></li>
              <li><a href="#" className="hover:text-white">Retur & Refund</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-grotesk font-bold text-[18px] mb-4 text-acid-lime">SOSIAL</h4>
            <ul className="flex flex-col gap-2 font-inter text-gray-200">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t-[1.5px] border-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[14px] text-gray-400">
            &copy; {new Date().getFullYear()} Serius Store. All rights reserved.
          </p>
          <p className="font-inter text-[14px] text-gray-400">
            Prototype by Senior Frontend Engineer
          </p>
        </div>
      </div>
    </footer>
  );
};