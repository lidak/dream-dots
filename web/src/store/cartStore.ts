import { Product, useGetProducts } from "@/api/useGetProducts";
import { create } from "zustand";
import { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartStoreState = {
  products: { [id: string]: number; }
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

export const useGetProductsNumber = () => {
  const products = useCartStore((state) => state.products);
  return Object.keys(products).reduce((acc, key) => acc + products[key], 0);
}

export type CartProduct = Product & { count: number; }

export const useGetCartProducts = (): CartProduct[] => {
  const { data: allProducts } = useGetProducts();
  const addedProductsCount = useCartStore((state) => state.products);

  return Object.keys(addedProductsCount)
    .map((productId) => {
      const product = allProducts?.find((product) => product.id === productId);
      if (!product) return null;
      return {
        ...product,
        count: addedProductsCount[productId]
      }
    })
    .filter((product) => product !== null);
}