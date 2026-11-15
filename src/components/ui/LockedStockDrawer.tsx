import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { formatRp } from '../../utils/format';
import { Button } from './Button';

interface LockedStockDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LockedStockDrawer: React.FC<LockedStockDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { orders, products, expireOrder, cancelOrder } = useStore();
  const [now, setNow] = useState(() => Date.now());

  const pendingOrders = orders.filter((o) => o.status === 'pending_payment');

  // Timer realtime setiap 1 detik + otomatis lepas kunci jika waktu 15 menit habis
  useEffect(() => {
    if (pendingOrders.length === 0) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);

      pendingOrders.forEach((order) => {
        if (order.expiresAt <= currentTime) {
          expireOrder(order.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pendingOrders, expireOrder]);

  // Tutup drawer dengan tombol ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

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
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#FAF9F6] border-l-[2px] border-ink flex flex-col justify-between shadow-2xl"
      >
        {/* Header Drawer */}
        <div className="bg-acid-lime border-b-[2px] border-ink px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/70 block">
              KUNCI STOK AKTIF (15 MENIT)
            </span>
            <h2 className="font-grotesk font-bold text-xl uppercase text-ink leading-tight">
              BARANG DIAMANKAN ({pendingOrders.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup drawer"
            className="w-9 h-9 bg-white border-[1.5px] border-ink rounded-lg font-mono font-bold text-base text-ink shadow-brutal-sm hover:bg-tomato hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Daftar Pesanan Terkunci */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {pendingOrders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-14 h-14 bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal-sm flex items-center justify-center font-grotesk font-bold text-xl mb-4">
                0
              </div>
              <h3 className="font-grotesk font-bold text-lg uppercase text-ink mb-1">
                Belum Ada Stok Dikunci
              </h3>
              <p className="font-inter text-sm text-gray-600 mb-6">
                Barang yang kamu checkout akan otomatis terkunci di sini selama 15 menit supaya tidak direbut orang lain.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  onClose();
                  navigate('/katalog');
                }}
              >
                Cari Thrift Sekarang →
              </Button>
            </div>
          ) : (
            pendingOrders.map((order) => {
              const product = products.find((p) => p.id === order.productId);
              const remainingMs = Math.max(0, order.expiresAt - now);
              const isUrgent = remainingMs < 3 * 60 * 1000; // Kurang dari 3 menit

              return (
                <div
                  key={order.id}
                  className="bg-white border-[1.5px] border-ink rounded-2xl p-4 shadow-brutal-sm space-y-3"
                >
                  {/* Baris Atas: Order ID & Live Timer */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-200">
                    <span className="font-mono text-[11px] font-bold text-gray-600">
                      {order.id}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md border-[1.5px] border-ink ${
                        isUrgent ? 'bg-tomato text-white animate-pulse' : 'bg-amber text-ink'
                      }`}
                    >
                      Sisa {formatCountdown(remainingMs)}
                    </span>
                  </div>

                  {/* Info Produk */}
                  <div className="flex gap-3.5">
                    <div
                      className={`relative w-16 h-20 ${getBgColor(product?.photoColor)} border-[1.5px] border-ink rounded-lg shrink-0 overflow-hidden flex items-center justify-center`}
                    >
                      {product?.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-grotesk text-[9px] font-bold text-ink/30 -rotate-12">
                          FOTO
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-inter font-bold text-[11px] uppercase text-gray-500 block">
                        {product?.brand ?? 'Thrift Item'} · Size {product?.size ?? '-'}
                      </span>
                      <h3 className="font-grotesk font-bold text-sm uppercase text-ink line-clamp-1 mt-0.5">
                        {product?.name ?? order.productId}
                      </h3>
                      <div className="mt-2">
                        <span className="font-mono font-bold text-base text-ink block leading-none">
                          {formatRp(order.total)}
                        </span>
                        <span className="font-inter text-[11px] text-gray-500">
                          Termasuk kode unik +{order.kodeUnik}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="primary"
                      fullWidth
                      className="py-2 text-xs"
                      onClick={() => {
                        onClose();
                        navigate(`/bayar/${order.id}`);
                      }}
                    >
                      Lanjut Bayar →
                    </Button>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-3 py-2 bg-white border-[1.5px] border-ink rounded-xl font-grotesk font-bold text-xs uppercase text-ink hover:bg-tomato hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      Lepas
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Drawer */}
        <div className="p-4 bg-white border-t-[1.5px] border-ink">
          <p className="font-inter text-[11px] text-gray-500 text-center">
            Stok otomatis kembali ke katalog jika pembayaran melewati batas 15 menit.
          </p>
        </div>
      </div>
    </div>
  );
};