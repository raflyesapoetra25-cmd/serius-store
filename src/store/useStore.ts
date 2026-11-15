import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductStatus, Order, BuyerData } from '../types';
import { mockProducts } from '../data/products';

interface StoreState {
  products: Product[];
  orders: Order[];
  createOrder: (productId: string, buyer: BuyerData) => string | null;
  expireOrder: (orderId: string) => void;
  markPaid: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  addProduct: (newProduct: Omit<Product, 'id' | 'status'>) => string;
  updateProductStatus: (productId: string, status: ProductStatus) => void;
  deleteProduct: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      orders: [],

      createOrder: (productId, buyer) => {
        const { products } = get();
        const product = products.find(p => p.id === productId);

        if (!product || product.status !== 'available') return null;

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const orderId = `SRS-${dateStr}-${randomId}`;

        const expiresAt = Date.now() + 15 * 60 * 1000;
        const kodeUnik = Math.floor(Math.random() * 900) + 100;
        const total = product.price + buyer.shippingCost + kodeUnik;

        const newOrder: Order = {
          id: orderId,
          productId,
          buyer,
          createdAt: Date.now(),
          expiresAt,
          kodeUnik,
          subtotal: product.price,
          total,
          status: 'pending_payment'
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
          products: state.products.map(p =>
            p.id === productId
              ? { ...p, status: 'locked', lockedByOrderId: orderId }
              : p
          )
        }));

        return orderId;
      },

      expireOrder: (orderId) => {
        set((state) => {
          const order = state.orders.find(o => o.id === orderId);
          if (!order || order.status !== 'pending_payment') return state;

          return {
            orders: state.orders.map(o =>
              o.id === orderId ? { ...o, status: 'expired' } : o
            ),
            products: state.products.map(p =>
              p.lockedByOrderId === orderId
                ? { ...p, status: 'available', lockedByOrderId: undefined }
                : p
            )
          };
        });
      },

      markPaid: (orderId) => {
        set((state) => {
          const order = state.orders.find(o => o.id === orderId);
          if (!order) return state;

          return {
            orders: state.orders.map(o =>
              o.id === orderId ? { ...o, status: 'paid' } : o
            ),
            products: state.products.map(p =>
              p.lockedByOrderId === orderId || p.id === order.productId
                ? { ...p, status: 'sold', lockedByOrderId: undefined }
                : p
            )
          };
        });
      },

      cancelOrder: (orderId) => {
        set((state) => {
          const order = state.orders.find(o => o.id === orderId);
          if (!order || order.status !== 'pending_payment') return state;

          return {
            orders: state.orders.map(o =>
              o.id === orderId ? { ...o, status: 'cancelled' } : o
            ),
            products: state.products.map(p =>
              p.lockedByOrderId === orderId
                ? { ...p, status: 'available', lockedByOrderId: undefined }
                : p
            )
          };
        });
      },

      addProduct: (newProduct) => {
        const nextNum = get().products.length + 1;
        const newId = `PRD-${String(nextNum).padStart(3, '0')}`;
        const created: Product = {
          ...newProduct,
          id: newId,
          status: 'available',
        };
        set((state) => ({
          products: [created, ...state.products],
        }));
        return newId;
      },

      updateProductStatus: (productId, status) => {
        set((state) => ({
          products: state.products.map(p =>
            p.id === productId
              ? {
                  ...p,
                  status,
                  lockedByOrderId: status === 'available' ? undefined : p.lockedByOrderId,
                }
              : p
          ),
        }));
      },

      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== productId),
        }));
      },
    }),
    {
      name: 'serius-store-storage-v6',
    }
  )
);