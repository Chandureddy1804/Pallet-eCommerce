import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../Services/api";

export type SortDir = "asc" | "desc" | null;

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  // Pagination
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (n: number) => void;

  // Filters
  search: string;
  category: string;
  setSearch: (s: string) => void;
  setCategory: (c: string) => void;

  // Sorting
  priceSort: SortDir;
  setPriceSort: (dir: SortDir) => void;

  // Cart
  cart: CartItem[];
  addToCart: (p: Product, quantity?: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  resetCartStorage: () => void;
}

export const useStore = create<AppState>()(
  persist<AppState>(
    (set, get) => ({
      // Pagination
      page: 0,
      pageSize: 10,
      setPage: (p) => set({ page: p }),
      setPageSize: (n) => set({ pageSize: n }),

      // Filters
      search: "",
      category: "",
      setSearch: (s) => set({ search: s }),
      setCategory: (c) => set({ category: c }),

      // Sorting
      priceSort: null,
      setPriceSort: (dir) => set({ priceSort: dir }),

      // Cart
      cart: [],
      addToCart: (p, quantity = 1) => {
        const cart = get().cart;
        const existingItem = cart.find((item: CartItem) => item.id === p.id);

        if (existingItem) {
          // Update quantity if item already exists
          set({
            cart: cart.map((item: CartItem) =>
              item.id === p.id
                ? { ...item, quantity: (item.quantity || 0) + quantity }
                : item
            ),
          });
        } else {
          // Add new item to cart
          set({ cart: [...cart, { ...p, quantity: quantity || 1 }] });
        }
      },
      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((c: CartItem) => c.id !== id),
        }),
      clearCart: () => set({ cart: [] }),
      getTotalItems: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
      },
      resetCartStorage: () => {
        localStorage.removeItem("app-storage");
        set({ cart: [] });
      },
    }),
    {
      name: "app-storage",
      migrate: (persistedState: any) => {
        // Migrate cart items to ensure they have proper quantity
        if (persistedState.cart && Array.isArray(persistedState.cart)) {
          persistedState.cart = persistedState.cart.map((item: any) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
        }
        return persistedState;
      },
    }
  )
);
