// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// bg-yellow-600 border-yellow-600
// bg-purple-950 border-purple-950
// bg-orange-600 border-orange-600
// bg-teal-800 border-teal-800
// bg-indigo-300 border-indigo-300
// bg-red-800 border-red-800
// bg-pink-500 border-pink-500
// bg-cyan-600 border-cyan-600

import { PRODUCT_PRICES } from "@/config/products";

type MaterialPrices = {
  readonly silicone: number;
  readonly polycarbonate: number;
  readonly leather: number;
  readonly tpu: number;
  readonly metal: number;
  readonly wood: number;
};

type FinishPrices = {
  readonly smooth: number;
  readonly textured: number;
  readonly matte: number;
  readonly glossy: number;
  readonly carbonfiber: number;
  readonly satin: number;
};

declare module "@/config/products" {
  interface ProductPrices {
    material: MaterialPrices;
    finish: FinishPrices;
  }
}

export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  { label: 'Blue', value: 'blue', tw: 'blue-950' },
  { label: 'Rose', value: 'rose', tw: 'rose-950' },
  { label: 'Yellow', value: 'yellow', tw: 'yellow-600' },
  { label: 'Purple', value: 'purple', tw: 'purple-950' },
  { label: 'Orange', value: 'orange', tw: 'orange-600' },
  { label: 'Teal', value: 'teal', tw: 'teal-800' },
  { label: 'Indigo', value: 'indigo', tw: 'indigo-300' },
  { label: 'Red', value: 'red', tw: 'red-800' },
  { label: 'Pink', value: 'pink', tw: 'pink-500' },
  { label: 'Cyan', value: 'cyan', tw: 'cyan-600' },
] as const;

// Models
export const MODELS = {
  name: 'models',
  options: [
    { label: 'iPhone X', value: 'iphonex' },
    { label: 'iPhone XS', value: 'iphonexs' },
    { label: 'iPhone XS Max', value: 'iphonexsmax' },
    { label: 'iPhone XR', value: 'iphonexr' },
    { label: 'iPhone 11', value: 'iphone11' },
    { label: 'iPhone 11 Pro', value: 'iphone11pro' },
    { label: 'iPhone 11 Pro Max', value: 'iphone11promax' },
    { label: 'iPhone 12', value: 'iphone12' },
    { label: 'iPhone 12 Mini', value: 'iphone12mini' },
    { label: 'iPhone 12 Pro', value: 'iphone12pro' },
    { label: 'iPhone 12 Pro Max', value: 'iphone12promax' },
    { label: 'iPhone 13', value: 'iphone13' },
    { label: 'iPhone 13 Mini', value: 'iphone13mini' },
    { label: 'iPhone 13 Pro', value: 'iphone13pro' },
    { label: 'iPhone 13 Pro Max', value: 'iphone13promax' },
    { label: 'iPhone 14', value: 'iphone14' },
    { label: 'iPhone 14 Plus', value: 'iphone14plus' },
    { label: 'iPhone 14 Pro', value: 'iphone14pro' },
    { label: 'iPhone 14 Pro Max', value: 'iphone14promax' },
    { label: 'iPhone 15', value: 'iphone15' },
    { label: 'iPhone 15 Plus', value: 'iphone15plus' },
    { label: 'iPhone 15 Pro', value: 'iphone15pro' },
    { label: 'iPhone 15 Pro Max', value: 'iphone15promax' },
  ],
} as const;

// Materials
export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Silicone',
      value: 'silicone',
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: 'Soft Polycarbonate',
      value: 'polycarbonate',
      description: 'Scratch-resistant coating',
      price: PRODUCT_PRICES.material.polycarbonate,
    },
    {
      label: 'Leather',
      value: 'leather',
      description: 'Premium feel and durable',
      price: PRODUCT_PRICES.material.leather,
    },
    {
      label: 'Metal',
      value: 'metal',
      description: 'Sturdy, industrial look',
      price: PRODUCT_PRICES.material.metal,
    },
    {
      label: 'Wood',
      value: 'wood',
      description: 'Eco-friendly, natural look',
      price: PRODUCT_PRICES.material.wood,
    },
  ],
} as const;

// Finishes
export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'Smooth Finish',
      value: 'smooth',
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: 'Textured Finish',
      value: 'textured',
      description: 'Soft grippy texture',
      price: PRODUCT_PRICES.finish.textured,
    },
    {
      label: 'Matte Finish',
      value: 'matte',
      description: 'Non-reflective, elegant look',
      price: PRODUCT_PRICES.finish.matte,
    },
    {
      label: 'Glossy Finish',
      value: 'glossy',
      description: 'Shiny, reflective surface',
      price: PRODUCT_PRICES.finish.glossy,
    },
    {
      label: 'Carbon Fiber Finish',
      value: 'carbonfiber',
      description: 'High-tech, premium look',
      price: PRODUCT_PRICES.finish.carbonfiber,
    },
    {
      label: 'Satin Finish',
      value: 'satin',
      description: 'Smooth with a soft sheen',
      price: PRODUCT_PRICES.finish.satin,
    },
  ],
} as const;