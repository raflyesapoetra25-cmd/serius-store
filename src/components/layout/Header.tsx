import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { LockedStockDrawer } from '../ui/LockedStockDrawer';
import { CaraBeliModal } from '../ui/CaraBeliModal';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCaraBeliOpen, setIsCaraBeliOpen] = useState(false);

  const orders = useStore(state => state.orders);
  // Hitung jumlah order yang sedang di-hold (pending payment)
  const activeOrdersCount = orders.filter(o => o.status === 'pending_payment').length;

  return (
    <>
      <header className="w-full bg-paper border-b-[1.5px] border-ink sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[80px] h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-acid-lime border-[1.5px] border-ink shadow-brutal-sm flex items-center justify-center group-hover:translate-brutal-hover transition-all">
              <span className="font-grotesk font-bold text-lg md:text-xl text-ink leading-none">S</span>
            </div>
            <span className="font-grotesk font-bold text-2xl md:text-3xl uppercase tracking-tighter text-ink mt-1">
              Serius
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/katalog" className="font-grotesk font-bold text-[16px] uppercase hover:text-tomato transition-colors">
              Shop
            </Link>
            <Link to="/katalog" className="font-grotesk font-bold text-[16px] uppercase hover:text-tomato transition-colors">
              New Drop
            </Link>
            <button
              type="button"
              onClick={() => setIsCaraBeliOpen(true)}
              className="font-grotesk font-bold text-[16px] uppercase hover:text-tomato transition-colors cursor-pointer"
            >
              Cara Beli
            </button>
          </nav>

          {/* Tas Kunci Stok & Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Tombol Tas Desktop */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="hidden md:flex items-center gap-2 bg-ink text-acid-lime px-4 py-2 rounded-xl border-[1.5px] border-ink shadow-brutal-sm hover:translate-brutal-hover transition-all cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span className="font-grotesk font-bold text-[14px] uppercase mt-0.5">
                Tas ({activeOrdersCount})
              </span>
            </button>

            {/* Tombol Tas Mobile */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Buka tas kunci stok"
              className="md:hidden relative p-2 bg-ink text-acid-lime border-[1.5px] border-ink rounded-xl shadow-brutal-sm active:translate-brutal-hover"
            >
              <ShoppingBag size={20} />
              {activeOrdersCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-tomato text-white border-[1.5px] border-ink rounded-full font-mono text-[11px] font-bold flex items-center justify-center">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="md:hidden p-2 border-[1.5px] border-ink rounded-xl bg-white shadow-brutal-sm active:translate-brutal-hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-paper border-b-[1.5px] border-ink flex flex-col p-4 gap-4 shadow-brutal">
            <Link
              to="/katalog"
              className="font-grotesk font-bold text-[18px] uppercase p-2 border-b-[1.5px] border-ink/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/katalog"
              className="font-grotesk font-bold text-[18px] uppercase p-2 border-b-[1.5px] border-ink/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New Drop
            </Link>
            <button
              type="button"
              className="text-left font-grotesk font-bold text-[18px] uppercase p-2 border-b-[1.5px] border-ink/10"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCaraBeliOpen(true);
              }}
            >
              Cara Beli
            </button>
            <button
              type="button"
              className="text-left font-grotesk font-bold text-[18px] uppercase p-2 text-tomato"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDrawerOpen(true);
              }}
            >
              Tas Kunci Stok ({activeOrdersCount})
            </button>
          </div>
        )}
      </header>

      {/* Drawer Kunci Stok 15 Menit */}
      <LockedStockDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Modal Cara Beli */}
      <CaraBeliModal
        isOpen={isCaraBeliOpen}
        onClose={() => setIsCaraBeliOpen(false)}
      />
    </>
  );
};