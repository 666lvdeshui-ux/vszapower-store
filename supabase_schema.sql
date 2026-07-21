-- ===================================================
-- VSZAPOWER - Coin Cell Charger & Battery Supabase Schema
-- Run this in your Supabase SQL Editor to initialize the database
-- ===================================================

-- 1. Create Posts table (Battery Academy Blog)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Battery Academy',
  cover_image TEXT,
  author TEXT DEFAULT 'Vszapower Tech Team',
  read_time TEXT DEFAULT '5 min read',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  price NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  is_starter_kit BOOLEAN DEFAULT false,
  image_url TEXT,
  specs JSONB,
  description TEXT,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Battery Compatibility Matcher table
CREATE TABLE IF NOT EXISTS public.battery_compatibilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  standard_model TEXT UNIQUE NOT NULL, -- e.g. CR2032
  rechargeable_model TEXT NOT NULL,     -- e.g. LIR2032
  voltage TEXT NOT NULL,                -- e.g. 3.6V-3.7V
  capacity TEXT NOT NULL,               -- e.g. 45mAh
  common_devices TEXT[] NOT NULL,       -- e.g. ["Apple AirTag", "Car Key Fob", "Motherboard RTC"]
  recommended_charger TEXT NOT NULL,    -- e.g. Vszapower Smart LIR Dock
  notes TEXT
);

-- 4. Enable Row Level Security (RLS) for public read access
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battery_compatibilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read compatibilities" ON public.battery_compatibilities FOR SELECT USING (true);

