import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Copy, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { HeaderMinimal } from '../components/layout/HeaderMinimal';
import { CountdownTimer } from '../components/layout/CountdownTimer';
import { formatRp } from '../utils/format';

// Ganti dengan nomor WhatsApp admin toko (awalan 62 tanpa tanda + atau 0)
const ADMIN_WHATSAPP = '62895384934541';

export const Payment: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, products, markPaid, cancelOrder } = useStore();
  const [copiedField, setCopiedField] = useState<'nominal' | 'rekening' | null>(null);

  const order = orders.find(o => o.id === orderId);

  // Redirect jika order tidak ada atau statusnya sudah berubah
  useEffect(() => {
    if (!order) {
      navigate('/katalog');
    } else if (order.status === 'expired') {
      navigate(`/expired/${order.id}`);
    } else if (order.status === 'paid' || order.status === 'qc') {
      navigate(`/sukses/${order.id}`);
    } else if (order.status === 'cancelled') {
      navigate('/katalog');
    }
  }, [order, navigate]);

  if (!order || order.status !== 'pending_payment') return null;

  const product = products.find(p => p.id === order.productId);

  // Pisahkan nominal utama dan 3 digit kode unik terakhir
  const nominalString = order.total.toString();
  const baseNominal = nominalString.slice(0, -3);
  const uniqueCode = nominalString.slice(-3);

  const handleCopy = (text: string, field: 'nominal' | 'rekening') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmWhatsApp = () => {
    const itemLabel = product
      ? `${product.brand} - ${product.name} (Size ${product.size})`
      : order.productId;

    const fullAddress = [
      order.buyer.address,
      order.buyer.district,
      order.buyer.city,
      order.buyer.province,
      order.buyer.postalCode,
    ]
      .filter(Boolean)
      .join(', ');

    const message = [
      `Halo Admin *SERIUS STORE*! Saya mau konfirmasi pembayaran:`,
      ``,
      `*ID Pesanan:* ${order.id}`,
      `*Item:* ${itemLabel}`,
      `*Total Transfer:* ${formatRp(order.total)} (Kode Unik: ${order.kodeUnik})`,
      `*Metode:* ${order.buyer.paymentMethod}`,
      ``,
      `*Data Penerima:*`,
      `Nama: ${order.buyer.name}`,
      `No. WA: ${order.buyer.whatsapp}`,
      `Kurir: ${order.buyer.courier}`,
      `Alamat: ${fullAddress}`,
      ``,
      `Berikut saya lampirkan bukti transfernya ya. Terima kasih!`,
    ].join('\n');

    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSimulatePayment = () => {
    markPaid(order.id);
    navigate(`/sukses/${order.id}`);
  };

  const handleCancel = () => {
    if (window.confirm('Yakin ingin membatalkan pesanan? Stok barang akan dilepas lagi.')) {
      cancelOrder(order.id);
    }
  };

  return (
    <div className="min-h-screen bg-paper pb-24">
      <HeaderMinimal />

      <main className="max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-6">
        <CountdownTimer expiresAt={order.expiresAt} />

        {/* Box Nominal Transfer */}
        <div className="bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-6 md:p-8 text-center">
          <h2 className="font-grotesk font-bold text-[18px] text-gray-600 uppercase mb-2">
            Total Transfer
          </h2>
          <div className="flex items-center justify-center font-mono font-bold text-[40px] md:text-[48px] text-ink mb-6 tracking-tighter">
            Rp {baseNominal}
            <span className="bg-acid-lime px-2 py-1 border-[1.5px] border-ink rounded-lg ml-1">
              {uniqueCode}
            </span>
          </div>
          <Button
            variant="secondary"
            onClick={() => handleCopy(order.total.toString(), 'nominal')}
            className="inline-flex items-center gap-2"
          >
            {copiedField === 'nominal' ? <Check size={16} /> : <Copy size={16} />}
            {copiedField === 'nominal' ? 'Nominal Tersalin!' : 'Salin Nominal'}
          </Button>
          <p className="font-inter text-[14px] text-tomato mt-4">
            *Transfer tepat hingga 3 digit terakhir agar pembayaran mudah diverifikasi.
          </p>
        </div>

        {/* Box Rekening Tujuan */}
        <div className="bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-6 md:p-8">
          <h2 className="font-grotesk font-bold text-[20px] uppercase text-ink mb-4 border-b-[1.5px] border-ink pb-4">
            Transfer ke Bank BCA
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="font-mono font-bold text-[24px] text-ink tracking-widest mb-1">
                8830 1234 56
              </p>
              <p className="font-inter text-[14px] text-gray-600 uppercase tracking-widest">
                A.N. Serius Store Indonesia
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => handleCopy('8830123456', 'rekening')}
              className="inline-flex items-center gap-2"
            >
              {copiedField === 'rekening' ? <Check size={16} /> : <Copy size={16} />}
              {copiedField === 'rekening' ? 'Rekening Tersalin!' : 'Salin Rekening'}
            </Button>
          </div>
        </div>

        {/* Box Konfirmasi WhatsApp */}
        <div className="bg-acid-lime/40 border-[1.5px] border-ink rounded-2xl shadow-brutal p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/70 block">
                LANGKAH TERAKHIR
              </span>
              <h3 className="font-grotesk font-bold text-[20px] uppercase text-ink mt-0.5">
                Sudah Transfer? Kirim Bukti ke WA
              </h3>
              <p className="font-inter text-[13px] text-ink/80 mt-1">
                Format pesan berisi ID pesanan, nama item, nominal kode unik, dan alamatmu sudah terisi otomatis.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={handleConfirmWhatsApp}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#25D366] text-ink hover:bg-[#20bd5a]"
            >
              <MessageCircle size={18} />
              Konfirmasi WhatsApp
            </Button>
          </div>
        </div>

        {/* Status & Batal */}
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-3 text-ink">
            <div className="w-5 h-5 border-[1.5px] border-ink border-t-transparent rounded-full animate-spin"></div>
            <span className="font-inter font-medium">Menunggu pembayaranmu...</span>
          </div>
          <button
            onClick={handleCancel}
            className="font-inter text-[14px] text-gray-600 hover:text-tomato underline mt-2 cursor-pointer"
          >
            Batalkan pesanan
          </button>
        </div>

        {/* TOMBOL SIMULASI (Hanya untuk Prototype) */}
        <div className="mt-8 border-2 border-dashed border-tomato rounded-2xl p-6 bg-tomato/10 text-center">
          <h3 className="font-grotesk font-bold text-[16px] text-tomato uppercase mb-4">
            PROTOTYPE DEMO ACTION
          </h3>
          <Button variant="lime" fullWidth className="mb-3" onClick={handleSimulatePayment}>
            Simulasi: Pembayaran Berhasil
          </Button>
        </div>
      </main>
    </div>
  );
};