export type ProductStatus = 'available' | 'locked' | 'sold';
export type OrderStatus = 'pending_payment' | 'paid' | 'qc' | 'packing' | 'shipped' | 'expired' | 'cancelled';
export type Category = 'Atasan' | 'Outerwear' | 'Bawahan' | 'Dress' | 'Aksesoris';
export type Condition = 'Like New 9/10' | 'Good 8/10' | 'Ada minus';

export interface Measurements {
  lingkarDada?: number;
  panjang?: number;
  bahu?: number;
  lingkarPinggang?: number;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: Category;
  size: string;
  measurements: Measurements;
  condition: Condition;
  conditionNote?: string;
  material: string;
  color: string;
  price: number;
  retailPrice: number;
  photoColor: 'lavender' | 'acid-lime' | 'amber' | 'gray-200';
  status: ProductStatus;
  lockedByOrderId?: string;
  image?: string;
}

export interface BuyerData {
  name: string;
  whatsapp: string;
  email?: string;
  address: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  courierNote?: string;
  courier: string;
  shippingCost: number;
  paymentMethod: string;
}

export interface Order {
  id: string;
  productId: string;
  buyer: BuyerData;
  createdAt: number;
  expiresAt: number;
  kodeUnik: number;
  subtotal: number;
  total: number;
  status: OrderStatus;
  resi?: string;
}