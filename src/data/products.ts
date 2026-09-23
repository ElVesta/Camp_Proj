import card1 from '../assets/card1.png'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.png'
import card4 from '../assets/card4.png'
import card5 from '../assets/card5.png'
import card6 from '../assets/card6.png'
import card7 from '../assets/card7.png'
import card8 from '../assets/card8.webp'
import card10 from '../assets/card10.png'
import card12 from '../assets/card12.webp'
import card14 from '../assets/card14.webp'
import card23 from '../assets/card23.jpg'

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

export const products: Product[] = [
  {
    id: 1,
    title: "Рюкзак Outventure Creek 65 литров",
    price: 8.00,
    thumbnail: card2,
    description: "Вместительный рюкзак для длительных походов с системой распределения нагрузки.",
    category: "backpack",
    season: "summer",
    rating: 4.8,
    stock: 15,
    images: [card2],
  },
  {
    id: 2,
    title: "Рюкзак Deuter 70L Aircontact",
    price: 15.00,
    thumbnail: card7,
    description: "Профессиональный треккинговый рюкзак с анатомической спинкой.",
    category: "backpack",
    season: "all",
    rating: 4.9,
    stock: 5,
    images: [card7],
  },
  {
    id: 3,
    title: "Палатка NatureHike 4-местная",
    price: 12.50,
    thumbnail: card3,
    description: "Легкая и прочная палатка для кемпинга с быстрой установкой.",
    category: "tent",
    season: "summer",
    rating: 4.6,
    stock: 8,
    images: [card3],
  },
  {
    id: 4,
    title: "Палатка 4 сезона",
    price: 25.00,
    thumbnail: card1,
    description: "Всесезонная палатка для экстремальных условий и зимних походов.",
    category: "tent",
    season: "winter",
    rating: 4.5,
    stock: 3,
    images: [card1],
  },
  {
    id: 5,
    title: "Палатка Camp 2-местная",
    price: 18.00,
    thumbnail: card5,
    description: "Компактная двухместная палатка для легких походов.",
    category: "tent",
    season: "summer",
    rating: 4.4,
    stock: 10,
    images: [card5],
  },
  {
    id: 6,
    title: "Спальный мешок Nordway -5°C",
    price: 5.99,
    thumbnail: card8,
    description: "Теплый спальный мешок для зимних походов до -5°C.",
    category: "sleeping",
    season: "winter",
    rating: 4.7,
    stock: 20,
    images: [card8],
  },
  {
    id: 7,
    title: "Горелка туристическая",
    price: 3.50,
    thumbnail: card4,
    description: "Компактная газовая горелка для приготовления пищи в походе.",
    category: "cooking",
    season: "all",
    rating: 4.4,
    stock: 30,
    images: [card4],
  },
  {
    id: 8,
    title: "Набор шампуров (6 шт)",
    price: 2.99,
    thumbnail: card6,
    description: "Складные шампуры для приготовления мяса на костре.",
    category: "cooking",
    season: "summer",
    rating: 4.5,
    stock: 18,
    images: [card6],
  },
  {
    id: 9,
    title: "Плита портативная газовая",
    price: 12.99,
    thumbnail: card10,
    description: "Портативная газовая плитка с двумя конфорками для кемпинга.",
    category: "cooking",
    season: "all",
    rating: 4.7,
    stock: 8,
    images: [card10],
  },
  {
    id: 10,
    title: "Сноуборд с креплениями",
    price: 18.00,
    thumbnail: card12,
    description: "Сноуборд для начинающих и продвинутых райдеров, размер 155 см.",
    category: "gear",
    season: "winter",
    rating: 4.9,
    stock: 4,
    images: [card12],
  },
  {
    id: 11,
    title: "Куртка зимняя туристическая",
    price: 22.00,
    thumbnail: card23,
    description: "Теплая зимняя куртка для активного отдыха, ветрозащитная, с утеплителем.",
    category: "clothing",
    season: "winter",
    rating: 4.8,
    stock: 12,
    images: [card23],
  },
  {
    id: 12,
    title: "Электросамокат Ninebot",
    price: 10.00,
    thumbnail: card14,
    description: "Мощный электросамокат с запасом хода до 25 км.",
    category: "gear",
    season: "summer",
    rating: 4.9,
    stock: 3,
    images: [card14],
  },
];