

export interface Product {
    id?: number;
    name?: string;
    price?: string;
    image?: string;
    rating?: number;
    description?: string;
    totalReviews?: number;
    reviews?: Review[];
    category?: string;
    created_at?: string;
}
export interface Category {
    id: number;
    name: string;
  };


export interface Review {
    user: string;
    description: string;
    rating: number;
    date: string;
}
export interface IHomePageProps {}

export interface CartItem extends Product {
    quantity: number;
  }
