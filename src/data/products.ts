import achar from "@/assets/achar.jpeg";
import alta from "@/assets/alta.jpeg";
import bisut from "@/assets/bisut.jpeg";
import bori from "@/assets/bori.jpeg";
import boriRed from "@/assets/bori-red.jpeg";
import chanachurMouchak from "@/assets/chanachur-mouchak.jpeg";
import chanachurTikaram from "@/assets/chanachur-tikaram.jpeg";
import chireBhajaBr from "@/assets/chire-bhaja-br.jpeg";
import chireBhaja from "@/assets/Chire-bhaja.jpeg";
import chowmin from "@/assets/chowmin.jpeg";
import dhoka from "@/assets/Dhoka.jpeg";
import dryChola from "@/assets/dry-chola.jpeg";
import fan from "@/assets/fan.jpeg";
import garamMasala from "@/assets/garam-masla-sunrise.jpeg";
import joian from "@/assets/joian.jpeg";
import nimki from "@/assets/nimki.jpeg";
import sadaChire from "@/assets/sada-chire.jpeg";
import talmichri from "@/assets/talmichri.jpeg";

export type Product = {
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  compare?: string;
  isNew?: boolean;
  isSale?: boolean;
};

const RAW: { name: string; image: string }[] = [
  { name: "Achar (Pickle)", image: achar },
  { name: "Alta (Red Alta)", image: alta },
  { name: "Bisut (Spice Mix)", image: bisut },
  { name: "Bori (Sundried Lentil Dumplings)", image: bori },
  { name: "Bori Red (Red Lentil Dumplings)", image: boriRed },
  { name: "Chanachur Mouchak", image: chanachurMouchak },
  { name: "Chanachur Tikaram", image: chanachurTikaram },
  { name: "Chire Bhaja (BR)", image: chireBhajaBr },
  { name: "Chire Bhaja", image: chireBhaja },
  { name: "Chowmin", image: chowmin },
  { name: "Dhoka (Lentil Cake)", image: dhoka },
  { name: "Dry Chola (Chickpeas)", image: dryChola },
  { name: "Fan (Vermicelli)", image: fan },
  { name: "Garam Masala (Sunrise)", image: garamMasala },
  { name: "Joian (Cumin Mix)", image: joian },
  { name: "Nimki (Crispy Snack)", image: nimki },
  { name: "Sada Chire (Flattened Rice)", image: sadaChire },
  { name: "Talmichri (Rice Flakes Mix)", image: talmichri },
];

export const PRODUCTS: Product[] = RAW.map((item, index) => {
  const seed = index * 13 + 29;
  const rating = Number((3.2 + ((seed * 7) % 18) / 10).toFixed(1));
  const reviews = (seed % 160) + 14;
  const price = (seed % 26) + 2 + (seed % 100) / 100;
  const isSale = index % 3 === 0;
  const isNew = index % 5 === 0;
  return {
    name: item.name,
    image: item.image,
    rating,
    reviews,
    price: price.toFixed(2),
    ...(isSale ? { compare: (price + 2 + (index % 4)).toFixed(2) } : {}),
    isNew,
    isSale,
  };
});
