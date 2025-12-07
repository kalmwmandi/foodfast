export interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  category: string
  deliveryTime: string
  deliveryFee: number
  distance: string
  priceRange: string
  isOpen: boolean
  address: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isPopular?: boolean
  isSpicy?: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
  notes?: string
}

export interface Order {
  id: string
  restaurant: Restaurant
  items: CartItem[]
  status: "pending" | "confirmed" | "preparing" | "on-the-way" | "delivered"
  totalAmount: number
  orderTime: string
  estimatedDelivery: string
  driverName?: string
  driverPhone?: string
}

export interface Review {
  id: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  images?: string[]
}

export const categories = [
  { id: "all", name: "Semua", icon: "🍽️" },
  { id: "indonesian", name: "Indonesia", icon: "🍛" },
  { id: "japanese", name: "Jepang", icon: "🍱" },
  { id: "western", name: "Western", icon: "🍔" },
  { id: "chinese", name: "Chinese", icon: "🥟" },
  { id: "coffee", name: "Kopi", icon: "☕" },
  { id: "dessert", name: "Dessert", icon: "🍰" },
]

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Warung Padang Sederhana",
    image: "/indonesian-padang-food-restaurant.jpg",
    rating: 4.8,
    reviewCount: 1250,
    category: "indonesian",
    deliveryTime: "20-30",
    deliveryFee: 8000,
    distance: "1.2 km",
    priceRange: "$$",
    isOpen: true,
    address: "Jl. Sudirman No. 123",
  },
  {
    id: "2",
    name: "Sushi Tei Express",
    image: "/japanese-sushi-restaurant.png",
    rating: 4.6,
    reviewCount: 890,
    category: "japanese",
    deliveryTime: "25-35",
    deliveryFee: 12000,
    distance: "2.5 km",
    priceRange: "$$$",
    isOpen: true,
    address: "Mall Central Park Lt. 3",
  },
  {
    id: "3",
    name: "Burger King",
    image: "/burger-king-restaurant.jpg",
    rating: 4.4,
    reviewCount: 2100,
    category: "western",
    deliveryTime: "15-25",
    deliveryFee: 10000,
    distance: "0.8 km",
    priceRange: "$$",
    isOpen: true,
    address: "Jl. Gatot Subroto No. 45",
  },
  {
    id: "4",
    name: "Din Tai Fung",
    image: "/chinese-dimsum-restaurant.jpg",
    rating: 4.9,
    reviewCount: 3200,
    category: "chinese",
    deliveryTime: "30-40",
    deliveryFee: 15000,
    distance: "3.1 km",
    priceRange: "$$$",
    isOpen: true,
    address: "Grand Indonesia Lt. 5",
  },
  {
    id: "5",
    name: "Kopi Kenangan",
    image: "/modern-coffee-shop.png",
    rating: 4.5,
    reviewCount: 5600,
    category: "coffee",
    deliveryTime: "10-20",
    deliveryFee: 5000,
    distance: "0.5 km",
    priceRange: "$",
    isOpen: true,
    address: "Jl. MH Thamrin No. 10",
  },
  {
    id: "6",
    name: "Sour Sally",
    image: "/frozen-yogurt-dessert-shop.jpg",
    rating: 4.3,
    reviewCount: 780,
    category: "dessert",
    deliveryTime: "15-25",
    deliveryFee: 8000,
    distance: "1.8 km",
    priceRange: "$$",
    isOpen: false,
    address: "Plaza Indonesia Lt. 2",
  },
]

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Nasi Padang Komplit",
    description: "Nasi putih dengan rendang, ayam pop, daun singkong, dan sambal hijau",
    price: 45000,
    image: "/nasi-padang-complete.jpg",
    category: "main",
    isPopular: true,
  },
  {
    id: "m2",
    name: "Rendang Sapi",
    description: "Daging sapi empuk dengan bumbu rendang khas Minang",
    price: 35000,
    image: "/beef-rendang.jpg",
    category: "main",
    isPopular: true,
    isSpicy: true,
  },
  {
    id: "m3",
    name: "Ayam Pop",
    description: "Ayam rebus dengan sambal lado hijau",
    price: 28000,
    image: "/ayam-pop-padang.jpg",
    category: "main",
  },
  {
    id: "m4",
    name: "Gulai Otak",
    description: "Otak sapi dengan kuah gulai kental",
    price: 32000,
    image: "/gulai-otak.jpg",
    category: "main",
    isSpicy: true,
  },
  {
    id: "m5",
    name: "Es Teh Manis",
    description: "Teh manis dingin segar",
    price: 8000,
    image: "/iced-sweet-tea.jpg",
    category: "drink",
  },
  {
    id: "m6",
    name: "Es Jeruk",
    description: "Jus jeruk segar dengan es",
    price: 12000,
    image: "/fresh-orange-juice.png",
    category: "drink",
  },
]

export const reviews: Review[] = [
  {
    id: "r1",
    userName: "Ahmad Fadli",
    userAvatar: "/indonesian-man-avatar.jpg",
    rating: 5,
    comment: "Rendangnya super enak! Dagingnya empuk dan bumbunya meresap sempurna. Pengiriman juga cepat.",
    date: "2 hari lalu",
    images: ["/rendang-close-up.jpg"],
  },
  {
    id: "r2",
    userName: "Siti Nurhaliza",
    userAvatar: "/indonesian-woman-avatar-hijab.jpg",
    rating: 4,
    comment: "Porsinya banyak dan harganya worth it. Sambalnya pedas mantap!",
    date: "1 minggu lalu",
  },
  {
    id: "r3",
    userName: "Budi Santoso",
    userAvatar: "/indonesian-man-professional-avatar.jpg",
    rating: 5,
    comment: "Langganan sejak 2019. Kualitas selalu konsisten dan pelayanan ramah.",
    date: "2 minggu lalu",
  },
]
