import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CaraBeliModal } from '../components/ui/CaraBeliModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const products = useStore(state => state.products);
  const [isCaraBeliOpen, setIsCaraBeliOpen] = useState(false);

  // Ambil 4 produk terbaru yang masih available
  const newArrivals = products.filter(p => p.status === 'available').slice(0, 4);

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-[80px] py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Kiri: Teks */}
        <div className="flex flex-col items-start z-10">
          <Badge variant="lime" className="mb-6">
            NEW DROP · TIAP JUMAT 19.00 WIB
          </Badge>
          <h1 className="font-grotesk font-bold text-[44px] md:text-[72px] leading-[1] uppercase tracking-[-0.02em] text-ink mb-6">
            SERIUS SOAL GAYA.<br/>
            <span className="text-tomato">SANTAI SOAL HARGA.</span>
          </h1>
          <p className="font-inter text-[16px] md:text-[18px] text-gray-600 mb-8 max-w-md leading-relaxed">
            Thrift branded kurasi QC. Satu barang, satu pemilik — begitu diamankan, langsung dikunci buat kamu.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => navigate('/katalog')}>
              Belanja Sekarang →
            </Button>
            <Button variant="secondary" onClick={() => setIsCaraBeliOpen(true)}>
              Cara Beli
            </Button>
          </div>
        </div>

        {/* Kanan: Kolase Foto (Neo-brutalism style) */}
        <div className="relative h-[400px] md:h-[500px] w-full hidden md:block">
          {/* Kartu 1 */}
          <div className="absolute top-10 right-20 w-[240px] h-[300px] bg-lavender border-[1.5px] border-ink shadow-brutal rotate-3 p-3 flex flex-col z-10 transition-transform hover:-translate-y-2 hover:rotate-0 duration-300">
            <div className="w-full h-full border-[1.5px] border-ink bg-white flex items-center justify-center overflow-hidden">
              <img src="/gambar1.jpg" alt="Foto 1" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-4 rotate-12">
              <Badge variant="lime" className="shadow-brutal-sm text-[14px] px-3 py-1.5">1 PCS ONLY</Badge>
            </div>
          </div>
          {/* Kartu 2 */}
          <div className="absolute top-32 right-60 w-[220px] h-[280px] bg-amber border-[1.5px] border-ink shadow-brutal -rotate-6 p-3 flex flex-col z-20 transition-transform hover:-translate-y-2 hover:rotate-0 duration-300">
            <div className="w-full h-full border-[1.5px] border-ink bg-white flex items-center justify-center overflow-hidden">
              <img src="/gambar2.jpg" alt="Foto 2" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Kartu 3 */}
          <div className="absolute bottom-4 right-10 w-[260px] h-[200px] bg-acid-lime border-[1.5px] border-ink shadow-brutal rotate-[-2deg] p-3 flex flex-col z-30 transition-transform hover:-translate-y-2 hover:rotate-0 duration-300">
            <div className="w-full h-full border-[1.5px] border-ink bg-white flex items-center justify-center overflow-hidden">
              <img src="/gambar3.jpg" alt="Foto 3" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 -rotate-6">
              <Badge variant="tomato" className="shadow-brutal-sm text-[14px] px-3 py-1.5 text-white border-ink">BURUAN AMANIN</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORI CEPAT */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-[80px] mb-16">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['Atasan', 'Outerwear', 'Bawahan', 'Dress', 'Aksesoris'].map((cat) => (
            <Link 
              key={cat} 
              to={`/katalog?kategori=${cat}`}
              className="flex-shrink-0 px-6 py-3 bg-white border-[1.5px] border-ink rounded-full font-grotesk font-bold uppercase tracking-[0.02em] shadow-brutal-sm hover:translate-brutal-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* BARU MENDARAT */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-[80px] mb-24">
        <div className="flex justify-between items-end mb-8 border-b-[1.5px] border-ink pb-4">
          <h2 className="font-grotesk font-bold text-[28px] md:text-[40px] uppercase text-ink leading-none">BARU MENDARAT</h2>
          <Link to="/katalog" className="font-grotesk font-bold text-[16px] uppercase hover:text-tomato transition-colors hidden md:block">
            Lihat Semua →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <Button variant="secondary" fullWidth onClick={() => navigate('/katalog')}>
            Lihat Semua Drop →
          </Button>
        </div>
      </section>

      {/* USP STRIP */}
      <section className="w-full bg-acid-lime border-y-[1.5px] border-ink py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[80px] grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink">
          <div className="pt-4 md:pt-0 md:px-8 first:pt-0 first:px-0 first:pr-8">
            <h3 className="font-grotesk font-bold text-[24px] uppercase text-ink mb-2">Kurasi & QC Tiap Item</h3>
            <p className="font-inter text-ink/80">Kondisi barang dicek detail. Noda atau minus minor selalu kami infokan transparan.</p>
          </div>
          <div className="pt-4 md:pt-0 md:px-8">
            <h3 className="font-grotesk font-bold text-[24px] uppercase text-ink mb-2">Stok Dikunci 15 Menit</h3>
            <p className="font-inter text-ink/80">Masuk checkout? Barang otomatis aman dari rebutan selama 15 menit buat kamu bayar.</p>
          </div>
          <div className="pt-4 md:pt-0 md:pl-8">
            <h3 className="font-grotesk font-bold text-[24px] uppercase text-ink mb-2">Ukuran Asli, Cek CM</h3>
            <p className="font-inter text-ink/80">Label size suka bohong. Kami ukur ulang panjang, lebar dada, dan pinggang pakai meteran.</p>
          </div>
        </div>
      </section>

      {/* MODAL CARA BELI */}
      <CaraBeliModal
        isOpen={isCaraBeliOpen}
        onClose={() => setIsCaraBeliOpen(false)}
      />
    </main>
  );
};