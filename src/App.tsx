
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useHoldSweeper } from './hooks/useHoldSweeper';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AnnouncementBar } from './components/layout/AnnouncementBar';

// Pages
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { Success } from './pages/Success';
import { Expired } from './pages/Expired';

// Komponen perantara untuk mengaktifkan hooks yang butuh React Router
const AppContent = () => {
  // Aktifkan sweeper yang mengecek expired order tiap detik
  useHoldSweeper();

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Routes>
        {/* Rute Utama dengan Header/Footer Penuh */}
        <Route path="/" element={<><AnnouncementBar /><Header /><Home /><Footer /></>} />
        <Route path="/katalog" element={<><AnnouncementBar /><Header /><Catalog /><Footer /></>} />
        <Route path="/produk/:id" element={<><AnnouncementBar /><Header /><ProductDetail /><Footer /></>} />
        
        {/* Rute Checkout & Pembayaran (Header Minimal, Tanpa Footer) */}
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/bayar/:orderId" element={<Payment />} />
        <Route path="/sukses/:orderId" element={<Success />} />
        <Route path="/expired/:orderId" element={<Expired />} />
      </Routes>
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;