import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface CaraBeliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    num: '01',
    bg: 'bg-lavender',
    title: 'Pilih Item Kurasi (1-of-1)',
    desc: 'Setiap barang cuma tersedia 1 pcs. Cek ukuran asli (CM) dan catatan minus di detail produk sebelum mengamankan.',
  },
  {
    num: '02',
    bg: 'bg-amber',
    title: 'Stok Otomatis Dikunci 15 Menit',
    desc: 'Begitu masuk halaman checkout, barang langsung terkunci khusus buat kamu selama 15 menit agar tidak direbut pembeli lain.',
  },
  {
    num: '03',
    bg: 'bg-acid-lime',
    title: 'Transfer Sesuai Kode Unik',
    desc: 'Bayar persis hingga 3 digit kode unik sebelum timer 15 menit habis. Jika waktu habis, kunci dilepas otomatis.',
  },
  {
    num: '04',
    bg: 'bg-white',
    title: 'Konfirmasi WhatsApp & Kirim',
    desc: 'Klik tombol konfirmasi WhatsApp di halaman transaksi untuk mengirim bukti transfer, lalu paket langsung diproses.',
  },
];

export const CaraBeliModal: React.FC<CaraBeliModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#FAF9F6] border-[2px] border-ink rounded-2xl shadow-brutal overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Modal */}
        <div className="bg-acid-lime border-b-[2px] border-ink px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/70 block">
              PANDUAN TRANSAKSI
            </span>
            <h2 className="font-grotesk font-bold text-xl md:text-2xl uppercase text-ink leading-tight">
              CARA BELI DI SERIUS STORE
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-9 h-9 bg-white border-[1.5px] border-ink rounded-lg font-mono font-bold text-base text-ink shadow-brutal-sm hover:bg-tomato hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Isi 4 Langkah */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-4 p-3.5 bg-white border-[1.5px] border-ink rounded-xl shadow-brutal-sm"
            >
              <div
                className={`w-10 h-10 shrink-0 ${step.bg} border-[1.5px] border-ink rounded-lg font-mono font-bold text-sm text-ink flex items-center justify-center`}
              >
                {step.num}
              </div>
              <div>
                <h3 className="font-grotesk font-bold text-base uppercase text-ink">
                  {step.title}
                </h3>
                <p className="font-inter text-xs md:text-sm text-gray-600 mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Modal */}
        <div className="px-6 py-4 bg-white border-t-[1.5px] border-ink flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              onClose();
              navigate('/katalog');
            }}
          >
            Gas, Belanja Sekarang →
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};