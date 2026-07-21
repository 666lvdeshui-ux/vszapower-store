import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes('placeholder');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock Fallback Data when Supabase is not connected yet
export const MOCK_PRODUCTS = [
  {
    id: '1',
    slug: 'lir2032-starter-kit',
    title: 'Vszapower Smart Coin Cell Charger + 4x LIR2032 Batteries Starter Kit',
    tagline: 'Stop throwing away disposable button batteries. Save money & reduce e-waste.',
    price: 24.99,
    compare_at_price: 39.99,
    is_starter_kit: true,
    category: '纽扣电池充电器',
    image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=1200&q=80',
    ],
    certifications: [
      { name: 'CE 欧盟安全认证', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
      { name: 'FCC 电磁兼容认证', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
      { name: 'RoHS 环保无毒认证', image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
      { name: 'UN38.3 锂电池运输安全认证', image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }
    ],
    badge: 'BEST SELLER / SAVE 37%',
    description: 'Complete Starter Pack with 1x Smart Charger Dock + 4x High-Capacity LIR2032 Rechargeable Coin Cell Batteries in eco-friendly papercard gift packaging. Features dual-slot 3.6V/4.2V micro-chip control, overcharge protection, and reverse polarity defense.',
    specs: {
      voltage: '3.6V-4.2V Auto Switch',
      safety: 'Overcharge / Short Circuit / Reverse Polarity Protection',
      packaging: 'Eco-Friendly Kraft Papercard Pack',
      warranty: '2 Years'
    }
  },
  {
    id: '2',
    slug: 'vszapower-dual-charger-dock',
    title: 'Vszapower Universal LIR/ML Coin Cell Smart Charger Dock',
    tagline: 'Compatible with LIR2032, LIR2025, LIR2016, LIR2450, ML2032',
    price: 14.99,
    compare_at_price: 19.99,
    is_starter_kit: false,
    category: '纽扣电池充电器',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
    ],
    certifications: [
      { name: 'CE 欧盟安全认证', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
      { name: 'RoHS 环保无毒认证', image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' }
    ],
    badge: 'SMART DOCK',
    description: 'High precision 2-slot fast USB coin battery charger. LED dual-color indicator (Red: Charging, Green: Fully Charged).',
    specs: {
      input: 'USB-C / Micro-USB 5V 1A',
      output: '4.2V 50mA x 2',
      supported: 'LIR2032, LIR2025, LIR2016, LIR2450, ML2032'
    }
  },
  {
    id: '3',
    slug: 'lir2032-4pack',
    title: '4-Pack LIR2032 Rechargeable 3.7V Coin Cell Batteries',
    tagline: '500+ Recharge Cycles for Car Keys & AirTags',
    price: 12.99,
    compare_at_price: 16.99,
    is_starter_kit: false,
    category: '可充电纽扣电池',
    image_url: 'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=1200&q=80'
    ],
    certifications: [
      { name: 'UN38.3 锂电池运输安全认证', image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }
    ],
    badge: 'ECO PACK',
    description: 'Premium grade LIR2032 3.7V rechargeable lithium coin cells. Replaces CR2032 in compatible devices.',
    specs: {
      capacity: '45mAh',
      voltage: '3.7V',
      cycles: '500+ times'
    }
  }
];

export const MOCK_POSTS = [
  {
    id: 'p1',
    slug: 'cr2032-vs-lir2032-can-you-recharge-them',
    title: 'CR2032 vs LIR2032: Can You Recharge Them? (The Ultimate Guide)',
    summary: 'Stop throwing away dead CR2032 batteries. Discover how switching to LIR2032 rechargeable coin cells and dedicated chargers saves money while keeping AirTags and Car Key Fobs powered.',
    category: 'Battery Academy',
    cover_image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Alex Vance, Electrochemistry Lead',
    read_time: '6 min read',
    created_at: new Date().toISOString(),
    content: `# CR2032 vs LIR2032: Can You Recharge Them?

Every year, millions of disposable **CR2032** button cell batteries end up in landfills. From Apple AirTags and car key fobs to motherboard RTC clocks and smart home sensors, CR2032 is the most omnipresent battery on earth.

However, when your car key fob dies or your AirTag gives a low battery warning, most users simply buy another pack of disposable batteries. **Did you know there is a rechargeable alternative?**

---

## 1. The Core Difference: Disposable vs Rechargeable

| Feature | CR2032 (Disposable) | LIR2032 (Rechargeable) |
|---|---|---|
| **Chemistry** | Lithium Manganese Dioxide (Li/MnO2) | Lithium Ion (Li-ion) |
| **Nominal Voltage** | 3.0V | 3.6V - 3.7V |
| **Rechargeable?** | **NO (Dangerous to attempt)** | **YES (500+ Cycles)** |
| **Capacity** | ~220mAh | ~45mAh |
| **Long-term Cost** | High (Continuous buying) | Very Low (Buy once, reuse 500x) |

> [!WARNING]
> Never attempt to recharge standard **CR2032** batteries in any charger! Doing so can cause thermal runaway or electrolyte leakage. Always use designated **LIR2032** rechargeable batteries with a certified smart charger dock like **Vszapower LIR Smart Dock**.

---

## 2. Voltage Compatibility: Will 3.7V LIR2032 Damage My Device?

Standard CR2032 supplies **3.0V**, while a freshly charged LIR2032 starts at **3.6V to 4.2V**. 

The vast majority of modern microelectronics—including **Apple AirTags**, **Key Fobs (Toyota, Honda, BMW)**, and **Smart Home Motion Sensors**—are built with integrated voltage regulators rated up to 4.5V. 

This means **LIR2032 works flawlessly** in 95%+ of modern consumer devices, providing sustainable power with rapid USB recharge capability!

---

## 3. Why You Need a Smart Dedicated Charger

Coin cell batteries require precise trickle charge currents (typically 20mA - 50mA). Charging them with standard AA/AAA fast chargers or uncontrolled power supplies will degrade battery lifespan.

The **Vszapower Smart Coin Cell Charger Dock** features:
- **Integrated Microchip Protection**: Auto-cuts power at 4.2V to prevent overcharging.
- **Reverse Polarity Protection**: Prevents damage if inserted backwards.
- **Dual Slot Design**: Charge 2 batteries simultaneously in 45 minutes.

---

## 4. Economic & Environmental Impact

If you replace 5 coin cell batteries per year across key fobs, AirTags, and home sensors:
- **5-Year Disposable Cost**: ~$45 - $60
- **Vszapower Starter Kit**: **$24.99** (Includes 1 Smart Charger + 4 LIR2032 batteries)

You break even in less than 18 months, while eliminating dozens of heavy metal waste batteries from the ecosystem.

---

### Ready to Upgrade to Rechargeable Coin Cells?
Check out our **[LIR2032 Starter Kit](/products/lir2032-starter-kit)** featuring eco-friendly kraft papercard gift packaging, 4x LIR2032 rechargeable cells, and full 2-year warranty protection!`
  },
  {
    id: 'p2',
    slug: 'the-ultimate-guide-to-rechargeable-coin-cell-batteries',
    title: 'The Ultimate Guide to Rechargeable Coin Cell Batteries (LIR vs ML Series)',
    summary: 'A complete technical breakdown of LIR2032, LIR2025, LIR2450, and ML2032 rechargeable coin cells for DIY makers, electronics repair, and smart home enthusiasts.',
    category: 'Battery Academy',
    cover_image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    author: 'Vszapower Engineering Team',
    read_time: '8 min read',
    created_at: new Date().toISOString(),
    content: `# The Ultimate Guide to Rechargeable Coin Cell Batteries

Navigating the world of rechargeable coin cell batteries can feel confusing. With designations like **LIR2032**, **LIR2450**, and **ML2032**, selecting the exact match for your device and ensuring safe charging is paramount.

---

## Decoding Coin Cell Model Numbers

Understanding the 4-digit code is simple once you know the pattern:
- **First 2 Digits**: Diameter in millimeters (e.g., **20** = 20mm).
- **Last 2 Digits**: Height/Thickness in tenths of a millimeter (e.g., **32** = 3.2mm).

| Model | Rechargeable Code | Voltage | Best Suited Applications |
|---|---|---|---|
| 20mm x 3.2mm | **LIR2032** | 3.7V | AirTags, Car Fobs, Gamepads, LED Badges |
| 20mm x 2.5mm | **LIR2025** | 3.7V | Ultra-slim Car Remotes, Calculators |
| 24mm x 5.0mm | **LIR2450** | 3.7V | Smart Door Locks, High Drain Zigbee Nodes |
| 20mm x 3.2mm | **ML2032** | 3.0V | Solar Watches, Motherboard CMOS Backup |

---

## Safety Standards & Papercard Packaging Aesthetics

When buying electronic components online, packaging and safety standards are your strongest quality indicators.

At **Vszapower**, all charger kits are shipped in **Precision Eco-Kraft Papercard Packaging**. Beyond aesthetics, our papercard packs ensure:
1. Zero static discharge during transit.
2. Complete parameter visibility (clearly marked 3.6V-4.2V micro-chip specs).
3. Minimal plastic footprint.

---

## Step-by-Step: How to Recharge Your Coin Cell

1. Insert your LIR2032/LIR2450 battery into the **Vszapower Smart Dock**.
2. Connect to any 5V USB port (Laptop, Powerbank, or Wall Adapter).
3. The LED indicator turns **Solid RED** while charging.
4. When fully charged (~45 mins), the LED turns **Solid GREEN** and safety auto-shutoff engages.

Explore our full line of **[Smart Coin Cell Chargers](/products/lir2032-starter-kit)** today.`
  }
];

export const MOCK_COMPATIBILITY = [
  {
    standard_model: 'CR2032',
    rechargeable_model: 'LIR2032',
    voltage: '3.7V (Replaces 3.0V)',
    capacity: '45mAh',
    common_devices: ['Apple AirTag', 'Car Key Fobs (BMW, Audi, Toyota)', 'Garage Openers', 'Smart Thermometers'],
    recommended_charger: 'Vszapower LIR Starter Kit',
    notes: 'Note: LIR2032 operates at 3.7V vs disposable 3.0V. Works in 95%+ modern devices.'
  },
  {
    standard_model: 'CR2025',
    rechargeable_model: 'LIR2025',
    voltage: '3.7V (Replaces 3.0V)',
    capacity: '35mAh',
    common_devices: ['Slim Car Keys (Mercedes, Lexus)', 'Fitness Trackers', 'Pocket Calculators'],
    recommended_charger: 'Vszapower Universal Dock',
    notes: 'Same 20mm diameter as 2032, thinner 2.5mm profile.'
  },
  {
    standard_model: 'CR2016',
    rechargeable_model: 'LIR2016',
    voltage: '3.7V (Replaces 3.0V)',
    capacity: '25mAh',
    common_devices: ['Watch Remotes', 'Digital Calipers', 'LED Badges'],
    recommended_charger: 'Vszapower Universal Dock',
    notes: 'Ultra-thin 1.6mm rechargeable profile.'
  },
  {
    standard_model: 'CR2450',
    rechargeable_model: 'LIR2450',
    voltage: '3.7V (Replaces 3.0V)',
    capacity: '120mAh',
    common_devices: ['Smart Door Locks', 'Zigbee Sensors', 'High-Drain IoT Nodes'],
    recommended_charger: 'Vszapower Universal Dock',
    notes: '24mm diameter high capacity rechargeable cell.'
  },
  {
    standard_model: 'ML2032',
    rechargeable_model: 'ML2032',
    voltage: '3.0V Manganese',
    capacity: '65mAh',
    common_devices: ['Solar Watches', 'Motherboard CMOS Backup', 'Solar Keychains'],
    recommended_charger: 'Vszapower Universal Dock',
    notes: 'Direct 3.0V voltage match for solar/CMOS applications.'
  }
];

// Helper Functions
export async function getProducts() {
  if (supabase) {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  return MOCK_PRODUCTS;
}

export async function getPosts() {
  if (supabase) {
    const { data, error } = await supabase.from('posts').select('*').eq('published', true).order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  return MOCK_POSTS;
}

export async function getPostBySlug(slug: string) {
  if (supabase) {
    const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  return MOCK_POSTS.find(p => p.slug === slug) || null;
}

export async function getCompatibilities() {
  if (supabase) {
    const { data, error } = await supabase.from('battery_compatibilities').select('*');
    if (!error && data && data.length > 0) return data;
  }
  return MOCK_COMPATIBILITY;
}
