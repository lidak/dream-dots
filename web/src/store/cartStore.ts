import { create } from "zustand";
import { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartStoreState = {
  products: {[id: string]: number;}
}

type CartStoreActions = {
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

type CartState = CartStoreState & CartStoreActions;

const cartStoreDefinition: StateCreator<CartState> = (set) => ({
  products: {},
  addProduct: (productId: string) => set((state) => ({
    products: {
      ...state.products,
      [productId]: (state.products[productId] || 0) + 1
    }
  })),
  removeProduct: (productId: string) => set((state) => {
    const newProducts = { ...state.products };
    if (newProducts[productId] > 1) {
      newProducts[productId] -= 1;
    } else {
      delete newProducts[productId];
    }
    return { products: newProducts };
  }),
})

export const useCartStore = create<CartState>()(
  devtools(
    persist(cartStoreDefinition, {
      name: 'cart-storage',
      partialize: (state) => ({
        products: state.products
      })
    })
  )
);
