import type { Category, Product, Review } from "./types";

/**
 * Catalogue mirrored from the live store at dumbphones.co.in (WordPress / WooCommerce).
 * Product names, pricing, discounting, variant options, stock status, imagery,
 * descriptions and policy copy are reproduced from the original website.
 *
 * This is a static snapshot, NOT a live stock or pricing feed. Update and
 * redeploy it after checking the real store; see README.md before going live.
 */

export const STORE = {
  name: "Dumbphones India",
  tagline: "Compact phones for a quieter day.",
  blurb:
    "Started with a Cats22 flip phone in 2022, Dumbphones India helps people step back from digital noise without giving up essentials like WhatsApp, UPI and banking apps.",
  logoUrl: "https://dumbphones.co.in/wp-content/uploads/2025/05/logo3-scaled-300x300.png",
  address:
    "1st floor, Regal Diamond Centre, Office No. 114/115, Charni Road, Opera House, Mumbai, Maharashtra 400004",
  mapsUrl: "https://maps.app.goo.gl/Gm4t51YisQfjBDSN7",
  sales: {
    label: "Sales",
    note: "For product queries, doubts, pricing, or anything you need help with before buying.",
    email: "sales@dumbphones.co.in",
    phone: "+91 91361 12273",
    phoneHref: "+919136112273",
    hours: "Monday to Saturday, 11:30 AM – 8:00 PM IST · Sunday closed",
  },
  support: {
    label: "Customer Support",
    note: "For order updates, cancellations, delivery issues, replacements, or technical support.",
    email: "support@dumbphones.co.in",
    phone: "+91 81041 12273",
    phoneHref: "+918104112273",
    hours: "Monday to Saturday, 11:30 AM – 8:00 PM IST · Sunday closed",
  },
  grievance: {
    officer: "Abdullah",
    email: "support@dumbphones.co.in",
    phone: "+91 81041 12273",
    promise:
      "The Grievance Officer acknowledges complaints within 48 hours and endeavours to resolve them within 30 days of receipt.",
  },
  socials: {
    facebook: "https://www.facebook.com/dumbphones.india/",
    twitter: "https://x.com/Dumbphonesindia",
    youtube: "https://www.youtube.com/@DumbphonesIndia",
    instagram: "https://www.instagram.com/dumbphones_india/?hl=en",
    indiamart: "https://www.indiamart.com/dumbphonesindia-mumbai/",
  },
  googleRating: 4.5,
  googleReviewCount: 86,
} as const;

/**
 * The transparency note printed on every original product page.
 */
export const TRANSPARENCY_NOTE =
  "At Dumbphones India, we believe in complete transparency. We don't charge any extra custom duty, advance payment, or booking amount like other dropshipping sellers. The price displayed on our website is the final net price, with no hidden costs. If you choose Cash on Delivery (COD), only a small COD confirmation & handling fee applies. For prepaid orders, we offer free shipping across India. We deal only in in-hand stock, which means every model listed on our website is physically available at our office in Mumbai and ready to dispatch immediately — no pre-orders, no waiting!";

export const CATEGORIES: Category[] = [
  {
    slug: "phones",
    name: "Phones",
    blurb:
      "Discover easy-to-use, long-lasting keypad and compact phones — perfect for those who value simplicity and strong battery life.",
    image: "https://dumbphones.co.in/wp-content/uploads/2026/02/Qin-F25-Pro-1.webp",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Genuine spares and add-ons that keep your dumbphone running for years.",
    image: "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-8.40.19-PM-1.jpeg",
  },
];

const BLACK = { name: "Black", hex: "#1d1d1f" };
const WHITE = { name: "White", hex: "#f1f0ea" };
const BLUE = { name: "Blue", hex: "#33508f" };
const RED = { name: "Red", hex: "#a92b30" };

function colorVariants(colors: { name: string; hex: string }[], price: number, mrp: number | null, inStock: boolean) {
  return colors.map((c) => ({
    name: c.name,
    swatch: c.hex,
    price,
    mrp,
    inStock,
  }));
}

