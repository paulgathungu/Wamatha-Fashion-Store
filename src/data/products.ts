export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory: string;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  brand: string;
  colors: {name: string;hex: string;}[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  material: string;
  fit: string;
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export const products: Product[] = [
{
  id: '1',
  name: 'Premium Leather Jacket',
  slug: 'premium-leather-jacket',
  price: 12999,
  originalPrice: 18999,
  discount: 32,
  images: [
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
  'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=600',
  'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600'],

  category: 'Jackets',
  subcategory: 'Leather',
  gender: 'men',
  brand: 'UrbanEdge',
  colors: [
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Burgundy', hex: '#800020' }],

  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  rating: 4.8,
  reviewCount: 234,
  inStock: true,
  stockCount: 15,
  description:
  'Crafted from genuine leather with a modern slim fit. Features premium YKK zippers, quilted lining, and adjustable waist tabs. Perfect for any occasion.',
  material: '100% Genuine Leather',
  fit: 'Slim Fit',
  tags: ['leather', 'jacket', 'premium', 'winter'],
  isFeatured: true,
  isNewArrival: false,
  isBestSeller: true,
  isOnSale: true,
  createdAt: '2024-01-15'
},
{
  id: '2',
  name: 'Classic White Sneakers',
  slug: 'classic-white-sneakers',
  price: 7999,
  originalPrice: 9999,
  discount: 20,
  images: [
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600'],

  category: 'Shoes',
  subcategory: 'Sneakers',
  gender: 'unisex',
  brand: 'StepUp',
  colors: [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Off White', hex: '#FAF9F6' }],

  sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  rating: 4.6,
  reviewCount: 567,
  inStock: true,
  stockCount: 42,
  description:
  'Minimalist design meets maximum comfort. Premium leather upper with cushioned insole and durable rubber outsole.',
  material: 'Premium Leather Upper, Rubber Sole',
  fit: 'True to Size',
  tags: ['sneakers', 'white', 'casual', 'everyday'],
  isFeatured: true,
  isNewArrival: true,
  isBestSeller: true,
  isOnSale: true,
  createdAt: '2024-03-01'
},
{
  id: '3',
  name: 'Elegant Red Dress',
  slug: 'elegant-red-dress',
  price: 8999,
  originalPrice: 13999,
  discount: 36,
  images: [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600'],

  category: 'Dresses',
  subcategory: 'Evening',
  gender: 'women',
  brand: 'Eleganza',
  colors: [
  { name: 'Red', hex: '#DC2626' },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#1E3A5F' }],

  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  rating: 4.9,
  reviewCount: 189,
  inStock: true,
  stockCount: 8,
  description:
  'A stunning evening dress with a flattering A-line silhouette. Features delicate draping and a subtle slit for elegance.',
  material: 'Silk Blend',
  fit: 'A-Line',
  tags: ['dress', 'evening', 'elegant', 'party'],
  isFeatured: true,
  isNewArrival: false,
  isBestSeller: true,
  isOnSale: true,
  createdAt: '2024-02-10'
},
{
  id: '4',
  name: 'Slim Fit Chinos',
  slug: 'slim-fit-chinos',
  price: 4999,
  originalPrice: 6499,
  discount: 23,
  images: [
  'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600'],

  category: 'Bottoms',
  subcategory: 'Chinos',
  gender: 'men',
  brand: 'UrbanEdge',
  colors: [
  { name: 'Khaki', hex: '#C3B091' },
  { name: 'Navy', hex: '#1E3A5F' },
  { name: 'Olive', hex: '#556B2F' },
  { name: 'Black', hex: '#000000' }],

  sizes: ['28', '30', '32', '34', '36', '38'],
  rating: 4.5,
  reviewCount: 312,
  inStock: true,
  stockCount: 56,
  description:
  'Versatile slim-fit chinos crafted from stretch cotton twill. Perfect for both casual and smart-casual looks.',
  material: '98% Cotton, 2% Elastane',
  fit: 'Slim Fit',
  tags: ['chinos', 'pants', 'casual', 'smart'],
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: true,
  isOnSale: true,
  createdAt: '2024-01-20'
},
{
  id: '5',
  name: 'Oversized Graphic Tee',
  slug: 'oversized-graphic-tee',
  price: 2999,
  images: [
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],

  category: 'Tops',
  subcategory: 'T-Shirts',
  gender: 'unisex',
  brand: 'StreetVibe',
  colors: [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Charcoal', hex: '#36454F' }],

  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  rating: 4.3,
  reviewCount: 445,
  inStock: true,
  stockCount: 120,
  description:
  'Premium heavyweight cotton tee with an oversized fit. Bold graphic print on front and back.',
  material: '100% Organic Cotton (280gsm)',
  fit: 'Oversized',
  tags: ['tshirt', 'graphic', 'streetwear', 'casual'],
  isFeatured: false,
  isNewArrival: true,
  isBestSeller: false,
  isOnSale: false,
  createdAt: '2024-03-15'
},
{
  id: '6',
  name: 'Running Performance Shoes',
  slug: 'running-performance-shoes',
  price: 11999,
  originalPrice: 14999,
  discount: 20,
  images: [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600'],

  category: 'Shoes',
  subcategory: 'Running',
  gender: 'unisex',
  brand: 'StepUp',
  colors: [
  { name: 'Red/Black', hex: '#DC2626' },
  { name: 'Blue/White', hex: '#3B82F6' },
  { name: 'All Black', hex: '#000000' }],

  sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  rating: 4.7,
  reviewCount: 678,
  inStock: true,
  stockCount: 33,
  description:
  'Engineered for speed and comfort. Features responsive foam cushioning, breathable mesh upper, and carbon fiber plate.',
  material: 'Engineered Mesh, Carbon Fiber Plate',
  fit: 'True to Size',
  tags: ['running', 'performance', 'sport', 'athletic'],
  isFeatured: true,
  isNewArrival: true,
  isBestSeller: true,
  isOnSale: true,
  createdAt: '2024-03-10'
},
{
  id: '7',
  name: 'Cashmere Blend Sweater',
  slug: 'cashmere-blend-sweater',
  price: 9499,
  images: [
  'https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=600',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600'],

  category: 'Tops',
  subcategory: 'Sweaters',
  gender: 'women',
  brand: 'Eleganza',
  colors: [
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Blush', hex: '#DE5D83' },
  { name: 'Camel', hex: '#C19A6B' }],

  sizes: ['XS', 'S', 'M', 'L'],
  rating: 4.8,
  reviewCount: 156,
  inStock: true,
  stockCount: 22,
  description:
  'Luxuriously soft cashmere blend sweater with a relaxed fit. Perfect layering piece for cooler months.',
  material: '70% Cashmere, 30% Silk',
  fit: 'Relaxed',
  tags: ['sweater', 'cashmere', 'luxury', 'winter'],
  isFeatured: true,
  isNewArrival: false,
  isBestSeller: false,
  isOnSale: false,
  createdAt: '2024-02-01'
},
{
  id: '8',
  name: 'High-Waist Yoga Leggings',
  slug: 'high-waist-yoga-leggings',
  price: 3999,
  originalPrice: 5499,
  discount: 27,
  images: [
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600',
  'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600'],

  category: 'Bottoms',
  subcategory: 'Leggings',
  gender: 'women',
  brand: 'FlexFit',
  colors: [
  { name: 'Black', hex: '#000000' },
  { name: 'Deep Red', hex: '#8B0000' },
  { name: 'Navy', hex: '#1E3A5F' }],

  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  rating: 4.6,
  reviewCount: 890,
  inStock: true,
  stockCount: 78,
  description:
  'Buttery-soft high-waist leggings with 4-way stretch. Squat-proof, moisture-wicking, with hidden pocket.',
  material: '75% Nylon, 25% Spandex',
  fit: 'Compression',
  tags: ['leggings', 'yoga', 'activewear', 'sport'],
  isFeatured: false,
  isNewArrival: true,
  isBestSeller: true,
  isOnSale: true,
  createdAt: '2024-03-05'
},
{
  id: '9',
  name: 'Tailored Blazer',
  slug: 'tailored-blazer',
  price: 15999,
  originalPrice: 19999,
  discount: 20,
  images: [
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600'],

  category: 'Jackets',
  subcategory: 'Blazers',
  gender: 'men',
  brand: 'UrbanEdge',
  colors: [
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Navy', hex: '#1E3A5F' },
  { name: 'Black', hex: '#000000' }],

  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  rating: 4.7,
  reviewCount: 98,
  inStock: true,
  stockCount: 12,
  description:
  'Impeccably tailored blazer with a modern slim silhouette. Half-canvas construction with premium Italian wool blend.',
  material: 'Italian Wool Blend',
  fit: 'Slim Fit',
  tags: ['blazer', 'formal', 'business', 'premium'],
  isFeatured: true,
  isNewArrival: false,
  isBestSeller: false,
  isOnSale: true,
  createdAt: '2024-01-25'
},
{
  id: '10',
  name: 'Strappy Block Heels',
  slug: 'strappy-block-heels',
  price: 6999,
  originalPrice: 8999,
  discount: 22,
  images: [
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
  'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600'],

  category: 'Shoes',
  subcategory: 'Heels',
  gender: 'women',
  brand: 'Eleganza',
  colors: [
  { name: 'Red', hex: '#DC2626' },
  { name: 'Black', hex: '#000000' },
  { name: 'Nude', hex: '#E8C39E' }],

  sizes: ['36', '37', '38', '39', '40', '41'],
  rating: 4.4,
  reviewCount: 234,
  inStock: true,
  stockCount: 19,
  description:
  'Elegant strappy block heels with cushioned insole. 3-inch block heel for all-day comfort and style.',
  material: 'Genuine Suede',
  fit: 'True to Size',
  tags: ['heels', 'party', 'elegant', 'evening'],
  isFeatured: false,
  isNewArrival: true,
  isBestSeller: false,
  isOnSale: true,
  createdAt: '2024-03-12'
},
{
  id: '11',
  name: 'Denim Jacket Classic',
  slug: 'denim-jacket-classic',
  price: 7499,
  images: [
  'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600',
  'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600'],

  category: 'Jackets',
  subcategory: 'Denim',
  gender: 'unisex',
  brand: 'StreetVibe',
  colors: [
  { name: 'Light Wash', hex: '#87CEEB' },
  { name: 'Dark Wash', hex: '#1E3A5F' },
  { name: 'Black', hex: '#000000' }],

  sizes: ['S', 'M', 'L', 'XL'],
  rating: 4.5,
  reviewCount: 345,
  inStock: true,
  stockCount: 45,
  description:
  'Timeless denim jacket with a modern fit. Premium selvedge denim with brass button hardware.',
  material: '100% Selvedge Denim',
  fit: 'Regular',
  tags: ['denim', 'jacket', 'classic', 'casual'],
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: true,
  isOnSale: false,
  createdAt: '2024-02-15'
},
{
  id: '12',
  name: 'Kids Adventure Sneakers',
  slug: 'kids-adventure-sneakers',
  price: 3499,
  originalPrice: 4499,
  discount: 22,
  images: [
  'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600'],

  category: 'Shoes',
  subcategory: 'Sneakers',
  gender: 'kids',
  brand: 'StepUp',
  colors: [
  { name: 'Multi', hex: '#FF6B6B' },
  { name: 'Blue', hex: '#3B82F6' }],

  sizes: ['28', '29', '30', '31', '32', '33', '34', '35'],
  rating: 4.7,
  reviewCount: 123,
  inStock: true,
  stockCount: 67,
  description:
  'Colorful, durable sneakers designed for active kids. Velcro straps for easy on/off, reinforced toe cap.',
  material: 'Synthetic Mesh, Rubber Sole',
  fit: 'True to Size',
  tags: ['kids', 'sneakers', 'colorful', 'durable'],
  isFeatured: false,
  isNewArrival: true,
  isBestSeller: false,
  isOnSale: true,
  createdAt: '2024-03-08'
}];


export const reviews: Review[] = [
{
  id: 'r1',
  productId: '1',
  userName: 'James K.',
  avatar: 'https://i.pravatar.cc/40?img=1',
  rating: 5,
  title: 'Best jacket I own',
  comment:
  'The quality is outstanding. Fits perfectly and the leather is buttery soft.',
  date: '2024-03-10',
  verified: true
},
{
  id: 'r2',
  productId: '1',
  userName: 'Sarah M.',
  avatar: 'https://i.pravatar.cc/40?img=5',
  rating: 5,
  title: 'Worth every penny',
  comment:
  'Bought this for my husband and he absolutely loves it. Premium quality.',
  date: '2024-03-08',
  verified: true
},
{
  id: 'r3',
  productId: '1',
  userName: 'David L.',
  avatar: 'https://i.pravatar.cc/40?img=3',
  rating: 4,
  title: 'Great but runs small',
  comment: 'Beautiful jacket. Size up if you want a relaxed fit.',
  date: '2024-02-28',
  verified: true
},
{
  id: 'r4',
  productId: '2',
  userName: 'Emily R.',
  avatar: 'https://i.pravatar.cc/40?img=9',
  rating: 5,
  title: 'Perfect everyday shoe',
  comment: 'So comfortable and versatile. Goes with everything!',
  date: '2024-03-12',
  verified: true
},
{
  id: 'r5',
  productId: '2',
  userName: 'Mike T.',
  avatar: 'https://i.pravatar.cc/40?img=7',
  rating: 4,
  title: 'Clean design',
  comment: 'Love the minimalist look. Took a few days to break in.',
  date: '2024-03-05',
  verified: false
},
{
  id: 'r6',
  productId: '3',
  userName: 'Lisa W.',
  avatar: 'https://i.pravatar.cc/40?img=10',
  rating: 5,
  title: 'Stunning dress',
  comment: 'Received so many compliments. The fabric drapes beautifully.',
  date: '2024-03-01',
  verified: true
},
{
  id: 'r7',
  productId: '6',
  userName: 'Alex P.',
  avatar: 'https://i.pravatar.cc/40?img=12',
  rating: 5,
  title: 'Game changer for running',
  comment: 'The carbon plate makes a real difference. PB in my last race!',
  date: '2024-03-14',
  verified: true
},
{
  id: 'r8',
  productId: '6',
  userName: 'Chris N.',
  avatar: 'https://i.pravatar.cc/40?img=15',
  rating: 4,
  title: 'Great performance shoe',
  comment: 'Responsive and lightweight. Wish they had more color options.',
  date: '2024-03-11',
  verified: true
}];


export const brands = [
'UrbanEdge',
'StepUp',
'Eleganza',
'StreetVibe',
'FlexFit'];


export const categories = [
{
  name: 'Men',
  image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400',
  subcategories: ['Tops', 'Bottoms', 'Jackets', 'Shoes', 'Accessories']
},
{
  name: 'Women',
  image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
  subcategories: [
  'Dresses',
  'Tops',
  'Bottoms',
  'Heels',
  'Sneakers',
  'Accessories']

},
{
  name: 'Kids',
  image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400',
  subcategories: ['Tops', 'Bottoms', 'Shoes', 'Accessories']
},
{
  name: 'Accessories',
  image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400',
  subcategories: ['Bags', 'Watches', 'Belts', 'Sunglasses', 'Jewelry']
}];


export const testimonials = [
{
  id: 't1',
  name: 'Amanda Chen',
  avatar: 'https://i.pravatar.cc/60?img=20',
  text: 'Absolutely love the quality! The leather jacket is my go-to piece. Fast shipping too.',
  rating: 5
},
{
  id: 't2',
  name: 'Marcus Johnson',
  avatar: 'https://i.pravatar.cc/60?img=33',
  text: 'Best online shopping experience. The size guide was spot on and returns are hassle-free.',
  rating: 5
},
{
  id: 't3',
  name: 'Priya Patel',
  avatar: 'https://i.pravatar.cc/60?img=25',
  text: 'The red dress exceeded my expectations. Premium fabric and beautiful craftsmanship.',
  rating: 5
},
{
  id: 't4',
  name: 'Tom Williams',
  avatar: 'https://i.pravatar.cc/60?img=52',
  text: 'Great selection of sneakers. The running shoes are incredibly comfortable for daily use.',
  rating: 4
}];