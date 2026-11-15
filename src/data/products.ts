import type { Product, Category, Condition, ProductStatus } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'PRD-001', brand: 'Nike', name: 'Oversized Windbreaker Jacket', category: 'Outerwear', size: 'L',
    measurements: { lingkarDada: 116, panjang: 72, bahu: 52 }, condition: 'Like New 9/10',
    conditionNote: 'Noda tipis di ujung lengan kiri, zipper dan jahitan aman, tidak bau',
    material: 'Nylon Ripstop', color: 'Hitam/Abu', price: 189000, retailPrice: 799000,
    photoColor: 'lavender', status: 'available',
    image: '/gambar1.jpg'
  },
  {
    id: 'PRD-002', brand: 'Carhartt', name: 'Detroit Work Jacket', category: 'Outerwear', size: 'M',
    measurements: { lingkarDada: 110, panjang: 68, bahu: 48 }, condition: 'Good 8/10',
    conditionNote: 'Fading alami khas canvas workwear, resleting YKK lancar',
    material: 'Cotton Canvas', color: 'Coklat', price: 349000, retailPrice: 1500000,
    photoColor: 'amber', status: 'available',
    image: '/gambar2.jpg'
  },
  {
    id: 'PRD-003', brand: 'Levi\'s', name: '501 Original Straight Jeans', category: 'Bawahan', size: '32',
    measurements: { lingkarPinggang: 86, panjang: 102 }, condition: 'Good 8/10',
    conditionNote: 'Distress kecil di kantong belakang, aman dipakai',
    material: 'Denim', color: 'Biru Pudar', price: 159000, retailPrice: 899000,
    photoColor: 'acid-lime', status: 'available',
    image: '/gambar3.webp'
  },
  {
    id: 'PRD-004', brand: 'Adidas', name: ' ', category: 'Outerwear', size: 'L',
    measurements: { lingkarDada: 118, panjang: 70, bahu: 50 }, condition: 'Ada minus',
    conditionNote: 'Ada lubang jarum di dekat logo, karet pergelangan agak longgar',
    material: 'Polyester', color: 'Navy/Putih', price: 129000, retailPrice: 650000,
    photoColor: 'gray-200', status: 'sold',
    image: '/gambar4.jpg'
  },
  {
    id: 'PRD-005', brand: 'Stüssy', name: 'Basic Logo Graphic Tee', category: 'Atasan', size: 'XL',
    measurements: { lingkarDada: 120, panjang: 76, bahu: 54 }, condition: 'Like New 9/10',
    material: 'Cotton', color: 'Hitam', price: 219000, retailPrice: 550000,
    photoColor: 'lavender', status: 'locked',
    image: '/gambar5.jpg'
  },
  {
    id: 'PRD-006', brand: 'Champion', name: 'Reverse Weave Hoodie', category: 'Outerwear', size: 'M',
    measurements: { lingkarDada: 112, panjang: 68, bahu: 49 }, condition: 'Like New 9/10',
    material: 'Heavyweight Cotton', color: 'Abu-abu Misty', price: 249000, retailPrice: 850000,
    photoColor: 'amber', status: 'available',
    image: '/gambar6.jpg'
  },
  {
    id: 'PRD-007', brand: 'Uniqlo', name: 'U Crew Neck Oversized', category: 'Atasan', size: 'L',
    measurements: { lingkarDada: 114, panjang: 73, bahu: 52 }, condition: 'Good 8/10',
    material: 'Cotton', color: 'Putih', price: 69000, retailPrice: 199000,
    photoColor: 'acid-lime', status: 'available',
    image: '/gambar7.jpg'
  },
  {
    id: 'PRD-008', brand: 'Dickies', name: '874 Original Work Pants', category: 'Bawahan', size: '34',
    measurements: { lingkarPinggang: 90, panjang: 104 }, condition: 'Like New 9/10',
    material: 'Twill', color: 'Khaki', price: 179000, retailPrice: 550000,
    photoColor: 'lavender', status: 'available',
    image: '/gambar8.webp'
  },
  {
    id: 'PRD-009', brand: 'The North Face', name: 'Fleece Zip Jacket', category: 'Outerwear', size: 'S',
    measurements: { lingkarDada: 104, panjang: 65, bahu: 46 }, condition: 'Ada minus',
    conditionNote: 'Bulu fleece agak menggumpal di bagian siku',
    material: 'Polyester Fleece', color: 'Hitam', price: 159000, retailPrice: 990000,
    photoColor: 'amber', status: 'available',
    image: '/gambar9.jpg'
  },
  {
    id: 'PRD-010', brand: 'Patagonia', name: 'Synchilla Snap-T', category: 'Outerwear', size: 'M',
    measurements: { lingkarDada: 110, panjang: 70, bahu: 48 }, condition: 'Like New 9/10',
    material: 'Recycled Fleece', color: 'Motif Tribal', price: 289000, retailPrice: 1200000,
    photoColor: 'acid-lime', status: 'available',
    image: '/gambar9.jpg'
  },
  // Auto-generate 14 item lainnya untuk memenuhi grid
  ...Array.from({ length: 14 }).map((_, i) => ({
    id: `PRD-0${11 + i}`,
    brand: ['Vans', 'Polo Ralph Lauren', 'Tommy Hilfiger', 'Zara', 'H&M'][i % 5],
    name: ['Vintage Graphic Tee', 'Corduroy Overshirt', 'Carpenter Pants', 'Knit Sweater', 'Utility Vest'][i % 5],
    category: ['Atasan', 'Outerwear', 'Bawahan', 'Atasan', 'Outerwear'][i % 5] as Category,
    size: ['S', 'M', 'L', 'XL'][i % 4],
    measurements: { lingkarDada: 100 + (i * 2), panjang: 65 + i, bahu: 45 + i },
    condition: (i % 3 === 0 ? 'Like New 9/10' : i % 3 === 1 ? 'Good 8/10' : 'Ada minus') as Condition,
    conditionNote: i % 3 === 2 ? 'Jahitan lepas sedikit di kerah' : undefined,
    material: ['Cotton', 'Corduroy', 'Denim', 'Knit', 'Canvas'][i % 5],
    color: ['Hitam', 'Navy', 'Olive', 'Maroon', 'Beige'][i % 5],
    price: 89000 + (i * 10000),
    retailPrice: 299000 + (i * 50000),
    photoColor: ['lavender', 'acid-lime', 'amber'][i % 3] as 'lavender'|'acid-lime'|'amber',
    status: (i === 5 ? 'locked' : i === 8 || i === 12 ? 'sold' : 'available') as ProductStatus,
    image: `https://picsum.photos/seed/serius${i}/600/800` // Foto random stabil untuk sisanya
  }))
];