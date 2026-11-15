import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Plus, Trash2, CheckCircle, XCircle, Package, ShoppingBag, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Category, Condition, ProductStatus } from '../types';
import { formatRp } from '../utils/format';

const ADMIN_PIN = '1234';

export const Admin: React.FC = () => {
  const { products, orders, addProduct, updateProductStatus, deleteProduct, markPaid, cancelOrder } = useStore();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

  // Form tambah barang thrift baru
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Outerwear');
  const [size, setSize] = useState('L');
  const [lingkarDada, setLingkarDada] = useState('114');
  const [panjang, setPanjang] = useState('70');
  const [condition, setCondition] = useState<Condition>('Like New 9/10');
  const [conditionNote, setConditionNote] = useState('');
  const [material, setMaterial] = useState('Cotton');
  const [color, setColor] = useState('Hitam');
  const [price, setPrice] = useState('175000');
  const [retailPrice, setRetailPrice] = useState('650000');
  const [photoColor, setPhotoColor] = useState<'lavender' | 'amber' | 'acid-lime'>('acid-lime');
  const [image, setImage] = useState('/gambar1.jpg');
  const [toastMsg, setToastMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim() || !name.trim()) return;

    const newId = addProduct({
      brand: brand.trim(),
      name: name.trim(),
      category,
      size: size.trim() || 'L',
      measurements: {
        lingkarDada: Number(lingkarDada) || 110,
        panjang: Number(panjang) || 68,
      },
      condition,
      conditionNote: conditionNote.trim() || undefined,
      material: material.trim() || 'Cotton',
      color: color.trim() || 'Hitam',
      price: Number(price) || 100000,
      retailPrice: Number(retailPrice) || 400000,
      photoColor,
      image: image.trim() || '/gambar1.jpg',
    });

    setBrand('');
    setName('');
    setConditionNote('');
    showToast(`Item ${newId} berhasil ditambahkan ke katalog!`);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white border-[2px] border-ink rounded-2xl shadow-brutal p-6 md:p-8 text-center"
        >
          <div className="w-12 h-12 bg-acid-lime border-[1.5px] border-ink rounded-xl shadow-brutal-sm flex items-center justify-center mx-auto mb-4">
            <Lock size={22} className="text-ink" />
          </div>
          <h1 className="font-grotesk font-bold text-2xl uppercase text-ink mb-1">
            ADMIN SERIUS STORE
          </h1>
          <p className="font-inter text-xs text-gray-600 mb-6">
            Masukkan PIN pengelola untuk akses stok & pesanan.
          </p>

          <input
            type="password"
            maxLength={6}
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value);
              setPinError(false);
            }}
            placeholder="PIN (Default: 1234)"
            className={`w-full text-center font-mono text-xl tracking-[0.4em] bg-paper border-[1.5px] ${
              pinError ? 'border-tomato' : 'border-ink'
            } rounded-xl px-4 py-3 mb-3`}
          />
          {pinError && (
            <p className="font-inter text-xs text-tomato mb-3">PIN salah, coba lagi.</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-ink text-acid-lime font-grotesk font-bold uppercase rounded-xl border-[1.5px] border-ink shadow-brutal-sm hover:translate-brutal-hover transition-all cursor-pointer"
          >
            Masuk Dashboard →
          </button>

          <Link
            to="/"
            className="inline-block mt-4 font-inter text-xs text-gray-600 hover:text-ink underline"
          >
            ← Kembali ke Toko
          </Link>
        </form>
      </div>
    );
  }

  const pendingCount = orders.filter(o => o.status === 'pending_payment').length;
  const availableCount = products.filter(p => p.status === 'available').length;

  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Top Bar Admin */}
      <header className="w-full bg-ink text-white border-b-[2px] border-ink sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[80px] h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-acid-lime text-ink font-mono font-bold text-xs px-2.5 py-1 rounded-md">
              ADMIN PANEL
            </span>
            <Link to="/" className="font-grotesk font-bold text-lg uppercase hover:text-acid-lime">
              SERIUS STORE
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsUnlocked(false)}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase bg-white/10 hover:bg-tomato px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Keluar
          </button>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-[80px] py-8 space-y-6">
        {toastMsg && (
          <div className="bg-acid-lime border-[1.5px] border-ink rounded-xl px-4 py-3 font-grotesk font-bold text-sm text-ink shadow-brutal-sm">
            {toastMsg}
          </div>
        )}

        {/* Ringkasan Cepat */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border-[1.5px] border-ink rounded-2xl p-4 shadow-brutal-sm">
            <span className="font-inter text-xs text-gray-500 block">Stok Available</span>
            <span className="font-mono font-bold text-2xl text-ink">{availableCount} pcs</span>
          </div>
          <div className="bg-amber/40 border-[1.5px] border-ink rounded-2xl p-4 shadow-brutal-sm">
            <span className="font-inter text-xs text-ink/70 block">Menunggu Bayar</span>
            <span className="font-mono font-bold text-2xl text-ink">{pendingCount} order</span>
          </div>
          <div className="bg-acid-lime/50 border-[1.5px] border-ink rounded-2xl p-4 shadow-brutal-sm">
            <span className="font-inter text-xs text-ink/70 block">Total Terjual</span>
            <span className="font-mono font-bold text-2xl text-ink">
              {products.filter(p => p.status === 'sold').length} pcs
            </span>
          </div>
          <div className="bg-white border-[1.5px] border-ink rounded-2xl p-4 shadow-brutal-sm">
            <span className="font-inter text-xs text-gray-500 block">Total Katalog</span>
            <span className="font-mono font-bold text-2xl text-ink">{products.length} item</span>
          </div>
        </div>

        {/* Tab Navigasi */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-[1.5px] border-ink font-grotesk font-bold text-sm uppercase cursor-pointer transition-all ${
              activeTab === 'orders' ? 'bg-acid-lime shadow-brutal-sm' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <ShoppingBag size={16} />
            Pesanan Masuk ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-[1.5px] border-ink font-grotesk font-bold text-sm uppercase cursor-pointer transition-all ${
              activeTab === 'products' ? 'bg-acid-lime shadow-brutal-sm' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Package size={16} />
            Kelola Stok ({products.length})
          </button>
        </div>

        {/* TAB 1: PESANAN MASUK */}
        {activeTab === 'orders' && (
          <div className="bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-6">
            <h2 className="font-grotesk font-bold text-xl uppercase text-ink mb-4 border-b-[1.5px] border-ink pb-3">
              Daftar Transaksi
            </h2>

            {orders.length === 0 ? (
              <p className="font-inter text-sm text-gray-500 py-8 text-center">
                Belum ada pesanan masuk. Coba checkout salah satu produk untuk simulasi.
              </p>
            ) : (
              <div className="space-y-3">
                {[...orders].reverse().map(order => {
                  const item = products.find(p => p.id === order.productId);
                  return (
                    <div
                      key={order.id}
                      className="border-[1.5px] border-ink rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-paper"
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-xs bg-white border border-ink px-2 py-0.5 rounded">
                            {order.id}
                          </span>
                          <span
                            className={`font-mono font-bold text-[11px] uppercase px-2 py-0.5 rounded border border-ink ${
                              order.status === 'paid'
                                ? 'bg-acid-lime text-ink'
                                : order.status === 'pending_payment'
                                ? 'bg-amber text-ink'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <h3 className="font-grotesk font-bold text-base text-ink mt-1">
                          {item ? `${item.brand} - ${item.name} (Size ${item.size})` : order.productId}
                        </h3>
                        <p className="font-inter text-xs text-gray-600 mt-0.5">
                          Pembeli: <strong>{order.buyer.name}</strong> ({order.buyer.whatsapp}) · {order.buyer.courier} · {order.buyer.city}
                        </p>
                        <p className="font-mono font-bold text-sm text-ink mt-1">
                          Total: {formatRp(order.total)} (Kode Unik +{order.kodeUnik})
                        </p>
                      </div>

                      {order.status === 'pending_payment' && (
                        <div className="flex gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              markPaid(order.id);
                              showToast(`Order ${order.id} dikonfirmasi LUNAS!`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-acid-lime border-[1.5px] border-ink rounded-xl font-grotesk font-bold text-xs uppercase shadow-brutal-sm hover:translate-brutal-hover cursor-pointer"
                          >
                            <CheckCircle size={15} />
                            Konfirmasi Lunas
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              cancelOrder(order.id);
                              showToast(`Order ${order.id} dibatalkan & stok dilepas.`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-tomato hover:text-white border-[1.5px] border-ink rounded-xl font-grotesk font-bold text-xs uppercase cursor-pointer"
                          >
                            <XCircle size={15} />
                            Lepas Stok
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KELOLA STOK PRODUK */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Tambah Item */}
            <form
              onSubmit={handleAddProduct}
              className="lg:col-span-1 bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-5 space-y-3 h-fit"
            >
              <h2 className="font-grotesk font-bold text-lg uppercase text-ink border-b-[1.5px] border-ink pb-2.5 flex items-center gap-2">
                <Plus size={18} />
                Tambah Drop Baru
              </h2>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Brand *</label>
                  <input
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Carhartt"
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Size</label>
                  <input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="L / 32"
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-xs font-medium mb-1">Nama Item *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vintage Active Jacket"
                  className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Atasan">Atasan</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Bawahan">Bawahan</option>
                    <option value="Dress">Dress</option>
                    <option value="Aksesoris">Aksesoris</option>
                  </select>
                </div>
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Kondisi</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as Condition)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Like New 9/10">Like New 9/10</option>
                    <option value="Good 8/10">Good 8/10</option>
                    <option value="Ada minus">Ada minus</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Lingkar Dada (cm)</label>
                  <input
                    type="number"
                    value={lingkarDada}
                    onChange={(e) => setLingkarDada(e.target.value)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Panjang (cm)</label>
                  <input
                    type="number"
                    value={panjang}
                    onChange={(e) => setPanjang(e.target.value)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Harga Thrift (Rp)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Harga Baru (Rp)</label>
                  <input
                    type="number"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Bahan</label>
                  <input
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs font-medium mb-1">Warna</label>
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-xs font-medium mb-1">Path / URL Foto</label>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/gambar1.jpg atau https://..."
                  className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-inter text-xs font-medium mb-1">Warna Bingkai</label>
                <select
                  value={photoColor}
                  onChange={(e) => setPhotoColor(e.target.value as 'lavender' | 'amber' | 'acid-lime')}
                  className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                >
                  <option value="acid-lime">Acid Lime</option>
                  <option value="lavender">Lavender</option>
                  <option value="amber">Amber</option>
                </select>
              </div>

              <div>
                <label className="block font-inter text-xs font-medium mb-1">Catatan QC / Minus</label>
                <input
                  value={conditionNote}
                  onChange={(e) => setConditionNote(e.target.value)}
                  placeholder="Opsional..."
                  className="w-full bg-paper border-[1.5px] border-ink rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-acid-lime text-ink font-grotesk font-bold text-sm uppercase rounded-xl border-[1.5px] border-ink shadow-brutal-sm hover:translate-brutal-hover cursor-pointer"
              >
                + Posting ke Katalog
              </button>
            </form>

            {/* Daftar Produk */}
            <div className="lg:col-span-2 bg-white border-[1.5px] border-ink rounded-2xl shadow-brutal p-5 space-y-3">
              <h2 className="font-grotesk font-bold text-lg uppercase text-ink border-b-[1.5px] border-ink pb-2.5">
                Daftar Inventaris 1-of-1
              </h2>

              <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
                {products.map(p => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-paper border-[1.5px] border-ink rounded-xl"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-14 object-cover rounded-lg border border-ink shrink-0 bg-gray-100"
                      />
                      <div className="min-w-0">
                        <span className="font-mono text-[11px] font-bold text-gray-500">
                          {p.id} · {p.brand} · Size {p.size}
                        </span>
                        <h3 className="font-grotesk font-bold text-sm text-ink truncate">
                          {p.name}
                        </h3>
                        <span className="font-mono font-bold text-xs text-ink">
                          {formatRp(p.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={p.status}
                        onChange={(e) => updateProductStatus(p.id, e.target.value as ProductStatus)}
                        className={`font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg border-[1.5px] border-ink cursor-pointer ${
                          p.status === 'available'
                            ? 'bg-acid-lime text-ink'
                            : p.status === 'locked'
                            ? 'bg-amber text-ink'
                            : 'bg-ink text-white'
                        }`}
                      >
                        <option value="available">AVAILABLE</option>
                        <option value="locked">LOCKED</option>
                        <option value="sold">SOLD</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Hapus ${p.name} dari katalog?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        aria-label="Hapus produk"
                        className="p-2 bg-white hover:bg-tomato hover:text-white border-[1.5px] border-ink rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};