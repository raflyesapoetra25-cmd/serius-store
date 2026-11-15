import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatRp } from '../utils/format';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useStore(state => state.products.find(p => p.id === id));

  // Scroll to top saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-grotesk font-bold text-2xl">Barang tidak ditemukan</h2>
        <Button onClick={() => navigate('/katalog')} className="mt-4">Kembali ke Katalog</Button>
      </div>
    );
  }

  const isAvailable = product.status === 'available';
  const isLocked = product.status === 'locked';
  const isSold = product.status === 'sold';

  // Helper untuk menentukan warna background fallback yang aman dibaca Tailwind
  const getBgColor = (color?: string) => {
    switch (color) {
      case 'lavender': return 'bg-purple-100';
      case 'amber': return 'bg-amber-100';
      case 'acid-lime': return 'bg-lime-200';
      default: return 'bg-gray-100';
    }
  };

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-[80px] py-8 w-full">
      {/* Breadcrumb */}
      <p className="font-inter text-[14px] text-gray-600 mb-6 uppercase tracking-[0.06em]">
        <span className="cursor-pointer hover:text-ink transition-colors" onClick={() => navigate('/')}>Beranda</span> /{' '}
        <span className="cursor-pointer hover:text-ink transition-colors" onClick={() => navigate('/katalog')}>Shop</span> /{' '}
        <span className="text-ink font-medium">{product.brand}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24">
        {/* KIRI: Galeri Foto */}
        <div className="space-y-4">
          <div className={`relative aspect-[4/5] w-full ${getBgColor(product.photoColor)} rounded-2xl border-[1.5px] border-ink shadow-brutal flex items-center justify-center overflow-hidden`}>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-500 hover:scale-105" 
              />
            ) : (
              <span className="font-grotesk font-bold text-ink/20 text-4xl -rotate-12 select-none z-0">FOTO OUTFIT</span>
            )}
            
            <div className="absolute top-4 left-4 z-20">
              {isAvailable && <Badge variant="lime" className="text-[14px] px-3 py-1.5 shadow-brutal-sm">1 PCS ONLY</Badge>}
              {isLocked && <Badge variant="amber" className="text-[14px] px-3 py-1.5 shadow-brutal-sm">DIKUNCI</Badge>}
              {isSold && <Badge variant="ink" className="text-[14px] px-3 py-1.5 shadow-brutal-sm">SOLD OUT</Badge>}
            </div>
            
            {/* Overlay untuk status dikunci/sold out */}
            {isLocked && <div className="absolute inset-0 bg-ink/20 backdrop-blur-[1px] z-10"></div>}
            {isSold && <div className="absolute inset-0 bg-ink/45 backdrop-blur-[2px] grayscale z-10"></div>}
          </div>
          
          {/* Thumbnails (Disembunyikan jika tidak ada gambar utama supaya lebih rapi) */}
          {product.image && (
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white border-[1.5px] border-ink rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:border-black hover:shadow-brutal-sm transition-all">
                  <img 
                    src={product.image} 
                    alt={`Thumbnail ${i}`} 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100" 
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KANAN: Detail & Aksi */}
        <div className="flex flex-col">
          <p className="font-inter font-medium text-[14px] md:text-[16px] uppercase tracking-[0.06em] text-gray-600 mb-2">
            {product.brand}
          </p>
          <h1 className="font-grotesk font-bold text-[32px] md:text-[40px] leading-[1.1] uppercase text-ink mb-6">
            {product.name}
          </h1>

          <div className="flex items-end gap-4 mb-6">
            <span className={`font-mono font-bold text-[32px] md:text-[40px] leading-none ${isSold ? 'line-through text-gray-600' : 'text-ink'}`}>
              {formatRp(product.price)}
            </span>
            <span className="font-inter text-[16px] text-gray-400 line-through mb-1">
              Retail: {formatRp(product.retailPrice)}
            </span>
          </div>

          <div className="bg-acid-lime border-[1.5px] border-ink px-4 py-3 rounded-xl flex items-start gap-3 mb-8 shadow-brutal-sm">
            <span className="text-xl shrink-0 mt-0.5">⏱️</span>
            <p className="font-inter text-[14px] text-ink font-medium leading-snug">Stok dikunci 15 menit setelah checkout — aman dari rebutan.</p>
          </div>

          {/* Spesifikasi Tabel Brutalist */}
          <div className="border-[1.5px] border-ink rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-3 border-b-[1.5px] border-ink bg-paper">
              <div className="col-span-1 p-3 border-r-[1.5px] border-ink font-inter font-medium text-[14px] text-gray-600 flex items-center">Size Label</div>
              <div className="col-span-2 p-3 font-inter font-bold text-[16px] text-ink">{product.size} <span className="font-normal text-[14px] text-gray-500 ml-1">(Hanya 1 pcs)</span></div>
            </div>
            <div className="grid grid-cols-3 border-b-[1.5px] border-ink">
              <div className="col-span-1 p-3 border-r-[1.5px] border-ink font-inter font-medium text-[14px] text-gray-600 flex items-center">Ukuran Cm</div>
              <div className="col-span-2 p-3 font-inter text-[16px] text-ink leading-relaxed">
                {product.measurements.lingkarDada && <span className="mr-3 whitespace-nowrap">LD: <b>{product.measurements.lingkarDada}cm</b></span>}
                {product.measurements.panjang && <span className="mr-3 whitespace-nowrap">P: <b>{product.measurements.panjang}cm</b></span>}
                {product.measurements.bahu && <span className="mr-3 whitespace-nowrap">Bahu: <b>{product.measurements.bahu}cm</b></span>}
                {product.measurements.lingkarPinggang && <span className="mr-3 whitespace-nowrap">LP: <b>{product.measurements.lingkarPinggang}cm</b></span>}
              </div>
            </div>
            <div className="grid grid-cols-3 border-b-[1.5px] border-ink bg-paper">
              <div className="col-span-1 p-3 border-r-[1.5px] border-ink font-inter font-medium text-[14px] text-gray-600 flex items-center">Bahan & Warna</div>
              <div className="col-span-2 p-3 font-inter text-[16px] text-ink">{product.material} · {product.color}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1 p-3 border-r-[1.5px] border-ink font-inter font-medium text-[14px] text-gray-600 flex items-center">Kondisi</div>
              <div className="col-span-2 p-3 font-inter font-bold text-[16px] text-ink">{product.condition}</div>
            </div>
          </div>

          {/* Catatan Minus jika ada */}
          {product.conditionNote && (
            <div className="border-[1.5px] border-tomato bg-[#fff5f5] p-4 rounded-xl mb-8">
              <h4 className="font-grotesk font-bold text-[14px] uppercase text-tomato mb-1">Catatan Kondisi</h4>
              <p className="font-inter text-[14px] text-ink">{product.conditionNote}</p>
            </div>
          )}

          {/* Action Buttons (Sticky on Mobile) */}
          <div className="fixed md:static bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t-[1.5px] border-ink md:border-t-0 z-50 md:z-auto">
            {isAvailable ? (
              <Button variant="primary" fullWidth className="py-4 text-[16px] md:text-[18px] shadow-brutal hover:-translate-y-1 transition-transform" onClick={() => navigate(`/checkout/${product.id}`)}>
                AMANKAN SEKARANG
              </Button>
            ) : (
              <Button disabled fullWidth className="py-4 text-[16px] md:text-[18px] bg-gray-200 text-gray-500">
                {isSold ? 'SOLD OUT' : 'SEDANG DIKUNCI PEMBELI LAIN'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};