-- 5. Seed Data for Products
INSERT INTO public.products (slug, title, tagline, price, compare_at_price, is_starter_kit, image_url, badge, description, specs)
VALUES 
(
  'lir2032-starter-kit',
  'Vszapower Smart Coin Cell Charger + 4x LIR2032 Batteries Starter Kit',
  'Stop throwing away disposable button batteries. Save money & reduce e-waste.',
  24.99,
  39.99,
  true,
  'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
  'BEST SELLER / SAVE 37%',
  'Complete Starter Pack with 1x Smart Charger Dock + 4x High-Capacity LIR2032 Rechargeable Coin Cell Batteries in eco-friendly papercard gift packaging. Features dual-slot 3.6V/4.2V micro-chip control, overcharge protection, and reverse polarity defense.',
  '{"voltage": "3.6V-4.2V Auto Switch", "safety": "Overcharge / Short Circuit / Reverse Polarity Protection", "packaging": "Eco-Friendly Kraft Papercard Pack", "warranty": "2 Years"}'::jsonb
),
(
  'vszapower-dual-charger-dock',
  'Vszapower Universal LIR/ML Coin Cell Smart Charger Dock',
  'Compatible with LIR2032, LIR2025, LIR2016, LIR2450, ML2032',
  14.99,
  19.99,
  false,
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
  'SMART DOCK',
  'High precision 2-slot fast USB coin battery charger. LED dual-color indicator (Red: Charging, Green: Fully Charged).',
  '{"input": "USB-C / Micro-USB 5V 1A", "output": "4.2V 50mA x 2", "supported": "LIR2032, LIR2025, LIR2016, LIR2450, ML2032"}'::jsonb
),
(
  'lir2032-4pack',
  '4-Pack LIR2032 Rechargeable 3.7V Coin Cell Batteries',
  '500+ Recharge Cycles for Car Keys & AirTags',
  12.99,
  16.99,
  false,
  'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=800&q=80',
  'ECO PACK',
  'Premium grade LIR2032 3.7V rechargeable lithium coin cells. Replaces CR2032 in compatible devices.',
  '{"capacity": "45mAh", "voltage": "3.7V", "cycles": "500+ times"}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- 6. Seed Data for Battery Compatibilities
INSERT INTO public.battery_compatibilities (standard_model, rechargeable_model, voltage, capacity, common_devices, recommended_charger, notes)
VALUES
('CR2032', 'LIR2032', '3.7V (Replaces 3.0V)', '45mAh', ARRAY['Apple AirTag', 'Car Key Fobs (BMW, Audi, Toyota)', 'Garage Openers', 'Smart Thermometers'], 'Vszapower LIR Starter Kit', 'Note: LIR2032 operates at 3.7V vs disposable 3.0V. Ensure device tolerates 3.6V-3.7V input.'),
('CR2025', 'LIR2025', '3.7V (Replaces 3.0V)', '35mAh', ARRAY['Slim Car Keys (Mercedes, Lexus)', 'Fitness Trackers', 'Pocket Calculators'], 'Vszapower Universal Dock', 'Same diameter as 2032, thinner 2.5mm height.'),
('CR2016', 'LIR2016', '3.7V (Replaces 3.0V)', '25mAh', ARRAY['Watch Remotes', 'Digital Calipers', 'LED Badges'], 'Vszapower Universal Dock', 'Super slim 1.6mm thickness.'),
('CR2450', 'LIR2450', '3.7V (Replaces 3.0V)', '120mAh', ARRAY['Smart Door Locks', 'Zigbee Sensors', 'High-Drain IoT Nodes'], 'Vszapower Universal Dock', 'Large 24mm diameter with high energy density.'),
('ML2032', 'ML2032', '3.0V Manganese Lithium', '65mAh', ARRAY['Solar Watches', 'Motherboard CMOS Backup', 'Solar Keychains'], 'Vszapower Universal Dock (3.0V mode)', 'Direct 3.0V recharge replacement.')
ON CONFLICT (standard_model) DO NOTHING;

-- 7. Seed Data for Posts (Battery Academy Blog)
INSERT INTO public.posts (slug, title, summary, content, category, cover_image, author, read_time)
VALUES
(
  'cr2032-vs-lir2032-can-you-recharge-them',
  'CR2032 vs LIR2032: Can You Recharge Them? (The Ultimate Guide)',
  'Stop throwing away dead CR2032 batteries. Discover how switching to LIR2032 rechargeable coin cells and dedicated chargers saves money while keeping AirTags and Car Key Fobs powered.',
  '# CR2032 vs LIR2032: Can You Recharge Them?

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
Check out our **[LIR2032 Starter Kit](/products/lir2032-starter-kit)** featuring eco-friendly kraft papercard gift packaging, 4x LIR2032 rechargeable cells, and full 2-year warranty protection!',
  'Battery Academy',
  'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
  'Dr. Alex Vance, Electrochemistry Lead',
  '6 min read'
),
(
  'the-ultimate-guide-to-rechargeable-coin-cell-batteries',
  'The Ultimate Guide to Rechargeable Coin Cell Batteries (LIR vs ML Series)',
  'A complete technical breakdown of LIR2032, LIR2025, LIR2450, and ML2032 rechargeable coin cells for DIY makers, electronics repair, and smart home enthusiasts.',
  '# The Ultimate Guide to Rechargeable Coin Cell Batteries

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

Explore our full line of **[Smart Coin Cell Chargers](/products/lir2032-starter-kit)** today.',
  'Battery Academy',
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
  'Vszapower Engineering Team',
  '8 min read'
)
ON CONFLICT (slug) DO NOTHING;

-- 8. Create Banners table (Hero Carousel Banners)
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge TEXT DEFAULT 'SMART RECHARGE SYSTEM',
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  cta_text TEXT DEFAULT '联系我们 (Contact Us)',
  cta_link TEXT DEFAULT '/#contact',
  highlight TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read banners" ON public.banners FOR SELECT USING (true);

-- 9. Create Inquiries table (Customer Inquiries)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  product TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- 10. Create Videos table (Product Short Videos CMS)
CREATE TABLE IF NOT EXISTS public.videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT DEFAULT '00:30',
  video_url TEXT NOT NULL,
  poster_url TEXT,
  keywords TEXT[] DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Allow public insert videos" ON public.videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update videos" ON public.videos FOR UPDATE USING (true);
CREATE POLICY "Allow public delete videos" ON public.videos FOR DELETE USING (true);


