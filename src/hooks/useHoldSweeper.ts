import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useHoldSweeper = () => {
  const { orders, expireOrder } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      // Cari semua pesanan yang belum dibayar dan waktunya sudah habis
      const expiredOrders = orders.filter(
        o => o.status === 'pending_payment' && o.expiresAt <= now
      );

      // Jalankan fungsi expireOrder untuk melepaskan barang kembali ke katalog
      expiredOrders.forEach(order => {
        expireOrder(order.id);
      });
    }, 1000); // Cek setiap 1 detik

    return () => clearInterval(interval);
  }, [orders, expireOrder]);
};