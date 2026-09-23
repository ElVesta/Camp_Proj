import { products } from '../data/products';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
  season: string;
  rating: number;
  stock: number;
  images: string[];
}

export const api = {

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return products;
  },

  async getProduct(id: number): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(p => p.id === id);
  },

  async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  },

  async getCategories(): Promise<string[]> {
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  },
};