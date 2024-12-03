import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../hooks/useProducts';

interface CollectionStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        if (!items.find(item => item._id === product._id)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item._id !== productId)
        });
      },
      hasItem: (productId) => {
        return get().items.some(item => item._id === productId);
      }
    }),
    {
      name: 'collection-storage'
    }
  )
);