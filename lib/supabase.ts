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
import { SVG_IMAGES } from './productImages';

export const REAL_PRODUCT_COVER_IMAGES = [
  'https://img.kwcdn.com/product/211a2a4076c/deabea03-9782-4bf1-9457-bc6244740035_1024x1024.jpeg',
  'https://img.kwcdn.com/product/fancy/0cfe312f-e3dd-484e-9e38-f0c3b5016346.jpg',
  'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80',
];

export function getRandomProductCoverImage(index?: number): string {
  if (typeof index === 'number') {
    return REAL_PRODUCT_COVER_IMAGES[Math.abs(index) % REAL_PRODUCT_COVER_IMAGES.length];
  }
  return REAL_PRODUCT_COVER_IMAGES[Math.floor(Math.random() * REAL_PRODUCT_COVER_IMAGES.length)];
}

export const MOCK_PRODUCTS = [
  {
    id: '1',
    slug: 'lir2032-starter-kit',
    title: 'Vszapower Smart Dual-Slot Coin Cell Charger + 4x LIR2032 Batteries Starter Kit',
    tagline: 'Stop throwing away disposable button batteries. Save money & reduce e-waste.',
    price: 24.99,
    compare_at_price: 39.99,
    is_starter_kit: true,
    category: '纽扣电池充电器',
    image_url: SVG_IMAGES.dual_charger_starter_kit,
    images: [
      SVG_IMAGES.dual_charger_starter_kit,
      SVG_IMAGES.lir2032_4pack_batteries,
      'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
    ],
    certifications: [
      { name: 'GCC 认证', image_url: '' },
      { name: 'Battery 电池检测认证', image_url: '' },
      { name: 'CE 欧盟安全认证', image_url: '' },
      { name: 'FCC 电磁兼容认证', image_url: '' },
      { name: 'RoHS 环保无毒认证', image_url: '' },
      { name: 'UN38.3 锂电池安全认证', image_url: '' }
    ],
    badge: 'BEST SELLER / SAVE 37%',
    description: 'Complete Starter Pack with 1x Smart Dual-Slot Charger Dock + 4x High-Capacity LIR2032 Rechargeable Coin Cell Batteries in eco-friendly papercard gift packaging. Features dual-slot 3.6V/4.2V micro-chip control, overcharge protection, red/green LED charge status, and reverse polarity defense.',
    specs: {
      voltage: '3.6V-4.2V Auto Switch',
      supported: 'LIR2032, LIR2025, LIR2016, ML2032',
      safety: 'Overcharge / Short Circuit / Reverse Polarity Protection',
      packaging: 'Eco-Friendly Kraft Papercard Pack',
      warranty: '2 Years'
    },
    rating: 4.93,
    review_count: 1480,
    temu_link: 'https://www.temu.com/goods.html?_bg_fs=1&goods_id=606258002264728',
    reviews: [
      {
        id: 'rev_1',
        reviewer_name: 'Mark T.',
        country_code: 'US',
        rating: 5,
        title: 'Essential charger for AirTags & car keys!',
        content: 'Works amazingly well for my Apple AirTags and car key fobs! Charges LIR2032 in about 35 minutes. Clip design holds batteries firmly in place. LED turns from red to solid green when full.',
        verified_source: 'Verified Purchase',
        date: '2026-07-28',
        helpful_count: 34
      },
      {
        id: 'rev_2',
        reviewer_name: 'Hans Weber',
        country_code: 'DE',
        rating: 5,
        title: 'Sehr gutes Knopfbatterie-Ladegerät!',
        content: 'Absolut fantastisches Ladegerät für LIR2032 und LIR2450. Sehr schnelle Lieferung über den Shop, hochwertige Verarbeitung und der automatische Überladeschutz funktioniert perfekt.',
        verified_source: 'Verified Purchase',
        date: '2026-07-25',
        helpful_count: 28
      },
      {
        id: 'rev_3',
        reviewer_name: 'Kenji Sato',
        country_code: 'JP',
        rating: 5,
        title: 'CR2032の使い捨てを即座にストップ！',
        content: '使い捨てボタン電池を毎回買わなくて済むようになり、大幅なコスト削減になりました。35分で満充電になり、LEDが緑に変わります。配送も非常に早かったです！',
        verified_source: 'Verified Purchase',
        date: '2026-07-22',
        helpful_count: 22
      },
      {
        id: 'rev_4',
        reviewer_name: 'Sarah Jenkins',
        country_code: 'GB',
        rating: 5,
        title: 'Great value & micro-current protection',
        content: 'Fantastic little clip charger dock. Micro-current protection gives peace of mind. Great value for $7 online. Highly recommend!',
        verified_source: 'Verified Purchase',
        date: '2026-07-19',
        helpful_count: 19
      },
      {
        id: 'rev_5',
        reviewer_name: 'Pierre Laurent',
        country_code: 'FR',
        rating: 5,
        title: 'Super chargeur intelligent pour piles bouton',
        content: 'Très pratique et économique. Plus besoin d\'acheter des piles jetables pour les télécommandes. La charge est rapide et sécurisée.',
        verified_source: 'Verified Purchase',
        date: '2026-07-15',
        helpful_count: 15
      },
      {
        id: 'rev_6',
        reviewer_name: 'Alex Miller',
        country_code: 'CA',
        rating: 5,
        title: 'Solid build quality & LED status light',
        content: 'Solid build quality and clear LED status light. Perfect for AirTag battery replacements.',
        verified_source: 'Verified Purchase',
        date: '2026-07-10',
        helpful_count: 12
      },
      {
        id: 'rev_7',
        reviewer_name: 'Carlos Gomez',
        country_code: 'MX',
        rating: 5,
        title: 'Excelente cargador para LIR2032',
        content: 'Excelente cargador para pilas LIR2032. Funciona al 100% y llegó rapidísimo por la tienda.',
        verified_source: 'Verified Purchase',
        date: '2026-07-05',
        helpful_count: 9
      }
    ]
  },
  {
    id: '2',
    slug: 'vszapower-quad-pro-charger',
    title: 'VSZAPOWER Smart 4-Slot Type-C Coin Cell Battery Charger Pro Dock',
    tagline: 'Quad-Slot Independent Fast Charging with LED Status Indicators',
    price: 18.99,
    compare_at_price: 28.99,
    is_starter_kit: false,
    category: '纽扣电池充电器',
    image_url: SVG_IMAGES.quad_pro_charger,
    images: [
      SVG_IMAGES.quad_pro_charger,
      SVG_IMAGES.dual_charger_starter_kit,
    ],
    certifications: [
      { name: 'CE 欧盟安全认证', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
      { name: 'FCC 电磁兼容认证', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
      { name: 'RoHS 环保无毒认证', image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' }
    ],
    badge: '4-SLOT PRO / FAST CHARGE',
    description: 'Professional 4-bay intelligent coin cell charger dock with independent MCU micro-chip charging channels. Powered by USB-C input. Supports charging 1 to 4 rechargeable lithium button cells (LIR2032, LIR2025, LIR2016, LIR2450) simultaneously with precision CC/CV charging curve.',
    specs: {
      input: 'USB Type-C 5V 2A',
      output: '4.2V 50mA x 4 Independent Channels',
      supported: 'LIR2032, LIR2025, LIR2016, LIR2450, LIR2430, ML2032',
      display: 'Red (Charging), Green (Fully Charged)',
      protection: 'MCU Cutoff, Short Circuit & Overcurrent Protection'
    }
  },
  {
    id: '3',
    slug: 'lir2450-heavy-duty-kit',
    title: 'VSZAPOWER LIR2450 High-Capacity Rechargeable Coin Cell Charger Kit',
    tagline: '120mAh High Drain Energy for Smart Door Locks & Glucose Meters',
    price: 19.99,
    compare_at_price: 29.99,
    is_starter_kit: false,
    category: '纽扣电池充电器',
    image_url: SVG_IMAGES.lir2450_heavy_duty,
    images: [
      SVG_IMAGES.lir2450_heavy_duty,
      SVG_IMAGES.quad_pro_charger,
    ],
    certifications: [
      { name: 'CE 欧盟安全认证', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
      { name: 'UN38.3 锂电池运输安全认证', image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }
    ],
    badge: 'HIGH CAPACITY 120mAh',
    description: 'High power coin cell charging solution engineered for heavy-drain devices such as electronic smart door locks, solar tire pressure sensors, glucometers, and IoT beacons. Includes 1x dedicated LIR2450 Smart Charger Dock and 2x 120mAh 3.7V LIR2450 rechargeable coin cells.',
    specs: {
      battery_model: 'LIR2450 (3.7V / 120mAh)',
      recharge_cycles: '500+ Full Discharge/Charge Cycles',
      charger_input: 'Micro-USB / USB-C 5V 1A',
      applications: 'Smart Locks, Tire Pressure Sensors, IoT Beacons'
    }
  },
  {
    id: 'prod_clip_charger',
    slug: 'vszapower-clip-charger-7usd',
    title: 'VSZAPOWER 夹式纽扣电池充电器，支持LIR2016, LIR1220, LIR1632, LIR2032, LIR2025, ML2032, LIR2450，快速30分钟充满，携带方便，低电压充电器，自有工厂',
    tagline: '纽扣电池充电器/夹式充电器/30分钟充满/携带方便/源头工厂直发',
    price: 7.00,
    compare_at_price: 11.00,
    is_starter_kit: true,
    category: '纽扣电池充电器',
    image_url: 'https://img.kwcdn.com/product/211a2a4076c/deabea03-9782-4bf1-9457-bc6244740035_1024x1024.jpeg',
    images: [
      'https://img.kwcdn.com/product/211a2a4076c/deabea03-9782-4bf1-9457-bc6244740035_1024x1024.jpeg',
      SVG_IMAGES.dual_charger_starter_kit,
    ],
    certifications: [
      { name: 'Battery 电池检测认证', image_url: '' },
      { name: 'CE 欧盟安全认证', image_url: '' },
      { name: 'FCC 电磁兼容认证', image_url: '' },
      { name: 'RoHS 环保无毒认证', image_url: '' },
      { name: 'UN38.3 锂电池安全认证', image_url: '' },
    ],
    badge: 'TEMU HOT SALE / $7 FACTORY DIRECT',
    description: 'VSZAPOWER 自有工厂直发 7 美元精巧双充夹式纽扣电池充电器，广泛兼容 LIR2032, LIR2025, LIR2016, LIR2450, LIR1632, LIR1220, ML2032 等全系列可充电扣式锂电池。内置 3.6V/4.2V MCU 微电流安全防护与 30 分钟极速快充芯片，过夜充电防过充发烫。',
    specs: {
      voltage: '3.6V - 4.2V Auto Switch',
      supported: 'LIR2032, LIR2025, LIR2016, LIR2450, LIR1632, LIR1220, ML2032',
      safety: 'MCU 4.2V Cutoff / Short Circuit / Reverse Polarity Protection',
      packaging: 'Eco Kraft Papercard Pack',
      warranty: '2 Years Factory Direct'
    },
    rating: 4.93,
    review_count: 1480,
    temu_link: 'https://www.temu.com/goods.html?_bg_fs=1&goods_id=606258002264728',
  },
  {
    id: '6',
    slug: 'lir2025-30min-fast-charger',
    title: 'VSZAPOWER 30-Min Ultra Fast LIR2025 / LIR2032 Coin Cell Charger',
    tagline: 'Full Charge in 30 Mins | Eco Replacement for CR2025 & CR2032 Car Keys & Remotes',
    price: 15.99,
    compare_at_price: 22.99,
    is_starter_kit: false,
    category: '纽扣电池充电器',
    image_url: '/products/lir2025-30min-charger.jpg',
    images: [
      '/products/lir2025-30min-charger.jpg',
      'https://img.kwcdn.com/product/fancy/0cfe312f-e3dd-484e-9e38-f0c3b5016346.jpg',
      SVG_IMAGES.lir2025_30min_fast_charger,
    ],
    certifications: [
      { name: 'CE 欧盟安全认证', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
      { name: 'FCC 电磁兼容认证', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
      { name: 'RoHS 环保无毒认证', image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
      { name: '30-Min Fast Charge Microchip Certificate', image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }
    ],
    badge: '30-MIN ULTRA FAST / NEW',
    description: 'High-performance 30-minute ultra-fast coin cell battery charger specially designed for LIR2025 and LIR2032 rechargeable button cells. Perfect eco-friendly replacement for disposable CR2025 / CR2032 batteries used in car key fobs (Autoschlüssel), TV remotes (Fernbedienungen), digital scales (Waagen), glow sticks, and electronic floats. Features intelligent MCU constant current/voltage control, 4.2V auto cutoff, and red/green LED charging status.',
    specs: {
      charging_speed: '30 Minutes 100% Full Charge',
      supported_batteries: 'LIR2025, LIR2032, LIR2016, ML2025',
      replaces_disposable: 'CR2025, CR2032, CR2016',
      applications: 'Car Key Fobs, Remotes, Digital Scales, Glow Sticks, Memo Pads',
      input: 'Micro-USB / USB-C 5V 1.5A Fast Charge',
      output: '4.2V 80mA CC/CV Fast Charger',
      safety: 'Auto Cutoff 4.2V, Reverse Polarity Protection'
    }
  }
];

export const MOCK_POSTS = [
  {
    id: 'p1',
    slug: 'cr2032-vs-lir2032-can-you-recharge-them',
    title: 'CR2032 vs LIR2032 终极对比：一次性与可充电纽扣电池全面深度解析',
    summary: '别再频繁扔掉用完的 CR2032 电池！深入剖析 3.0V 一次性锂锰电池与 3.7V LIR2032 可充电锂离子电池的区别、设备兼容性上限、安全充电要点及 5 年使用成本对比。',
    category: '选型与对比',
    tags: ['CR2032', 'LIR2032', '选型指南', '电压安全'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[0],
    author: 'Dr. Alex Vance, 电池电化学首席工程师',
    read_time: '6 分钟阅读',
    published: true,
    created_at: new Date().toISOString(),
    content: `# CR2032 vs LIR2032 终极对比：一次性与可充电纽扣电池全面深度解析

每年有数以亿计的一次性 **CR2032** 纽扣电池被丢弃进入垃圾填埋场。从 Apple AirTag 防丢器、汽车智能钥匙遥控器，到主板 RTC 实时时钟和智能家居传感器，CR2032 是当今应用最广泛的微型电源。

然而，当车钥匙或 AirTag 弹出低电量警告时，绝大多数用户习惯于重新购买一盒一次性电池。**你是否知道，存在完美兼容且可持续循环充电 500+ 次的替代方案？**

---

## 1. 核心差异：一次性 vs 可充电

| 参数指标 | CR2032 (一次性电池) | LIR2032 (可充电锂电池) |
|---|---|---|
| **化学体系** | 锂-二氧化锰 (Li/MnO2) | 锂离子 (Li-ion 扣式) |
| **标称电压** | 3.0V (初始峰值约 3.2V) | 3.6V - 3.7V (满电约 4.2V) |
| **是否可充电** | **严禁充电 (可能导致泄漏与过热)** | **支持循环充电 500+ 次** |
| **典型容量** | ~220mAh | ~45mAh - 50mAh |
| **长期成本** | 高 (需反复购买新电池) | 极低 (一次购买，循环重复利用) |
| **环保指数** | 产生大量重金属电子垃圾 | 显著降低一次性废电池排放 |

> [!WARNING]
> 切勿将普通一次性 **CR2032** 放入任何充电器中！这会导致电池内部压力剧增、电解液泄漏甚至热失控风险。请务必使用专门设计的 **LIR2032** 可充电纽扣电池及配套智能充电座（如 **Vszapower LIR 智能充电座**）。

---

## 2. 电压兼容性：3.7V 的 LIR2032 会损坏我的设备吗？

标准 CR2032 输出电压为 **3.0V**，而满电状态下的 LIR2032 电压为 **3.6V 至 4.2V**。

绝大多数现代微电子设备——包括 **Apple AirTag**、**主流汽车遥控钥匙（宝马、丰田、奥迪、本田等）**、**智能门磁与温湿度传感器**——在设计阶段均内置了输入过压保护与 LDO 稳压芯片，输入耐压上限通常达 **4.5V ~ 5.5V**。

这意味着 **LIR2032 可以在 95% 以上的现代消费电子设备中无缝工作**，在享受快速 USB 充电的同时，彻底告别频繁购买一次性电池的烦恼！

---

## 3. 为何必须搭配专用的微型智能充电座？

扣式电池的体积微小，充电时需要极为精准的微电流控制（通常为 20mA - 50mA 涓流与恒流）。若使用普通 AA/AAA 电池充电器或无控制电路的简易接口，极易损坏电池寿命。

**Vszapower 智能扣式电池充电座** 具备以下核心安全技术：
- **微芯片全程控温防过充**：达到 4.2V 饱充电压时自动断电。
- **正负极反接保护**：即便放反电池也不会短路损坏。
- **双槽独立通道设计**：45 分钟内充满两节电池，LED 双色指示清晰明了。

---

## 4. 经济性与环保效益算账

假设你的家庭每年在车钥匙、AirTag 和智能传感器上消耗 6 节扣式电池：
- **5 年一次性电池开销**：约 ¥180 - ¥260
- **Vszapower LIR2032 充电套装**：**仅需一套**（包含 1 个智能充电座 + 4 节 LIR2032 可充电池）

使用 18 个月内即可实现成本回本，并在接下来的数年中为地球少产生数十节重金属废电池！

---

### 准备好升级为环保可充电纽扣电池了吗？
探索我们的 **[LIR2032 智能充电套装](/products/lir2032-starter-kit)**，内置牛皮纸环保礼盒包装、4 节高品质 LIR2032 电池与 2 年质量质保承诺！`
  },
  {
    id: 'p2',
    slug: 'the-ultimate-guide-to-rechargeable-coin-cell-batteries',
    title: 'LIR2032 / LIR2025 / LIR2450 / ML2032 全系列纽扣电池规格图谱与选型指南',
    summary: '面对复杂的 LIR2032、LIR2025、LIR2450 以及 ML2032 命名，如何为你的设备精准匹配电池？一文拆解 4 位数字编码含义、尺寸规格与应用场景。',
    category: '选型与对比',
    tags: ['规格图谱', 'LIR2450', 'LIR2025', 'ML2032'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[1],
    author: 'Vszapower 技术工程团队',
    read_time: '8 分钟阅读',
    published: true,
    created_at: new Date().toISOString(),
    content: `# LIR2032 / LIR2025 / LIR2450 / ML2032 全系列纽扣电池规格图谱与选型指南

在挑选可充电纽扣电池时，各种型号代码如 **LIR2032**、**LIR2450**、**ML2032** 常常让人感到困惑。准确理解型号背后的物理尺寸与电化学特性，是确保设备安全稳定运行的关键。

---

## 一图看懂：纽扣电池 4 位数字代码含义

纽扣电池的命名遵循国际 IEC 标准，后 4 位数字直接揭示了它的物理尺寸：
- **前 2 位数字**：电池直径（单位：毫米 mm），例如 **20** = 直径 20mm。
- **后 2 位数字**：电池厚度/高度（单位：十分之一毫米 0.1mm），例如 **32** = 厚度 3.2mm；**50** = 厚度 5.0mm。

| 尺寸规格 | 可充电型号 | 标称电压 | 典型容量 | 最佳适用设备场景 |
|---|---|---|---|---|
| 20mm x 3.2mm | **LIR2032** | 3.7V | ~45mAh | Apple AirTag、汽车钥匙遥控器、主板发光徽章 |
| 20mm x 2.5mm | **LIR2025** | 3.7V | ~35mAh | 超薄款车钥匙（雷克萨斯、奔驰等）、薄型计算器 |
| 24mm x 5.0mm | **LIR2450** | 3.7V | ~120mAh | 智能指纹门锁、高功耗 Zigbee/蓝牙大功耗节点 |
| 20mm x 3.2mm | **ML2032** | 3.0V | ~65mAh | 光动能手表、需要 3.0V 严格定压的 CMOS 备份电源 |

---

## 高品质极简环保牛皮纸盒包装

在选择微型电子元器件时，包装设计往往反映了制造工厂的工程标准。

**Vszapower** 全线产品均采用定制的 **Precision Eco-Kraft 高密度牛皮纸盒包装**。除了质感高雅外，环保牛皮纸包装还带来：
1. **静电防护**：有效隔离运输途中的静电干扰与短路风险。
2. **参数一目了然**：正面清晰标注 3.6V-4.2V 微芯片过充电控制参数。
3. **极简减塑**：零塑料过度包装，符合现代化绿色环保理念。

---

## 4 步轻松完成纽扣电池充电

1. 将 LIR2032 / LIR2450 电池放入 **Vszapower 智能充电座** 的独立卡槽。
2. 连接任意 5V USB 供电口（笔记本电脑、充电宝或手机充电头）。
3. 充电过程中指示灯呈现 **高亮红色**。
4. 约 45 分钟满电后，指示灯自动切换为 **常亮绿色** 并触发智能切断保护。

即刻查看我们的 **[智能纽扣电池充电套装全系列](/products/lir2032-starter-kit)**！`
  },
  {
    id: 'p3',
    slug: 'airtag-battery-life-and-lir2032-compatibility-lab-test',
    title: 'Apple AirTag 续航提升与 LIR2032 可充电电池实测与兼容性报告',
    summary: 'AirTag 总是提示低电量？我们通过实验室实测，验证了 3.7V LIR2032 在 AirTag 上的高频定位、蜂鸣器响铃及全电量循环表现。',
    category: '设备兼容测评',
    tags: ['AirTag', '车钥匙遥控', '实测报告', 'LIR2032'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[2],
    author: 'Vszapower 实验室测试组',
    read_time: '5 分钟阅读',
    published: true,
    created_at: new Date().toISOString(),
    content: `# Apple AirTag 续航提升与 LIR2032 可充电电池实测与兼容性报告

Apple AirTag 作为全球广受欢迎的防丢标记设备，采用一枚标准 2032 规格纽扣电池供电。官方标称续航约 1 年，但在高频寻物、查找响铃或处于人流量巨大的蓝牙节点区域时，电池消耗速度显著加快。

很多用户提出疑问：**能否用可充电的 LIR2032 替代 AirTag 中的一次性 CR2032 电池？** 我们在电化学实验室进行了为期 30 天的严苛测试。

---

## 实验室实测关键结论

> [!NOTE]
> **测试结论概览**：LIR2032 在 AirTag 中运行稳定，U1 超宽频精确查找与蓝牙广播功能完全正常，且支持无限次反复充电。

### 1. 电压承受度测试
AirTag 内部的电源管理芯片（PMIC）设计工作上限可达 **4.5V**。当放入刚充满电（4.2V）的 LIR2032 时，AirTag 能够立即无缝识别并初始化成功，无任何发热或异常提示。

### 2. 蜂鸣器响铃与精准查找功能
由于 LIR2032 输出电压略高于普通 CR2032（3.7V vs 3.0V），AirTag 内置蜂鸣器在发出提示音时声音更加清晰洪亮，U1 芯片的信号发射功率保持最高水准。

### 3. 循环充电周期
虽然单次充电在 AirTag 上的持续使用时长约为 3 - 4 个月（容量约为一次性电池的 1/4），但由于充电过程仅需 **45 分钟** 即可充满，配备 2 节以上 LIR2032 交替使用，即可实现真正的 **零购买成本、零电池浪费** 体验！

---

### 推荐搭配
建议搭配使用 **[Vszapower LIR2032 入门套装](/products/lir2032-starter-kit)**，套装内含 4 节高容量可充电池与 USB 双槽充电器。`
  },
  {
    id: 'p4',
    slug: 'coin-cell-charging-safety-and-smart-chip-tech',
    title: '微型纽扣电池智能充电器脉冲保护与 Auto-Cut 芯片原理解析',
    summary: '纽扣电池充电为何不能使用常规快充？深入了解 20mA 微电流控制、Auto-Cut 饱满自动切断防过充机制与微型安全电路设计。',
    category: '充电与安全',
    tags: ['充电安全', '智能芯片', '防过充', '环保纸盒'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[3],
    author: 'Vszapower 研发中心',
    read_time: '7 分钟阅读',
    published: true,
    created_at: new Date().toISOString(),
    content: `# 微型纽扣电池智能充电器脉冲保护与 Auto-Cut 芯片原理解析

纽扣电池虽然体积小小，但其内部电化学结构与锂离子电芯同样精准。错误使用高电流充电设备极易对扣式电池造成不可逆损伤。

本文将为您揭秘 **Vszapower 智能扣式电池充电座** 内部的微型保护芯片与高效脉冲充电架构。

---

## 1. 为什么纽扣电池必须使用 20mA-50mA 微电流？

与手机电池（数千毫安时，充放电电流可达数安培）不同，LIR2032 电池的容量通常在 **45mAh - 50mAh** 之间。

按照电池充电 C 率（C-Rate）安全标准，最佳充电倍率应保持在 **0.5C - 1C**。这意味着充电电流必须严格锁定在 **20mA 至 50mA** 之间：
- **电流过大**：会导致电解液结晶与内阻剧增，缩短电池寿命。
- **电流精确调控**：确保电芯内部锂离子均匀嵌入负极石墨层，循环寿命达到 500 次以上。

---

## 2. Auto-Cut 饱充自动切断技术

Vszapower 智能充电座每个通道均内置独立的 IC 控制单元：
1. **实时电压监测**：每毫秒对电池端电压进行高精度采样。
2. **预充与恒流段**：对低电压电池采用柔和预充，随后进入恒流阶段。
3. **4.20V 阀值断电**：当电池电压精确达到 **4.20V ± 0.05V** 时，芯片立即触发 **Auto-Cut** 硬件级关闭电流，防止任何形式的过充。

---

## 3. 防反接与短路双重防护

当用户在夜间或不便观察时误将电池正负极颠倒放入卡槽，Vszapower 智能电路会自动切断通道回路，且 LED 状态灯不会亮起，有效保护电池与充电器电路不受损坏。

结合**高密度环保牛皮纸盒包装**，无论是在实验室桌面、家用办公桌还是出差便携包中，都能提供持久可靠的安全保障。`
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
  },
  {
    standard_model: 'CR1632',
    rechargeable_model: 'LIR1632',
    voltage: '3.7V (Replaces 3.0V)',
    capacity: '20mAh',
    common_devices: ['Car Key Remotes', 'Heart Rate Chest Straps', 'Digital Calipers'],
    recommended_charger: 'Vszapower Universal Micro Dock',
    notes: '16mm x 3.2mm rechargeable coin cell.'
  },
  {
    standard_model: 'CR1220',
    rechargeable_model: 'LIR1220',
    voltage: '3.7V (Replaces 3.0V)',
    capacity: '12mAh',
    common_devices: ['Smart Watch RTC', 'Micro Laser Pointers', 'Miniature Calculators'],
    recommended_charger: 'Vszapower Universal Micro Dock',
    notes: 'Micro 12mm x 2.0mm rechargeable coin cell.'
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