export const PRODUCTS: Product[] = [
  {
    slug: "duoqin-f25-pro",
    name: "Duoqin F25 Pro",
    brand: "Duoqin",
    category: "phones",
    tagline: "Android 14 smart touchscreen phone — Google version, compact keypad body.",
    price: 22999,
    mrp: 28899,
    inStock: true,
    bestSeller: false,
    newArrival: true,
    images: [
      "https://dumbphones.co.in/wp-content/uploads/2026/02/Qin-F25-Pro-1.webp",
      "https://dumbphones.co.in/wp-content/uploads/2026/02/DocScanner-30-Jan-2026-6-15-pm1-10.webp",
      "https://dumbphones.co.in/wp-content/uploads/2026/02/DocScanner-30-Jan-2026-6-15-pm1-7.webp",
      "https://dumbphones.co.in/wp-content/uploads/2026/02/DocScanner-30-Jan-2026-6-15-pm1-9.webp",
    ],
    variants: colorVariants([BLACK], 22999, 28899, true),
    highlights: [
      "Android 14 — latest OS",
      "3.54-inch compact touchscreen",
      "6GB RAM + 128GB storage",
      "Dual SIM standby",
      "4G LTE — works with Indian carriers",
    ],
    description: [
      "Duoqin F25 Pro – Android 14 Smart Touchscreen Phone (Free Shipping) (Google Version).",
      "The Duoqin F25 Pro combines a compact design, modern Android performance, and a lightweight body—making it a perfect everyday smartphone for users who want simplicity, smooth speed, and essential smart features in a small form factor.",
      "Powered by Android 14 and equipped with dual SIM support, the Duoqin F25 Pro is built for dependable daily use, clear viewing, and efficient multitasking.",
    ],
    specs: [
      ["Operating System", "Android 14"],
      ["Display", '3.54-inch compact touchscreen'],
      ["Memory", "6GB RAM + 128GB storage"],
      ["SIM", "Dual SIM standby"],
      ["Network", "4G LTE"],
      ["Colour", "Black"],
    ],
    faqs: [],
  },
  {
    slug: "unihertz-titan-2",
    name: "Unihertz Titan 2",
    brand: "Unihertz",
    category: "phones",
    tagline: "5G QWERTY smartphone — retro design, modern power.",
    price: 49999,
    mrp: 55999,
    inStock: false,
    bestSeller: false,
    newArrival: true,
    images: [
      "https://dumbphones.co.in/wp-content/uploads/2026/02/Unihertz-Titan-2.webp",
      "https://dumbphones.co.in/wp-content/uploads/2026/02/Unihertz-Titan-2_page-0010.webp",
      "https://dumbphones.co.in/wp-content/uploads/2026/02/Unihertz-Titan-2_page-0002.webp",
      "https://dumbphones.co.in/wp-content/uploads/2026/02/Unihertz-Titan-2_page-0003.webp",
    ],
    variants: colorVariants([BLACK], 49999, 55999, false),
    highlights: [
      "Physical QWERTY keyboard",
      "Global 5G unlocked",
      "Android 15",
      "Customisable keys + dual displays",
      "Built for power users & travellers",
    ],
    description: [
      "Titan 2 – 5G QWERTY Smartphone (Retro Design. Modern Power.) – Free Shipping.",
      "The Titan 2 brings back the joy of physical keyboards—reimagined for the modern 5G era. It blends classic QWERTY craftsmanship with cutting-edge Android 15 performance, giving you a rare smartphone experience: retro design, non-retro specs.",
      "From customizable keys to dual displays, the Titan 2 is built for power users, professionals, travelers, and anyone who values precision typing, durability, and long-lasting performance.",
    ],
    specs: [
      ["Operating System", "Android 15"],
      ["Keyboard", "Physical QWERTY with customizable keys"],
      ["Displays", "Dual displays"],
      ["2G", "GSM"],
      ["3G", "WCDMA / CDMA2000"],
      ["4G", "LTE (FDD + TDD)"],
      ["5G NR Bands", "N1/N2/N3/N5/N7/N8/N20/N25/N26/N28/N38/N40/N41/N48/N71/N77/N78"],
      ["Colour", "Black"],
    ],
    faqs: [],
  },
  {
    slug: "unihertz-jelly-star",
    name: "Unihertz Jelly Star",
    brand: "Unihertz",
    category: "phones",
    tagline: "The world's smallest Android 13 smartphone — 3.0-inch, 8+256GB, NFC.",
    price: 24999,
    mrp: null,
    inStock: false,
    bestSeller: true,
    newArrival: true,
    images: ["https://dumbphones.co.in/wp-content/uploads/2025/10/Unihertz-Jelly-Star.webp", "https://dumbphones.co.in/wp-content/uploads/2025/10/jelly-star-red-2.png"],
    variants: colorVariants([BLACK, BLUE, RED], 24999, null, false),
    highlights: [
      "Android 13",
      '3.0-inch LCD — 95.1 × 49.6 mm body',
      "8GB RAM + 256GB storage (UFS 2.2)",
      "48MP rear + 8MP front camera",
      "NFC, fingerprint sensor, IR blaster, FM radio",
    ],
    description: [
      "Unihertz Jelly Star Android 13 Mini Smartphone, 3.0″ Display, 8+256GB, 2000mAh, 48MP Camera, 4G Compact Rugged Phone.",
      "A credit-card-sized Android that does the essentials brilliantly — full Google Play access, NFC payments, GPS navigation and a 48MP camera in a body that weighs just 116 grams.",
    ],
    specs: [
      ["Operating System", "Android 13"],
      ["Processor", "Helio G99 Octa-Core (2.0–2.2GHz)"],
      ["Screen", "3.0-inch LCD display (480 × 854 pixels)"],
      ["Memory", "8GB RAM + 256GB Storage (UFS 2.2)"],
      ["Camera", "48MP rear (Auto Focus), 8MP front (Fixed Focus)"],
      ["Battery", "2000mAh (non-removable), 10W charging"],
      ["Connectivity", "Wi-Fi, Hotspot, Bluetooth 5.3, NFC, GPS + GLONASS + BeiDou + Galileo"],
      ["SIM", "Dual Nano SIM (SIM 1 + Hybrid slot – SIM or Micro SD)"],
      ["Security", "Back-mounted fingerprint sensor, face recognition"],
      ["Extras", "Infrared port, programmable key, 3.5mm headphone jack, FM radio"],
      ["USB", "Type-C with OTG support"],
      ["Sensors", "G-Sensor, Compass, Gyroscope, Proximity, Ambient Light"],
      ["Dimensions", "95.1 × 49.6 × 18.7 mm"],
      ["Weight", "116g (with battery)"],
      ["2G GSM", "2/3/5/8"],
      ["3G WCDMA", "1/2/4/5/6/8/19"],
      ["3G CDMA2000", "BC0 / BC1"],
      ["4G FDD-LTE", "1/2/3/4/5/7/8/12/13/17/18/19/20/25/26/28A/28B/66"],
      ["4G TDD-LTE", "34/38/39/40/41"],
      ["Colours", "Black, Blue, Red"],
    ],
    faqs: [],
  },
  {
    slug: "qin-f22-pro",
    name: "Qin F22 Pro — Google Play Store Edition",
    brand: "Qin",
    category: "phones",
    tagline: "3.54″ touchscreen keypad phone with Android 12, Helio G85 and 6+64GB.",
    price: 18799,
    mrp: 24599,
    inStock: true,
    bestSeller: true,
    newArrival: false,
    images: [
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.18.58-PM-1.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.18.58-PM.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.18.59-PM.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.18.59-PM-1.jpeg",
    ],
    variants: colorVariants([BLACK, WHITE], 18799, 24599, true),
    highlights: [
      "Android 12 with Google Play Store",
      "Helio G85 processor",
      "6GB RAM + 64GB storage",
      "8MP rear + 2MP front camera",
      "2150mAh battery, 116g",
    ],
    description: [
      "Qin F22 Pro Android 12 Dumbphone, 3.54″ Touchscreen, 6+64GB, 2150mAh, 8MP Camera, 4G Minimalist Work Phone.",
      "The definitive minimalist work phone: a real keypad, a 3.54-inch touchscreen, and enough power for WhatsApp, UPI, banking and authenticator apps — without the gravity well of social feeds.",
    ],
    specs: [
      ["Operating System", "Android 12"],
      ["Processor", "MTK Helio G85"],
      ["Screen", "3.5-inch 640 × 960 touchscreen"],
      ["Memory", "6GB RAM (LPDDR4X-1800MHz) + 64GB storage"],
      ["Camera", "8MP rear, 2MP front"],
      ["Battery", "2150mAh"],
      ["Connectivity", "Wi-Fi, Hotspot, Bluetooth"],
      ["Audio", "Type-C and TWS headphone compatibility"],
      ["2G", "GSM 2/3/5/8"],
      ["3G", "WCDMA 1/2/5/8"],
      ["4G TDD-LTE", "34/38/39/40/41"],
      ["4G FDD-LTE", "1/3/5/7/8/20/28A/28B"],
      ["Dimensions", "147 × 58 × 9 mm"],
      ["Weight", "116g"],
      ["Colours", "Black, White"],
    ],
    faqs: [],
  },
  {
    slug: "qin-f22-no-camera",
    name: "Qin F22 (No Camera) — 3GB RAM / 32GB Storage",
    brand: "Qin",
    category: "phones",
    tagline: "Camera-free Android 11 button phone for factory and office use.",
    price: 12799,
    mrp: 16699,
    inStock: true,
    bestSeller: false,
    newArrival: false,
    images: [
      "https://dumbphones.co.in/wp-content/uploads/2025/10/Qin-F22-without-camera-version.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/10/Qin-F22-without-camera-version-1.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/10/Qin-F22-without-camera-version-7.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/10/Qin-F22-without-camera-version-6.jpeg",
    ],
    variants: colorVariants([BLACK, WHITE], 12799, 16699, true),
    highlights: [
      "No camera — safe for restricted workplaces",
      "Android 11 with Google Play Store",
      "2.8-inch touchscreen (480 × 640)",
      "3GB RAM + 32GB storage",
      "1700mAh battery, Type-C",
    ],
    description: [
      "Qin F22 with Google Play Store — Android 11 minimalist button phone, no camera, 2.8″ touchscreen, 3+32GB, MTK6739 processor, 1700mAh battery, Type-C. Compact, lightweight 4G phone for factory and office use.",
      "Every UPI app, every OTP, every essential tool — in a body that is welcome where cameras are not.",
    ],
    specs: [
      ["Operating System", "Android 11"],
      ["Processor", "MTK6739"],
      ["Screen", "2.8-inch 480 × 640 touchscreen"],
      ["Memory", "3GB RAM + 32GB storage"],
      ["Camera", "None (front or rear)"],
      ["Battery", "1700mAh"],
      ["Connectivity", "Wi-Fi, Hotspots, Bluetooth"],
      ["Audio", "Type-C and TWS headphone compatibility"],
      ["4G TDD-LTE", "B38, B39, B40, B41"],
      ["4G FDD-LTE", "B1, B3, B5, B7, B8, B20, B28A, B28B"],
      ["3G WCDMA", "B1, B5, B8"],
      ["2G GSM", "850, 900, 1800, 1900"],
      ["Colours", "Black, White"],
    ],
    faqs: [
      {
        q: "Does this version of the Qin F22 have a camera?",
        a: "No — this model comes with no rear or front camera, making it ideal for secure or camera-restricted environments.",
      },
      {
        q: "Is it a Google Play Store edition phone?",
        a: "Yes, it comes with the Google Play Store pre-installed by the company, allowing you to download and use any apps seamlessly. We only deal in the global version, not the Chinese variant.",
      },
      {
        q: "Will UPI apps work without the camera?",
        a: "Yes, all UPI apps work smoothly even without a camera. The only limitation is that you won't be able to use the QR code scanner feature.",
      },
      {
        q: "Will there be any Android, security, or software updates in the future?",
        a: "No, there will be no further Android upgrade nor security or software updates in the future.",
      },
      {
        q: "Is the Qin F22 Pro compatible with Indian SIM cards?",
        a: "Yes. The Qin F22 Pro supports 4G LTE bands used in India, and works with major carriers such as Jio, Airtel, Vi, and BSNL.",
      },
    ],
  },
  {
    slug: "qin-f21-pro",
    name: "Qin F21 Pro (3+32GB) — Google Play Store Edition",
    brand: "Qin",
    category: "phones",
    tagline: "Compact 2.8″ smart keypad phone with Android 11 and 4G LTE.",
    price: 15599,
    mrp: 20299,
    inStock: true,
    bestSeller: true,
    newArrival: false,
    images: [
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.19.37-PM-1.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.19.37-PM.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.19.38-PM.jpeg",
      "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-5.19.38-PM-1.jpeg",
    ],
    variants: colorVariants([BLACK, WHITE], 15599, 20299, true),
    highlights: [
      "Android 11, Google Play Store edition",
      "2.8-inch IPS display (480 × 640)",
      "5MP rear camera with document scan",
      "2120mAh battery, 7.5W fast charging",
      "Feather-light 102g with smart keypad",
    ],
    description: [
      "Qin F21 Pro Smart Keypad Phone – Compact 2.8″ Touchscreen, Android 11, 4G LTE.",
      "Slim, feather-light and reassuringly tactile. The F21 Pro keeps the rituals of a classic keypad phone while quietly handling WhatsApp, UPI and your essential apps.",
    ],
    specs: [
      ["Operating System", "Android 11"],
      ["Processor", "MTK6761 (Quad-Core)"],
      ["Screen", "2.8-inch IPS display (480 × 640 pixels)"],
      ["Memory", "3GB RAM + 32GB storage, LPDDR3 933MHz"],
      ["Camera", "Single 5MP rear camera (document scan capable)"],
      ["Battery", "2120mAh, 7.5W fast charging (approx. 2-hour full charge)"],
      ["SIM", "Single SIM + Micro SD card slot"],
      ["Connectivity", "Wi-Fi, hotspot, Bluetooth"],
      ["Audio", "Type-C port and TWS wireless earphone compatibility"],
      ["2G", "GSM B3 / B5 / B8"],
      ["3G", "WCDMA B1 / B5 / B8"],
      ["4G TDD-LTE", "B34 / B38 / B39 / B40 / B41 (100M)"],
      ["4G FDD-LTE", "B1 / B3 / B5 / B7 / B8 / B20 / B28A / B28B"],
      ["Dimensions", "132 × 53 × 9.5 mm"],
      ["Weight", "102g"],
      ["Colours", "Porcelain White / Black"],
    ],
    inBox: [
      "Qin F21 Pro Smartphone × 1",
      "USB Data Cable × 1",
      "Protective Film × 1",
      "Protective Case × 1",
      "SIM Ejector Pin × 1",
      "User Manual × 1",
    ],
    faqs: [],
  },
  {
    slug: "bluefox-nx1",
    name: "BLUEFOX Nx1 (8+128GB) — International Version",
    brand: "BLUEFOX",
    category: "phones",
    tagline: "4.0″ Android 15 compact phone — 20MP camera, 3000mAh, just 106g.",
    price: 17799,
    mrp: 23199,
    inStock: true,
    bestSeller: false,
    newArrival: true,
    images: [
      "https://dumbphones.co.in/wp-content/uploads/2025/10/18.webp",
      "https://dumbphones.co.in/wp-content/uploads/2025/10/BLUEFOX-Nx18128GB-black.webp",
      "https://dumbphones.co.in/wp-content/uploads/2025/10/BLUEFOX-Nx18128GB-Blue.webp",
      "https://dumbphones.co.in/wp-content/uploads/2025/10/21.webp",
    ],
    variants: colorVariants([BLACK, BLUE, WHITE], 17799, 23199, true),
    highlights: [
      "Android 15.0",
      "4.0-inch LCD (540 × 1168)",
      "8GB RAM + 128GB storage",
      "20MP Samsung rear camera, 5MP front",
      "3000mAh battery — only 106g",
    ],
    description: [
      "BLUEFOX NX1 4.0″ Android Smartphone, 8+128GB, 3000mAh, 20MP Camera, 4G Compact Rugged Phone.",
      "An international-version compact smartphone with an AG matte glass back, full Google Play Store access and dual Nano SIM support — everything a modern minimalist needs, nothing they don't.",
    ],
    specs: [
      ["Operating System", "Android 15.0"],
      ["Processor", "Helio G81"],
      ["Screen", "4.0-inch LCD display (540 × 1168 pixels)"],
      ["Memory", "8GB RAM + 128GB storage"],
      ["Camera", "20MP rear (Samsung 2T7, f/1.8), 5MP front"],
      ["Battery", "3000mAh (non-removable), Type-C charging"],
      ["SIM", "Dual Nano SIM (SIM 1 + Hybrid slot – SIM or TF card up to 2TB)"],
      ["Connectivity", "Wi-Fi, Hotspot, OTG, Google Play Store"],
      ["Sensors", "Gyroscope, Compass, Proximity, Ambient Light, Gravity sensor, Pedometer"],
      ["Audio", "Type-C to 3.5mm headphone adapter included"],
      ["Frame", "Electroplated plastic frame"],
      ["Back", "AG matte glass, fingerprint-resistant"],
      ["Dimensions", "100.6 × 49.3 × 12.5 mm"],
      ["Weight", "106g (with battery)"],
      ["2G GSM", "2/3/5/8"],
      ["3G WCDMA", "1/2/4/5/8"],
      ["4G FDD-LTE", "1/2/3/4/5/7/8/12/17/18/19/20/25/26/28A/28B/66"],
      ["4G TDD-LTE", "38/39/40/41"],
      ["Colours", "Black, Blue, White"],
    ],
    inBox: [
      "Mobile Phone × 1",
      "Phone Case × 1",
      "Screen Protector × 1",
      "Lanyard × 1",
      "Card Pin × 1",
      "USB Cable × 1",
      "User Manual × 1",
      "Type-C to 3.5mm Headphone Adapter × 1",
    ],
    faqs: [],
  },
  {
    slug: "cats22-flip-battery",
    name: "Cats22 Flip — New Replacement Battery",
    brand: "CAT",
    category: "accessories",
    tagline: "Genuine 2000mAh removable Li-Ion battery for the CAT S22 Flip.",
    price: 499,
    mrp: null,
    inStock: true,
    bestSeller: false,
    newArrival: false,
    images: ["https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-8.40.19-PM-1.jpeg", "https://dumbphones.co.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-8.40.19-PM.jpeg"],
    variants: [
      { name: "Buy 1", price: 499, mrp: null, inStock: true },
      { name: "Buy 3", price: 999, mrp: null, inStock: true },
    ],
    highlights: [
      "2000mAh capacity, 3.8V output",
      "Removable Li-Ion design — easy spare",
      "Made for the CAT S22 Flip",
      "CE, UL, RoHS, ISO 9001/9002 & GS certified",
    ],
    description: [
      "CAT S22 Flip Battery – Reliable power for your rugged companion.",
      "Keep your CAT S22 Flip operating at its best with this genuine 2000mAh Li-Ion removable battery. Specifically designed for the CAT S22 Flip, this battery ensures dependable power to keep your device running through demanding tasks and tough environments. It features a 2000mAh capacity with a 3.8V output, delivering long-lasting performance. The removable Li-Ion design makes it easy to replace or carry as a spare during extended use. With certifications such as CE, UL, RoHS, ISO 9001/9002, and GS, this battery meets high safety and quality standards—making a trustworthy companion for your rugged phone.",
    ],
    specs: [
      ["Capacity", "2000mAh"],
      ["Output", "3.8V"],
      ["Type", "Removable Li-Ion"],
      ["Compatibility", "CAT S22 Flip"],
      ["Certifications", "CE, UL, RoHS, ISO 9001/9002, GS"],
      ["Pack options", "Buy 1 (₹499) / Buy 3 (₹999)"],
    ],
    faqs: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) =>
    [p.name, p.brand, p.category, p.tagline, ...p.highlights, ...p.specs.flat()]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

/**
 * Genuine Google reviews displayed on the original homepage via Trustindex
 * (86 Google reviews, 4.5★ aggregate).
 */
export const REVIEWS: Review[] = [
  {
    author: "Dheeraj",
    rating: 5,
    source: "Google",
    purchasedModel: "Duoqin F25 Pro",
    text: "I recently purchased the Duoqin F25 Pro from Dumbphones, and I must say, I'm really impressed with my experience. The phone has a unique design and offers a refreshing break from typical smartphones. Using it has been genuinely enjoyable — simple, smooth, and distraction-free. The performance is surprisingly good for a device in this category, and everything works just as expected. Overall, I'm very happy with my purchase.",
  },
  {
    author: "Dubariya Vipul",
    rating: 5,
    source: "Google",
    purchasedModel: "Duoqin F25 Pro",
    text: "I personally visited the office and I purchased two Qin F25 pro and I truly love the phone.",
  },
  {
    author: "BUSHCRAFT SURVIVAL",
    rating: 5,
    source: "Google",
    purchasedModel: "Unihertz Jelly Star",
    text: "Got Unihertz Jelly Star from them. Delivery was smooth and also I got brand new product. I hope they add more phones and accessories in the future.",
  },
  {
    author: "Ramjan 315",
    rating: 5,
    source: "Google",
    purchasedModel: "BLUEFOX Nx1",
    text: "I buy Bluefox NX1 from this office. I truly like this business — they provide me the best service, I truly appreciate that. The business is genuine.",
  },
  {
    author: "Manish Gurav",
    rating: 5,
    source: "Google",
    purchasedModel: "Unihertz Jelly Star",
    text: "I have personally purchased Jelly — I visited his office and I truly love the phone. The business is 100% genuine.",
  },
  {
    author: "SND Gaming",
    rating: 5,
    source: "Google",
    purchasedModel: "Unihertz Jelly Star",
    text: "I personally visited the office and I truly like their models, so I decided to purchase Jelly Star, and they give the best service from their end.",
  },
  {
    author: "harshal parteke",
    rating: 5,
    source: "Google",
    text: "Very cordial staff and getting the phone was easy enough. Very good.",
  },
];

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/category/phones", label: "Phones" },
  { href: "/category/accessories", label: "Accessories" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];
