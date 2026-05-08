export type Product = {
  id: string;
  name: string;
  category: 'Outerwear' | 'Tops' | 'Bottoms' | 'Accessories' | 'Footwear';
  price: number;
  featuredImage: string;
  galleryImages: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  isNewArrival?: boolean;
  isLimitedEdition?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};
