import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { formatRp } from '../../utils/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const isAvailable = product.status === 'available';

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
    <div 
      onClick={() => isAvailable && navigate(`/produk/${product.id}`)}
      className={`group bg-white border-[1.5px] border-ink rounded-2xl overflow-hidden shadow-brutal transition-all duration-200 ${
        isAvailable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-brutal-lg' : 'opacity-75 cursor-not-allowed'
      }`}
    >
      {/* Container Foto Produk */}
      <div className={`relative w-full h-56 sm:h-64 ${getBgColor(product.photoColor)} border-b-[1.5px] border-ink overflow-hidden flex items-center justify-center`}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <span className="font-grotesk font-bold text-ink/20 text-2xl -rotate-12 select-none">
            FOTO OUTFIT
          </span>
        )}

        {/* Badge Status */}
        <div className="absolute top-3 left-3 z-20">
          {!isAvailable ? (
            <span className="bg-ink text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              SOLD OUT
            </span>
          ) : (
            <span className="bg-acid-lime text-ink border-[1.5px] border-ink font-mono text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-brutal-sm">
              1 PCS ONLY
            </span>
          )}
        </div>
      </div>

      {/* Informasi Produk */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <span className="font-inter font-bold text-[11px] uppercase tracking-wider text-gray-500 block">
              {product.brand}
            </span>
            <h3 className="font-grotesk font-bold text-base sm:text-lg uppercase text-ink leading-snug line-clamp-1 mt-0.5 group-hover:underline">
              {product.name}
            </h3>
          </div>
          <span className="font-mono text-xs font-bold bg-gray-100 border border-ink/20 px-2 py-1 rounded-lg shrink-0">
            Size {product.size}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="font-inter text-[11px] text-gray-500 block">Kondisi</span>
            <span className="font-inter font-bold text-xs text-ink">{product.condition}</span>
          </div>
          <div className="text-right">
            <span className="font-mono font-bold text-base sm:text-lg text-ink">
              {formatRp(product.price)}
            </span>
          </div>
        </div>

        {/* Tombol Aksi di Kartu */}
        <div className="pt-1">
          <button 
            disabled={!isAvailable}
            className={`w-full py-2.5 rounded-xl font-grotesk font-bold text-xs uppercase border-[1.5px] border-ink transition-all ${
              isAvailable 
                ? 'bg-acid-lime text-ink shadow-brutal-sm group-hover:bg-ink group-hover:text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAvailable ? 'AMANKAN SEKARANG →' : 'TERJUAL'}
          </button>
        </div>
      </div>
    </div>
  );
};