export interface Product {
  id: string;
  name: string;
  category: "Women" | "Men" | "Kids";
  price: number;
  originalPrice?: number;
  image: string;
  isNew: boolean;
  description?: string;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  // Women's Products
  {
    id: "w1",
    name: "Floral Summer Dress",
    category: "Women",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
    isNew: false,
    description: "Beautiful floral print dress perfect for summer days.",
    colors: ["Blue", "Pink", "Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "w2",
    name: "Cashmere Sweater",
    category: "Women",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1434389676691-5d1551a5e8b2?w=800",
    isNew: true,
    description: "Luxurious cashmere sweater for cold winter days.",
    colors: ["Cream", "Gray", "Black"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "w3",
    name: "Leather Jacket",
    category: "Women",
    price: 199.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    isNew: false,
    description: "Classic leather jacket that never goes out of style.",
    colors: ["Black", "Brown"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "w4",
    name: "Silk Blouse",
    category: "Women",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800",
    isNew: true,
    description: "Elegant silk blouse for formal occasions.",
    colors: ["White", "Black", "Red"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "w5",
    name: "High-Waist Jeans",
    category: "Women",
    price: 69.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    isNew: false,
    colors: ["Blue", "Black"],
    sizes: ["26", "27", "28", "29", "30", "31"]
  },
  {
    id: "w6",
    name: "Wool Coat",
    category: "Women",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800",
    isNew: true,
    colors: ["Camel", "Gray", "Navy"],
    sizes: ["XS", "S", "M", "L"]
  },

  // Men's Products
  {
    id: "m1",
    name: "Cotton T-Shirt",
    category: "Men",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    isNew: true,
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "m2",
    name: "Denim Jacket",
    category: "Men",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c5?w=800",
    isNew: false,
    colors: ["Blue", "Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "m3",
    name: "Wool Blazer",
    category: "Men",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
    isNew: false,
    colors: ["Navy", "Gray", "Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "m4",
    name: "Leather Boots",
    category: "Men",
    price: 159.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    isNew: false,
    colors: ["Brown", "Black"],
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: "m5",
    name: "Hoodie",
    category: "Men",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    isNew: true,
    colors: ["Gray", "Black", "Navy", "Red"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "m6",
    name: "Chino Pants",
    category: "Men",
    price: 79.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
    isNew: false,
    colors: ["Khaki", "Navy", "Olive"],
    sizes: ["28", "29", "30", "31", "32", "33", "34"]
  },

  // Kids' Products
  {
    id: "k1",
    name: "Cartoon T-Shirt",
    category: "Kids",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519237438530-3eb3cc8a6eac?w=800",
    isNew: true,
    colors: ["Red", "Blue", "Green", "Yellow"],
    sizes: ["2T", "3T", "4T", "5T", "6"]
  },
  {
    id: "k2",
    name: "Denim Overalls",
    category: "Kids",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1519457431-44ccb64a579b?w=800",
    isNew: false,
    colors: ["Blue"],
    sizes: ["2T", "3T", "4T", "5T", "6"]
  },
  {
    id: "k3",
    name: "Rain Jacket",
    category: "Kids",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800",
    isNew: true,
    colors: ["Yellow", "Blue", "Pink"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7"]
  },
  {
    id: "k4",
    name: "Sneakers",
    category: "Kids",
    price: 44.99,
    originalPrice: 64.99,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
    isNew: false,
    colors: ["White/Pink", "White/Blue", "Black/Red"],
    sizes: ["8", "9", "10", "11", "12", "13", "1", "2", "3"]
  },
  {
    id: "k5",
    name: "Pajama Set",
    category: "Kids",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800",
    isNew: true,
    colors: ["Unicorn", "Dinosaur", "Space"],
    sizes: ["2T", "3T", "4T", "5T", "6"]
  },
  {
    id: "k6",
    name: "Winter Gloves",
    category: "Kids",
    price: 14.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1479079476249-7d2e1e8393e4?w=800",
    isNew: false,
    colors: ["Red", "Blue", "Green", "Pink"],
    sizes: ["S", "M", "L"]
  }
];