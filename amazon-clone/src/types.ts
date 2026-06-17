export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number; // For discount display
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  category: string;
  specifications: { key: string; value: string }[];
  stock: number;
  variants?: {
    type: 'Size' | 'Color' | 'Style';
    options: string[];
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Shipped' | 'Processing' | 'Delivered';
  deliveryAddress: string;
  estimatedDelivery: string;
}

export interface PromoCategory {
  title: string;
  image: string;
  linkText: string;
  category: string;
}
