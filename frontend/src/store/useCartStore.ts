import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../hooks/useProducts';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const items = get().items;
        const existingItem = items.find(item => item.product._id === product._id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product._id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map(item =>
            item.product._id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        );
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);