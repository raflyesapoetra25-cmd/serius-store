import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { HeaderMinimal } from '../components/layout/HeaderMinimal';
import { formatRp } from '../utils/format';
import { Printer, ShoppingBag, ShieldCheck } from 'lucide-react';

export const Success: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, products } = useStore();

  // Cari data pesanan berdasarkan ID
  const order = orders.find(o => o.id === orderId);
  const product = order ? products.find(p => p.id === order.productId) : null;

  if (!order || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-paper">
        <h2 className="font-grotesk font-bold text-3xl mb-2 uppercase">Nota Tidak Ditemukan</h2>
        <p className="font-inter text-gray-600 mb-6">Data transaksi tidak valid atau sudah kedaluwarsa.</p>
        <Button onClick={() => navigate('/katalog')}>Kembali ke Katalog</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-paper pb-24">
      <HeaderMinimal />
      
      <main className="max-w-[800px] mx-auto px-4 py-8">
        
        {/* KARTU UTAMA STRUK / INVOICE */}
        <div className="bg-white border-[2px] border-ink p-8 rounded-2xl shadow-brutal space-y-8 relative overflow-hidden">
          
          {/* Header Struk */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-[1.5px] border-ink pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-acid-lime bg-ink px-3 py-1 rounded-full w-fit mb-2">
                <ShieldCheck className="w-4 h-4 text-acid-lime" />
                <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-white">TRANSAKSI BERHASIL & LUNAS</span>
              </div>
              <h1 className="font-grotesk font-bold text-[28px] uppercase text-ink">STRUK PEMBELIAN RESMI</h1>
              <p className="font-mono text-[13px] text-gray-500 mt-1">Invoice ID: {order.id}</p>
            </div>
            <div className="text-left md:text-right">
              <span className="font-inter text-[12px] text-gray-500 block">Waktu Transaksi</span>
              <span className="font-mono font-medium text-[14px] text-ink">
                {new Date(order.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full' })}
              </span>
            </div>
          </div>

          {/* Status Progress Pengiriman */}
          <div className="bg-paper border-[1.5px] border-ink p-4 rounded-xl">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto bg-acid-lime border-[1.5px] border-ink rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-brutal-sm">1</div>
                <p className="font-grotesk font-bold text-[11px] uppercase">Dibayar</p>
              </div>
              <div className="space-y-1 opacity-50">
                <div className="w-8 h-8 mx-auto bg-white border-[1.5px] border-ink rounded-full flex items-center justify-center font-mono font-bold text-xs">2</div>
                <p className="font-grotesk font-bold text-[11px] uppercase">QC</p>
              </div>
              <div className="space-y-1 opacity-50">
                <div className="w-8 h-8 mx-auto bg-white border-[1.5px] border-ink rounded-full flex items-center justify-center font-mono font-bold text-xs">3</div>
                <p className="font-grotesk font-bold text-[11px] uppercase">Packing</p>
              </div>
              <div className="space-y-1 opacity-50">
                <div className="w-8 h-8 mx-auto bg-white border-[1.5px] border-ink rounded-full flex items-center justify-center font-mono font-bold text-xs">4</div>
                <p className="font-grotesk font-bold text-[11px] uppercase">Dikirim</p>
              </div>
            </div>
          </div>

          {/* Detail Produk */}
          <div>
            <h3 className="font-grotesk font-bold text-[16px] uppercase text-ink mb-4 border-b border-gray-200 pb-2">Detail Barang Thrift</h3>
            <div className="flex items-center gap-4 p-4 border-[1.5px] border-ink rounded-xl bg-paper">
              <div className={`w-16 h-20 bg-${product.photoColor} border-[1.5px] border-ink rounded-lg flex items-center justify-center shrink-0 overflow-hidden`}>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-grotesk text-[10px] font-bold text-ink/30 -rotate-12">FOTO</span>
                )}
              </div>
              <div className="flex-1">
                <span className="font-inter font-bold text-[11px] uppercase bg-ink text-white px-2 py-0.5 rounded">{product.brand}</span>
                <h4 className="font-grotesk font-bold text-[16px] text-ink mt-1">{product.name}</h4>
                <p className="font-inter text-[13px] text-gray-600">Size: {product.size} | Kondisi: {product.condition}</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-[16px] text-ink">{formatRp(product.price)}</span>
              </div>
            </div>
          </div>

          {/* Rincian Alamat & Pembayaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-paper border-[1.5px] border-ink p-4 rounded-xl space-y-2">
              <h4 className="font-grotesk font-bold text-[14px] uppercase text-ink border-b border-ink/20 pb-1">Tujuan Pengiriman</h4>
              <p className="font-inter font-bold text-[14px] text-ink">{order.buyer.name} <span className="font-normal text-gray-600">({order.buyer.whatsapp})</span></p>
              <p className="font-inter text-[13px] text-gray-600 leading-relaxed">{order.buyer.address}, Kec. {order.buyer.district}, {order.buyer.city}, {order.buyer.province} {order.buyer.postalCode}</p>
              <p className="font-mono text-[12px] font-bold text-ink pt-1">Kurir: {order.buyer.courier}</p>
            </div>

            <div className="bg-paper border-[1.5px] border-ink p-4 rounded-xl space-y-3">
              <h4 className="font-grotesk font-bold text-[14px] uppercase text-ink border-b border-ink/20 pb-1">Rincian Biaya</h4>
              <div className="flex justify-between font-inter text-[13px]">
                <span className="text-gray-600">Harga Barang</span>
                <span className="font-mono font-bold">{formatRp(order.subtotal)}</span>
              </div>
              <div className="flex justify-between font-inter text-[13px]">
                <span className="text-gray-600">Ongkos Kirim</span>
                <span className="font-mono font-bold">{formatRp(order.buyer.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-inter text-[14px] border-t border-ink/20 pt-2">
                <span className="font-grotesk font-bold uppercase">Total Dibayar</span>
                <span className="font-mono font-bold text-[18px] text-ink">{formatRp(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-[1.5px] border-ink">
            <Button variant="secondary" fullWidth onClick={handlePrint} className="py-3 flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /> CETAK / UNDUH INVOICE
            </Button>
            <Button variant="primary" fullWidth onClick={() => navigate('/katalog')} className="py-3 flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> LANJUT BELANJA
            </Button>
          </div>

        </div>

      </main>
    </div>
  );
};