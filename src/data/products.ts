export type Product = {
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  compare?: string;
  isNew?: boolean;
  isSale?: boolean;
};

export const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1677142699617-5879ba422c83?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CATEGORY_IMAGES: Record<string, string> = {
  "Rice & Grains": PRODUCT_IMAGE,
  "Spices & Masala":
    "https://images.unsplash.com/photo-1610602925036-1d81bb50065a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Dal & Pulses":
    "https://images.unsplash.com/photo-1737735633629-f9ed8408a176?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Snacks & Bengali/Indian Favorites":
    "https://images.unsplash.com/photo-1688217170693-e821c6e18d72?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Oil & Cooking Essentials":
    "https://images.unsplash.com/photo-1757801333112-7b89af15c7fe?q=80&w=1051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Vegetables & Everyday Items":
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const CATEGORY_ITEMS: { label: string; items: string[] }[] = [
  {
    label: "Rice & Grains",
    items: [
      "Muri (Puffed Rice)",
      "Basmati Rice",
      "Gobindobhog Rice",
      "Atap Rice",
      "Sona Masoori Rice",
      "Poha (Flattened Rice)",
      "Suji / Rava",
      "Dalia",
      "Atta",
      "Maida",
      "Besan",
    ],
  },
  {
    label: "Spices & Masala",
    items: [
      "Red Chilli Powder",
      "Turmeric Powder",
      "Cumin (Jeera)",
      "Coriander Powder",
      "Black Pepper",
      "Garam Masala",
      "Panch Phoron",
      "Mustard Seeds",
      "Green Cardamom",
      "Cinnamon",
      "Cloves",
      "Bay Leaf",
      "Dry Red Chilli",
      "Kashmiri Chilli Powder",
    ],
  },
  {
    label: "Dal & Pulses",
    items: [
      "Moong Dal",
      "Masoor Dal",
      "Toor Dal",
      "Chana Dal",
      "Urad Dal",
      "Kabuli Chana",
      "Kala Chana",
      "Rajma",
      "Matar Dal",
    ],
  },
  {
    label: "Oil & Cooking Essentials",
    items: [
      "Mustard Oil",
      "Sunflower Oil",
      "Soybean Oil",
      "Rice Bran Oil",
      "Coconut Oil",
      "Ghee",
      "Salt",
      "Sugar",
      "Jaggery (Gur)",
    ],
  },
  {
    label: "Snacks & Bengali/Indian Favorites",
    items: [
      "Muri",
      "Chanachur",
      "Bhujia",
      "Papad",
      "Nimki",
      "Puffed Rice",
      "Chira",
      "Murukku",
      "Mixture",
    ],
  },
  {
    label: "Vegetables & Everyday Items",
    items: [
      "Potato",
      "Onion",
      "Tomato",
      "Garlic",
      "Ginger",
      "Green Chilli",
      "Coriander Leaves",
      "Lemon",
      "Coconut",
    ],
  },
];

export const CATEGORY_LABELS = CATEGORY_ITEMS.map((group) => group.label);

function buildProduct(
  name: string,
  category: string,
  index: number,
  categoryIndex: number,
): Product {
  const seed = index * 13 + categoryIndex * 29;
  const rating = Number((3.2 + ((seed * 7) % 18) / 10).toFixed(1));
  const reviews = (seed % 160) + 14;
  const price = (seed % 26) + 2 + (seed % 100) / 100;
  const isSale = index % 3 === 0;
  const isNew = index % 5 === 0;
  return {
    name,
    category,
    image: CATEGORY_IMAGES[category] ?? PRODUCT_IMAGE,
    rating,
    reviews,
    price: price.toFixed(2),
    ...(isSale ? { compare: (price + 2 + (index % 4)).toFixed(2) } : {}),
    isNew,
    isSale,
  };
}

export const PRODUCTS: Product[] = CATEGORY_ITEMS.flatMap((group, groupIndex) =>
  group.items.map((name, index) =>
    buildProduct(name, group.label, index, groupIndex),
  ),
);