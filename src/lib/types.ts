export type CategorySlug = "phones" | "accessories";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductVariant = {
  /** Display label, e.g. "Black" or "Buy 3" */
  name: string;
  /** Optional colour swatch */
  swatch?: string;
  /** Variant price in INR (same as base price when no override) */
  price: number;
  /** Variant MRP in INR for strike-through pricing */
  mrp?: number | null;
  inStock: boolean;
};

export type Faq = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  tagline: string;
  /** Base (lowest) selling price in INR */
  price: number;
  /** MRP before discount, in INR */
  mrp: number | null;
  inStock: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  images: string[];
  /** Colour/pack selector options */
  variants: ProductVariant[];
  /** One-line bullets shown beside the buy box */
  highlights: string[];
  /** Full description paragraphs (from the original product page) */
  description: string[];
  /** Additional information table */
  specs: [string, string][];
  /** Items supplied in the retail box */
  inBox?: string[];
  faqs: Faq[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  source: "Google";
  purchasedModel?: string;
};

export type CartItem = {
  slug: string;
  variant: string;
  qty: number;
  /** Price snapshot in INR at time of adding */
  price: number;
  mrp: number | null;
  name: string;
  image: string;
};

export type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "prepaid" | "cod";
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

export type StoreOrder = OrderPayload & {
  id: string;
  status: string;
  createdAt: string;
};
