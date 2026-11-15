import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { DropCountdownBanner } from '../components/ui/DropCountdownBanner';
import type { Category } from '../types';

const CATEGORIES: (Category | 'Semua')[] = [
  'Semua',
  'Atasan',
  'Outerwear',
  'Bawahan',
  'Dress',
  'Aksesoris',
];

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useStore();

  const initialCategory = (searchParams.get('kategori') as Category) || 'Semua';
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua'>(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'Semua'
  );
  const [selectedSize, setSelectedSize] = useState<string>('Semua');
  const [hideSold, setHideSold] = useState<boolean>(false);

  // Sinkronkan filter jika user klik kategori dari halaman Home
  useEffect(() => {
    const paramCat = searchParams.get('kategori') as Category | null;
    if (paramCat && CATEGORIES.includes(paramCat)) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams]);

  // Ambil daftar size unik yang tersedia di katalog
  const availableSizes = ['Semua', ...Array.from(new Set(products.map((p) => p.size)))];

  const handleSelectCategory = (cat: Category | 'Semua') => {
    setSelectedCategory(cat);
    if (cat === 'Semua') {
      searchParams.delete('kategori');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ kategori: cat });
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchSize = selectedSize === 'Semua' || p.size === selectedSize;
    const matchStatus = !hideSold || p.status !== 'sold';
    return matchCategory && matchSize && matchStatus;
  });

  const resetFilters = () => {
    setSelectedCategory('Semua');
    setSelectedSize('Semua');
    setHideSold(false);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-paper pb-20">
      <main className="max-w-[1280px] mx-auto px-3 md:px-[60px] py-6 md:py-10 space-y-6">
        {/* Countdown Next Drop */}
        <DropCountdownBanner />

        {/* Banner / Judul Section */}
        <div className="bg-acid-lime border-[1.5px] border-ink p-5 md:p-8 rounded-2xl shadow-brutal flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-[10px] md:text-xs uppercase bg-ink text-white px-2.5 py-1 rounded-md font-bold">
              GEN Z THRIFT STORE
            </span>
            <h1 className="font-grotesk font-bold text-2xl md:text-5xl uppercase text-ink mt-2 tracking-tight">
              Katalog Pilihan
            </h1>
            <p className="font-inter text-xs md:text-base text-ink/80 mt-1">
              Barang original terkurasi. Siapa cepat dia dapat! Stok terkunci otomatis 15 menit.
            </p>
          </div>
          <div className="bg-white border-[1.5px] border-ink rounded-xl px-4 py-2.5 shadow-brutal-sm shrink-0">
            <span className="font-mono text-xs font-bold text-ink">
              Menampilkan {filteredProducts.length} item
            </span>
          </div>
        </div>

        {/* Baris Filter Kategori & Toggle Sembunyikan Sold */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-grotesk font-bold text-xs md:text-sm whitespace-nowrap border-[1.5px] transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-ink text-white border-ink shadow-brutal-sm'
                    : 'bg-white text-ink border-ink hover:bg-gray-100'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Toggle Sembunyikan Sold */}
          <label className="inline-flex items-center gap-2.5 bg-white border-[1.5px] border-ink rounded-xl px-3.5 py-2 shadow-brutal-sm cursor-pointer select-none self-start md:self-auto shrink-0">
            <input
              type="checkbox"
              checked={hideSold}
              onChange={(e) => setHideSold(e.target.checked)}
              className="hidden"
            />
            <div
              className={`w-9 h-5 rounded-full border-[1.5px] border-ink p-0.5 transition-colors flex items-center ${
                hideSold ? 'bg-acid-lime justify-end' : 'bg-gray-200 justify-start'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-ink block" />
            </div>
            <span className="font-grotesk font-bold text-xs uppercase text-ink">
              Sembunyikan Sold
            </span>
          </label>
        </div>

        {/* Filter Ukuran (Size) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span className="font-mono text-xs font-bold uppercase text-gray-600 mr-1 shrink-0">
            SIZE:
          </span>
          {availableSizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs whitespace-nowrap border-[1.5px] transition-all cursor-pointer ${
                selectedSize === sz
                  ? 'bg-amber text-ink border-ink shadow-brutal-sm'
                  : 'bg-white text-ink border-ink/40 hover:border-ink'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-8">
            <h3 className="font-grotesk font-bold text-xl uppercase mb-2">
              Tidak Ada Item yang Cocok
            </h3>
            <p className="font-inter text-sm text-gray-600 mb-5">
              Coba ganti filter kategori/ukuran atau matikan opsi sembunyikan barang sold.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 bg-acid-lime text-ink font-grotesk font-bold text-xs uppercase border-[1.5px] border-ink rounded-xl shadow-brutal-sm hover:translate-brutal-hover cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};