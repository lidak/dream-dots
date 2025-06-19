export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currentlyInStock: number;
  backorderAvailable: boolean;
  imgUrl?: string;
}

export const useGetProducts: () => Product[] = () => {

  return [{
    id: '123456789',
    name: 'Inside Out 2 nails',
    description: "🎬✨ Flip your style upside down with Inside Out 2-themed paper nails! Let Joy, Sadness, Anger, Disgust...",
    price: 5.45,
    currentlyInStock: 0,
    backorderAvailable: false,
  }];
}