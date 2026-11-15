import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { HeaderMinimal } from '../components/layout/HeaderMinimal';
import { formatRp } from '../utils/format';

export const Checkout: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, createOrder } = useStore();
  const product = products.find(p => p.id === id);

  const [form, setForm] = useState({
    name: '', whatsapp: '', address: '', province: '', city: '', district: '', postalCode: ''
  });
  const [courier, setCourier] = useState('JNE Reguler');
  const [shippingCost, setShippingCost] = useState(18000);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  if (!product || product.status !== 'available') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-grotesk font-bold text-3xl mb-2 uppercase">Yah, Telat!</h2>
        <p className="font-inter text-gray-600 mb-6">Barang ini baru saja diambil pembeli lain atau sudah sold out.</p>
        <Button onClick={() => navigate('/katalog')}>Cari Barang Lain</Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: false });
  };

  const handleCheckout = () => {
    const newErrors: Record<string, boolean> = {};
    Object.entries(form).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = true;
    });
    if (!agreed) newErrors.agreed = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
      return;
    }

    const buyerData = { ...form, courier, shippingCost, paymentMethod: 'Transfer Bank' };
    const orderId = createOrder(product.id, buyerData);

    if (orderId) {
      navigate(`/bayar/${orderId}`);
    } else {
      navigate('/katalog');
    }
  };

  // Helper untuk warna latar belakang yang aman dibaca Tailwind
  const getBgColor = (color?: string) => {
    switch (color) {
      case 'lavender': return 'bg-purple-100';
      case 'amber': return 'bg-amber-100';
      case 'acid-lime': return 'bg-lime-200';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-paper pb-24">
      <HeaderMinimal />
      
      <main className="max-w-[1280px] mx-auto px-4 md:px-[80px] py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KIRI: Form Data */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          
          <div className="bg-white border-[1.5px] border-ink p-6 rounded-2xl shadow-brutal">
            <h2 className="font-grotesk font-bold text-[24px] uppercase text-ink mb-6 border-b-[1.5px] border-ink pb-4">Data Pembeli</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">Nama Lengkap</label>
                <input name="name" value={form.name} onChange={handleInputChange} className={`w-full bg-paper border-[1.5px] ${errors.name ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter`} placeholder="Misal: Budi Santoso" />
              </div>
              <div>
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">No. WhatsApp</label>
                <input name="whatsapp" type="tel" value={form.whatsapp} onChange={handleInputChange} className={`w-full bg-paper border-[1.5px] ${errors.whatsapp ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter`} placeholder="0812..." />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">Alamat Lengkap</label>
                <textarea name="address" value={form.address} onChange={handleInputChange} rows={3} className={`w-full bg-paper border-[1.5px] ${errors.address ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter resize-none`} placeholder="Nama jalan, RT/RW, patokan..." />
              </div>
              <div>
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">Provinsi</label>
                <input name="province" value={form.province} onChange={handleInputChange} className={`w-full bg-paper border-[1.5px] ${errors.province ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter`} />
              </div>
              <div>
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">Kota / Kabupaten</label>
                <input name="city" value={form.city} onChange={handleInputChange} className={`w-full bg-paper border-[1.5px] ${errors.city ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter`} />
              </div>
              <div>
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">Kecamatan</label>
                <input name="district" value={form.district} onChange={handleInputChange} className={`w-full bg-paper border-[1.5px] ${errors.district ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter`} />
              </div>
              <div>
                <label className="block font-inter font-medium text-[14px] text-ink mb-2">Kode Pos</label>
                <input name="postalCode" value={form.postalCode} onChange={handleInputChange} className={`w-full bg-paper border-[1.5px] ${errors.postalCode ? 'border-tomato' : 'border-ink'} rounded-xl px-4 py-3 font-inter`} />
              </div>
            </div>
          </div>

          <div className="bg-white border-[1.5px] border-ink p-6 rounded-2xl shadow-brutal">
            <h2 className="font-grotesk font-bold text-[24px] uppercase text-ink mb-6 border-b-[1.5px] border-ink pb-4">2. Pilih Kurir</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'JNE Reguler', price: 18000, est: '2-3 Hari' },
                { name: 'J&T Express', price: 17000, est: '2-3 Hari' },
                { name: 'SiCepat BEST', price: 20000, est: '1-2 Hari' }
              ].map(c => (
                <div 
                  key={c.name}
                  onClick={() => { setCourier(c.name); setShippingCost(c.price); }}
                  className={`border-[1.5px] rounded-xl p-4 cursor-pointer transition-colors ${courier === c.name ? 'bg-acid-lime border-ink shadow-brutal-sm' : 'bg-white border-gray-200 hover:border-ink'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-grotesk font-bold text-[16px] text-ink">{c.name}</span>
                    <span className="font-mono font-bold text-ink">{formatRp(c.price)}</span>
                  </div>
                  <span className="font-inter text-[14px] text-gray-600">Estimasi: {c.est}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: Ringkasan Pesanan */}
        <div className="col-span-1">
          <div className="bg-white border-[1.5px] border-ink p-6 rounded-2xl shadow-brutal sticky top-24">
            <h2 className="font-grotesk font-bold text-[24px] uppercase text-ink mb-6 border-b-[1.5px] border-ink pb-4">Ringkasan</h2>
            
            <div className="flex gap-4 mb-6">
              <div className={`relative w-20 h-24 ${getBgColor(product.photoColor)} border-[1.5px] border-ink rounded-lg flex items-center justify-center shrink-0 overflow-hidden`}>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover object-center" />
                ) : (
                  <span className="font-grotesk text-[10px] font-bold text-ink/30 -rotate-12 select-none">FOTO</span>
                )}
              </div>
              <div>
                <p className="font-inter font-medium text-[12px] uppercase text-gray-600">{product.brand}</p>
                <h4 className="font-grotesk font-bold text-[16px] leading-tight text-ink line-clamp-2 mt-1">{product.name}</h4>
                <p className="font-inter text-[14px] text-gray-600 mt-1">Size {product.size}</p>
              </div>
            </div>

            <div className="space-y-3 font-inter text-[14px] text-ink border-b-[1.5px] border-gray-200 pb-6 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold">{formatRp(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim ({courier})</span>
                <span className="font-mono font-bold">{formatRp(shippingCost)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="font-grotesk font-bold text-[18px] uppercase">Total</span>
              <span className="font-mono font-bold text-[24px] leading-none">{formatRp(product.price + shippingCost)}</span>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mb-6 select-none">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={agreed} 
                onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: false }); }} 
              />
              <div className={`w-5 h-5 shrink-0 mt-0.5 border-[1.5px] ${errors.agreed ? 'border-tomato' : 'border-ink'} rounded flex items-center justify-center transition-colors ${agreed ? 'bg-acid-lime' : 'bg-white group-hover:border-ink'}`}>
                {agreed && <svg className="w-3 h-3 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className={`font-inter text-[12px] leading-relaxed ${errors.agreed ? 'text-tomato' : 'text-gray-600'}`}>
                Saya setuju data saya digunakan untuk pengiriman dan memahami bahwa stok hanya dikunci 15 menit.
              </span>
            </label>

            <Button variant="primary" fullWidth className="py-4" onClick={handleCheckout}>
              BAYAR SEKARANG
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
};