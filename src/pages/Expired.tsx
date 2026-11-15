import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { HeaderMinimal } from '../components/layout/HeaderMinimal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Expired: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, products } = useStore();
  
  const order = orders.find(o => o.id === orderId);
  const product = products.find(p => p.id === order?.productId);

  if (!order || !product) return null;

  const isStillAvailable = product.status === 'available';

  return (
    <div className="min-h-screen bg-paper pb-24">
      <HeaderMinimal />
      <main className="max-w-[800px] mx-auto px-4 py-12 flex flex-col items-center text-center">
        
        <div className="w-24 h-24 bg-tomato border-[1.5px] border-ink shadow-brutal-sm flex items-center justify-center rounded-full mb-6 text-ink">
          <span className="font-mono font-bold text-[28px] tracking-tighter">00:00</span>
        </div>
        
        <h1 className="font-grotesk font-bold text-[32px] md:text-[40px] uppercase text-ink leading-tight mb-4">
          WAKTU HABIS,<br/>SAYANG BANGET
        </h1>
        <p className="font-inter text-gray-600 mb-8 max-w-md">
          Pesananmu (Order {order.id}) dibatalkan otomatis dan stok barang sudah dibuka lagi untuk semua pembeli.
        </p>

        <div className="w-full max-w-sm bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-6 mb-8 text-left relative overflow-hidden">
          {/* Status Product Saat Ini */}
          <div className="absolute top-3 left-3 z-10">
            {isStillAvailable ? (
              <Badge variant="lime">Stok Tersedia Lagi</Badge>
            ) : (
              <Badge variant="ink">Sudah Diambil Orang</Badge>
            )}
          </div>
          
          <div className={`w-full aspect-[4/5] bg-${product.photoColor} border-[1.5px] border-ink rounded-xl mb-4 relative`}>
            {!isStillAvailable && <div className="absolute inset-0 bg-ink/40 backdrop-blur-[1px] rounded-xl"></div>}
          </div>
          
          <h4 className="font-grotesk font-bold text-[18px] text-ink line-clamp-1">{product.name}</h4>
          <p className="font-inter text-[14px] text-gray-600 mb-4">{product.brand}</p>
          
          {isStillAvailable ? (
            <Button variant="primary" fullWidth onClick={() => navigate(`/checkout/${product.id}`)}>
              Amankan Lagi Sekarang
            </Button>
          ) : (
            <Button disabled fullWidth>Sold Out / Locked</Button>
          )}
        </div>

        <div className="bg-acid-lime border-[1.5px] border-ink p-4 rounded-xl max-w-md text-left shadow-brutal-sm">
          <span className="font-grotesk font-bold text-[14px] uppercase block mb-1">💡 Tips Belanja Serius</span>
          <p className="font-inter text-[14px] text-ink/80">Isi data alamat dulu dan siapkan M-Banking, baru tekan tombol "Bayar Sekarang". Timer 15 menit akan sangat terasa cepat!</p>
        </div>
        
        <Button variant="secondary" className="mt-8" onClick={() => navigate('/katalog')}>
          Lihat Semua Drop →
        </Button>
      </main>
    </div>
  );
};