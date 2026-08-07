import { NextResponse } from 'next/server';
import { fetchAllPosts, savePost } from '@/lib/store';
import { REAL_PRODUCT_COVER_IMAGES, getRandomProductCoverImage } from '@/lib/supabase';

// Topic Pool for daily automated news generation focusing on Coin Cell Chargers & target battery models (100% Pure English)
const DAILY_NEWS_POOL = [
  {
    topic: 'lir2032-lir2450-lir2025-lir2016-smart-charger-guide',
    title: 'LIR2032 / LIR2025 / LIR2016 / LIR2450 Smart Coin Cell Charger Selection & Micro-Current Protection Guide',
    summary: 'In-depth analysis of dedicated smart charger docks designed for LIR2032, LIR2025, LIR2016, and LIR2450 rechargeable button batteries. Explores 20mA-50mA trickle current control, Auto-Cut 4.2V micro-chip safety, and multi-slot compatibility.',
    category: 'Charging & Safety',
    tags: ['Coin Cell Charger', 'LIR2032 Charger', 'LIR2450', 'LIR2025', 'LIR2016', 'Micro-Current Defense'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[0],
    author: 'VSZAPOWER Engineering R&D Team',
    read_time: '6 min read',
    content: `# LIR2032 / LIR2025 / LIR2016 / LIR2450 Smart Coin Cell Charger Selection & Micro-Current Protection Guide

In today's high-tech consumer electronics landscape, rechargeable coin cell batteries (LIR series) power everything from **Apple AirTags** and **automotive smart key fobs** to **motherboard CMOS RTC backup modules** and **smart biometric door locks**.

However, traditional CR series button batteries (such as CR2032, CR2450, CR2025) are **disposable primary manganese batteries** that cannot be recharged, leading to heavy e-waste pollution and recurring procurement costs.

Upgrading to **LIR series rechargeable lithium-ion coin cell batteries** (3.6V - 3.7V) paired with a **VSZAPOWER Intelligent Coin Cell Charger Dock** offers the ultimate eco-friendly and cost-effective power solution!

---

## 1. Key Rechargeable Coin Cell Specification Chart

| Battery Model | Diameter / Thickness | Nominal Voltage | Max Charge Voltage | Typical Applications | Recommended Charger Bay |
|---|---|---|---|---|---|
| **LIR2032** | 20mm x 3.2mm | 3.6V - 3.7V | 4.20V | Apple AirTags, Car Key Fobs, LED Badges | Dual / Quad Smart Dock |
| **LIR2025** | 20mm x 2.5mm | 3.6V - 3.7V | 4.20V | Ultra-thin Key Fobs, Scales, Remotes | Universal Dual Slot Dock |
| **LIR2016** | 20mm x 1.6mm | 3.6V - 1.6mm | 4.20V | Ultra-thin Watches, Card Beepers | Micro Spring Clip Dock |
| **LIR2450** | 24mm x 5.0mm | 3.6V - 3.7V | 4.20V | Smart Door Locks, Glucometers, IoT | High Drain 120mAh Channel |

---

## 2. Why Conventional Chargers Cannot Be Used for Coin Cells

Coin cell batteries have relatively low capacity (LIR2032 ~45mAh, LIR2450 ~120mAh). Using high-current lithium-ion chargers designed for 18650 or AA batteries can cause severe overheating, internal pressure buildup, or electrolyte leakage.

**VSZAPOWER Smart Charger Core Engineering Highlights:**
- **Micro-Current Precision Control**: Locks constant current phase to a safe 20mA - 50mA trickle window.
- **Auto-Cut 4.2V Micro-Chip Protection**: Built-in IC comparator cuts off power instantly when voltage reaches 4.20V ± 0.05V.
- **Reverse Polarity Defense**: Prevents short-circuit sparks even if batteries are inserted upside down.

---

## 3. B2B Wholesale & Procurement Recommendation

Before placing bulk orders, confirm your device PMIC accepts 3.6V - 3.7V rechargeable input (95%+ modern consumer electronics natively support this). Pair with **[VSZAPOWER LIR Starter Kits](/products/lir2032-starter-kit)** for 500+ full discharge/charge cycles per cell!`
  },
  {
    topic: 'lir1632-lir1220-micro-coin-cell-charger-tech',
    title: 'LIR1632 & LIR1220 Micro Rechargeable Button Battery Charger Docks & Precision Equipment Power Solutions',
    summary: 'Engineered for smart watches, micro Bluetooth remotes, and precision calipers using LIR1632 (16mm) and LIR1220 (12mm) rechargeable cells. Explores micro-current circuit defense and OEM procurement guidelines.',
    category: 'Selection & Specs',
    tags: ['LIR1632', 'LIR1220', 'Micro Coin Cell Charger', 'Precision Equipment Power', 'Rechargeable Dock'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[1],
    author: 'VSZAPOWER Micro-Power Department',
    read_time: '5 min read',
    content: `# LIR1632 & LIR1220 Micro Rechargeable Button Battery Charger Docks & Precision Equipment Power Solutions

In miniature electronic products and high-precision instruments, **LIR1632** (16mm diameter, 3.2mm thickness) and **LIR1220** (12mm diameter, 2.0mm thickness) serve as essential micro rechargeable power sources.

Because of their small physical footprint and typical capacity between 10mAh and 20mAh, these miniature button cells require extreme precision control from the charger dock.

---

## 1. Specification Overview & Comparison

- **LIR1632**: 3.7V / 20mAh capacity. Widely used in automotive key fobs, heart rate chest straps, and digital vernier calipers.
- **LIR1220**: 3.7V / 12mAh capacity. Frequently deployed in RTC clock backup, micro laser pointers, and compact camera sub-boards.

---

## 2. Micro-Current Safety Engineering

VSZAPOWER has developed a stepped trickle charging algorithm specifically tailored for **LIR1632 / LIR1220** micro lithium button cells:
1. **10mA Initial Pre-Charge**: Protects miniature battery chemistry from high current thermal shock.
2. **Dual-Color Status LED Indicators**: Red for charging, solid green for 100% full cut-off.
3. **USB 5V Flexible Power**: Operates seamlessly from laptop USB ports, power banks, or automotive 5V adapters.`
  },
  {
    topic: 'ml2032-vs-lir2032-3v-charger-compatibility',
    title: 'ML2032 (3.0V) vs LIR2032 (3.7V) Button Battery Chargers: CMOS Motherboard & Solar Watch Charging Guide',
    summary: 'Detailed comparison of 3.0V Manganese Rechargeable ML2032 and 3.7V Lithium-ion Rechargeable LIR2032. Breakdown of voltage cutoff profiles, solar watch backup power, and intelligent multi-chemistry charging safety.',
    category: 'Charging & Safety',
    tags: ['ML2032', 'LIR2032', '3.0V Button Battery Charging', 'CMOS Battery', 'Smart Charger'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[2],
    author: 'VSZAPOWER Electrochemistry Lab',
    read_time: '7 min read',
    content: `# ML2032 (3.0V) vs LIR2032 (3.7V) Button Battery Chargers: CMOS Motherboard & Solar Watch Charging Guide

In the rechargeable coin cell ecosystem, **ML2032** (Manganese Lithium rechargeable, 3.0V) and **LIR2032** (Lithium-ion rechargeable, 3.7V) share nearly identical physical dimensions, but their electrochemical voltage platforms and charging requirements differ significantly.

---

## 1. Core Differences Between ML2032 and LIR2032

| Specification | ML2032 (Manganese Rechargeable) | LIR2032 (Li-ion Rechargeable) |
|---|---|---|
| **Nominal Voltage** | 3.0V | 3.6V - 3.7V |
| **Max Charge Voltage Cutoff** | **3.30V ± 0.05V** | **4.20V ± 0.05V** |
| **Typical Capacity** | ~65mAh | ~45mAh - 50mAh |
| **Primary Applications** | Solar Watches (Casio), Motherboard CMOS, PLC Backup | Apple AirTags, Car Key Fobs, Remotes |

---

## 2. Charger Compatibility Guidelines

- **LIR2032** requires a 4.2V max cutoff profile;
- **ML2032** must NEVER exceed 3.3V charging cutoff! Using a 4.2V charger on ML2032 will degrade cell chemistry.

**VSZAPOWER Intelligent Charger Docks** incorporate multi-chemistry voltage regulation chips, ensuring complete safety across all battery models.`
  },
  {
    topic: 'airtag-keyfob-lir2032-lir2450-charger-solution',
    title: 'AirTag / Car Key Fob / Smart Lock Battery Replacement Cost & B2B Wholesale Charger Analysis',
    summary: 'Calculate your long-term savings! Upgrading disposable CR2032/CR2450/CR2025 to rechargeable LIR2032/LIR2450 with VSZAPOWER dedicated smart chargers saves hundreds of dollars and eliminates e-waste.',
    category: 'Selection & Specs',
    tags: ['Coin Cell Charger', 'LIR2032', 'LIR2450', 'AirTag Charger', 'Car Key Fob Power', 'B2B Wholesale'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[0],
    author: 'VSZAPOWER Consumer Electronics Team',
    read_time: '5 min read',
    content: `# AirTag / Car Key Fob / Smart Lock Battery Replacement Cost & B2B Wholesale Charger Analysis

Everyday consumer electronics rely heavily on button batteries:
- **Apple AirTags**: Uses CR2032 (upgradeable to **LIR2032**)
- **Car Key Fobs**: Uses CR2032 / CR2025 / CR1632 (upgradeable to **LIR2032 / LIR2025 / LIR1632**)
- **Smart Fingerprint Locks**: Uses high-capacity CR2450 (upgradeable to **LIR2450**)
- **Digital Scales & Calipers**: Uses CR1220 (upgradeable to **LIR1220**)

---

## 1. Disposable CR Series vs Reusable LIR + VSZAPOWER Charger Dock Cost Comparison

| Expense Factor | Disposable CR Series | Reusable LIR + VSZAPOWER Dock |
|---|---|---|
| **5-Year Cell Consumption** | 20 - 30 disposable cells | **4x LIR cells + 1x Smart Charger Dock** |
| **5-Year Total Expense** | ~$35 - $60 USD | **Single low-cost starter kit investment** |
| **Heavy Metal E-Waste** | 20-30 battery casings dumped | **Zero waste, 500+ recharge cycles** |

---

## 2. Advantages of Partnering with VSZAPOWER Direct Factory

Equipping your business or retail inventory with **VSZAPOWER Coin Cell Charger Docks** ensures reliable supplier lead times and full global certifications:
- Full model coverage: **LIR2032, LIR2025, LIR2016, LIR2450, LIR1632, LIR1220, ML2032**.
- Micro-USB / USB-C 5V input, compliant with **CE, FCC, RoHS, UN38.3, and MSDS** standards.`
  }
];

export async function POST(request: Request) {
  try {
    if (process.env.ENABLE_AUTO_PUBLISH !== 'true') {
      return NextResponse.json({
        success: false,
        message: 'Daily auto-publishing plan is currently PAUSED.',
        paused: true
      });
    }

    const existingPosts = await fetchAllPosts();
    const existingSlugs = new Set(existingPosts.map(p => p.slug));

    const candidates = DAILY_NEWS_POOL.filter(item => !existingSlugs.has(item.topic));
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const articlesToPublish = [];
    
    if (candidates.length >= 2) {
      articlesToPublish.push(candidates[0], candidates[1]);
    } else {
      const randIdx1 = Math.floor(Math.random() * DAILY_NEWS_POOL.length);
      const randIdx2 = (randIdx1 + 1) % DAILY_NEWS_POOL.length;
      const baseItem1 = DAILY_NEWS_POOL[randIdx1];
      const baseItem2 = DAILY_NEWS_POOL[randIdx2];
      
      articlesToPublish.push({
        ...baseItem1,
        slug: `${baseItem1.topic}-${Date.now()}-1`,
        title: `[Daily Coin Cell Tech] ${baseItem1.title} (${dateStr} Edition)`,
        cover_image: getRandomProductCoverImage(randIdx1 + Date.now()),
        created_at: now.toISOString(),
      });
      articlesToPublish.push({
        ...baseItem2,
        slug: `${baseItem2.topic}-${Date.now()}-2`,
        title: `[Battery Academy Special] ${baseItem2.title} (${dateStr} Issue)`,
        cover_image: getRandomProductCoverImage(randIdx2 + Date.now() + 1),
        created_at: new Date(now.getTime() - 3600000).toISOString(),
      });
    }

    const publishedResults = [];
    for (const item of articlesToPublish as Array<Record<string, any>>) {
      const saved = await savePost({
        slug: item.slug || item.topic,
        title: item.title,
        summary: item.summary,
        category: item.category,
        tags: item.tags,
        cover_image: item.cover_image || getRandomProductCoverImage(Date.now()),
        author: item.author,
        read_time: item.read_time,
        content: item.content,
        published: true,
        created_at: item.created_at || new Date().toISOString(),
      });
      publishedResults.push(saved);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully generated and published 2 daily coin cell battery technical articles in English for ${dateStr}!`,
      published_count: publishedResults.length,
      articles: publishedResults,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return POST(request);
}
