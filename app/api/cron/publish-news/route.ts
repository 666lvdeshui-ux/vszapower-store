import { NextResponse } from 'next/server';
import { fetchAllPosts, savePost } from '@/lib/store';
import { REAL_PRODUCT_COVER_IMAGES, getRandomProductCoverImage } from '@/lib/supabase';

// Topic Pool for daily automated news generation focusing on Coin Cell Chargers & target battery models
const DAILY_NEWS_POOL = [
  {
    topic: 'lir2032-lir2450-lir2025-lir2016-smart-charger-guide',
    title: 'LIR2032 / LIR2025 / LIR2016 / LIR2450 智能纽扣电池充电器选型与微电流防过充技术指南',
    summary: '专门针对 LIR2032、LIR2025、LIR2016 和 LIR2450 系列可充电纽扣电池设计的智能充电器解析。深入探讨 20mA-50mA 涓流控制、Auto-Cut 4.2V 自动切断芯片与多卡槽兼容设计。',
    category: '充电与安全',
    tags: ['纽扣电池充电器', 'LIR2032充电器', 'LIR2450', 'LIR2025', 'LIR2016', '微电流防过充'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[0],
    author: 'Vszapower 纽扣电池充电器研发组',
    read_time: '6 分钟阅读',
    content: `# LIR2032 / LIR2025 / LIR2016 / LIR2450 智能纽扣电池充电器选型与微电流防过充技术指南

在如今的高科技电子产品时代，从 **Apple AirTag** 到**汽车智能遥控钥匙**、**主板 CMOS RTC 备份电源** 以及**智能指纹门锁**，纽扣电池（Coin Cell Battery）无处不在。

然而，传统的 CR 系列（如 CR2032、CR2450、CR2025）均属于**一次性锂锰电池**，无法循环使用且容易造成大量的环境污染与反复购买成本。

升级为 **LIR 系列可充电锂离子纽扣电池**（3.6V - 3.7V）搭配 **Vszapower 专用智能纽扣电池充电座**，是实现节能降本与高可靠性供电的最佳方案！

---

## 1. 核心纽扣电池型号兼容性一览表

| 纽扣电池型号 | 直径/厚度 | 标称电压 | 满电电压 | 典型应用场景 | 推荐充电器卡槽 |
|---|---|---|---|---|---|
| **LIR2032** | 20mm x 3.2mm | 3.6V - 3.7V | 4.20V | Apple AirTag, 车钥匙, 发光发饰 | 智能双槽/四槽标准扣式卡槽 |
| **LIR2025** | 20mm x 2.5mm | 3.6V - 3.7V | 4.20V | 超薄车钥匙, 电子秤, 遥控器 | 智能双槽/四槽通用卡槽 |
| **LIR2016** | 20mm x 1.6mm | 3.6V - 3.7V | 4.20V | 极薄手表, 微型卡片发声器 | 微弹簧夹式卡槽 |
| **LIR2450** | 24mm x 5.0mm | 3.6V - 3.7V | 4.20V | 智能指纹门锁, 血糖仪, 蓝牙信标 | 大电流 120mAh 专用通道 |

---

## 2. 为什么纽扣电池不能用普通充电器？

纽扣电池容量较小（LIR2032 约为 45mAh，LIR2450 约为 120mAh）。如果使用电流过大的通用电池充电器，极易发生内阻过热、发涨甚至电解液泄漏。

**Vszapower 智能充电座的技术亮点：**
- **微电流精准控制**：将恒流充电段锁定在 20mA - 50mA 安全区间。
- **Auto-Cut 4.2V 自动断电**：内置硬件比较器 IC，当电池充至 4.20V ± 0.05V 时瞬间切断电路。
- **正负极反接防呆设计**：即便误将电池反向放入卡槽，也不会造成短路火花。

---

## 3. 选用建议

选购前请确认您的设备支持 3.6V/3.7V 锂电池输入（95% 以上现代消费电子均原生支持）。搭配 **[Vszapower 智能扣式电池充电套装](/products/lir2032-starter-kit)**，一次投入即可享有 500+ 次循环重复使用！`
  },
  {
    topic: 'lir1632-lir1220-micro-coin-cell-charger-tech',
    title: 'LIR1632 与 LIR1220 微型可充电纽扣电池专用充电器原理及精密设备供电方案',
    summary: '针对智能手表、蓝牙微型遥控器及精密测量仪器常用的 LIR1632 (16mm) 与 LIR1220 (12mm) 扣式电池，解析微小型电芯充电器保护电路设计与 SEO 选型指南。',
    category: '选型与对比',
    tags: ['LIR1632', 'LIR1220', '微型纽扣电池充电器', '精密仪器电池', '扣式电池充电座'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[1],
    author: 'Vszapower 微型电源工程部',
    read_time: '5 分钟阅读',
    content: `# LIR1632 与 LIR1220 微型可充电纽扣电池专用充电器原理及精密设备供电方案

在微型电子产品和高精度仪器领域，**LIR1632**（直径 16mm，厚度 3.2mm）与 **LIR1220**（直径 12mm，厚度 2.0mm）是非常关键的微型可充电纽扣电池。

由于其体积分小、电芯容量通常在 10mAh 至 20mAh 之间，这类微型电池对**纽扣电池充电座的精度要求**极高。

---

## 1. 规格参数与对比

- **LIR1632**：3.7V / 20mAh 典型容量，广泛应用于车载遥控器、心率胸带、数显卡尺。
- **LIR1220**：3.7V / 12mAh 典型容量，常用于 RTC 时钟芯片备份、微型激光笔、数码相机内胆电源。

---

## 2. 微电流智能安全防线

Vszapower 专门针对 **LIR1632 / LIR1220** 微型扣式电池开发了阶梯式涓流控制算法：
1. **10mA 级预充**：保护微型电芯不受到大电流冲击。
2. **三色双通道指示灯**：红灯充电，绿灯充满，无电池放置时熄灭。
3. **USB 5V 便携供电**：支持笔记本 USB 口、充电宝以及车充随充随用。`
  },
  {
    topic: 'ml2032-vs-lir2032-3v-charger-compatibility',
    title: 'ML2032 (3.0V) 与 LIR2032 (3.7V) 纽扣电池充电器对比：主板 CMOS 与光动能手表充电全解析',
    summary: '详解 3.0V 锰酸锂可充电池 ML2032 与 3.7V 锂离子可充电池 LIR2032 在专用充电器电压档位设定、主板 RTC 备份电源及光动能手表中的替代与兼容区别。',
    category: '充电与安全',
    tags: ['ML2032', 'LIR2032', '3.0V纽扣电池充电', 'CMOS电池', '纽扣电池充电器'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[2],
    author: 'Vszapower 电化学实验室',
    read_time: '7 分钟阅读',
    content: `# ML2032 (3.0V) 与 LIR2032 (3.7V) 纽扣电池充电器对比：主板 CMOS 与光动能手表充电全解析

在可充电纽扣电池家族中，**ML2032**（锰酸锂可充，3.0V）与 **LIR2032**（锂离子可充，3.7V）外观几乎完全相同，但它们的电化学电压平台与充电需求截然不同。

---

## 1. ML2032 与 LIR2032 的核心区别

| 对比项 | ML2032 (锰酸锂可充) | LIR2032 (锂离子可充) |
|---|---|---|
| **标称电压** | 3.0V | 3.6V - 3.7V |
| **最高充电限制电压** | **3.30V ± 0.05V** | **4.20V ± 0.05V** |
| **典型电容量** | 约 65mAh | 约 45mAh - 50mAh |
| **典型应用领域** | 卡西欧光动能手表、电脑主板 CMOS、PLC 备份电源 | Apple AirTag、汽车钥匙、蓝牙遥控器 |

---

## 2. 充电器兼容性选择指南

- **LIR2032** 满电需要 4.2V 截止控制；
- **ML2032** 满电切勿超过 3.3V 截止！若错用 4.2V 充电器会导致 ML2032 内部电化学结构损坏。

**Vszapower 智能充电器系统** 针对两种电池体系均设计有高精度识别芯片，彻底消除电压错配安全隐患。`
  },
  {
    topic: 'airtag-keyfob-lir2032-lir2450-charger-solution',
    title: 'AirTag / 车钥匙 / 智能门锁替换成本计算：为什么必须配置一台专用纽扣电池充电器？',
    summary: '算清经济账！将一次性 CR2032/CR2450/CR2025 替换为 LIR2032/LIR2450/LIR2025 并配置智能纽扣电池充电器，5 年可节省数百元开支并消除废电池污染。',
    category: '选型与对比',
    tags: ['纽扣电池充电器', 'LIR2032', 'LIR2450', 'AirTag电池充电', '车钥匙充电器', 'SEO指南'],
    cover_image: REAL_PRODUCT_COVER_IMAGES[0],
    author: 'Vszapower 消费电子选型团队',
    read_time: '5 分钟阅读',
    content: `# AirTag / 车钥匙 / 智能门锁替换成本计算：为什么必须配置一台专用纽扣电池充电器？

在日常生活中，我们的很多常用设备都依赖纽扣电池：
- **Apple AirTag**：使用 CR2032（可升级为 **LIR2032**）
- **汽车遥控钥匙**：使用 CR2032 / CR2025 / CR1632（可升级为 **LIR2032 / LIR2025 / LIR1632**）
- **智能指纹门锁**：使用大容量 CR2450（可升级为 **LIR2450**）
- **小型电子称/计算器**：使用 CR1220（可升级为 **LIR1220**）

---

## 1. 一次性电池 vs 可充电纽扣电池 + 专用充电座开支对比

| 资产开支对比 | 一次性电池 (CR 系列) | LIR 可充电池 + Vszapower 专用充电座 |
|---|---|---|
| **5 年消耗数量** | 20-30 节一次性电池 | **仅需 4 节 LIR 电池 + 1 台智能充电座** |
| **5 年总花费** | 约 ¥200 - ¥350 | **仅需一套入门套装开支（一次性投资）** |
| **重金属废电池排放** | 20-30 节进入垃圾填埋场 | **零废弃物，500+ 次反复循环利用** |

---

## 2. 选择 Vszapower 纽扣电池充电器的优势

选择一台高品质的 **Vszapower 扣式电池智能充电座**，不仅能为您省钱，其精准的微电流断电芯片还能保护电芯无衰减循环：
- 兼容型号包含：**LIR2032、LIR2025、LIR2016、LIR2450、LIR1632、LIR1220、ML2032**。
- 支持 USB 5V 接口输入，支持笔记本、充电宝、车充等多种场景随充随用。`
  }
];

export async function POST(request: Request) {
  try {
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
        title: `【每日扣式电池前沿】${baseItem1.title} (${dateStr}版)`,
        cover_image: getRandomProductCoverImage(randIdx1 + Date.now()),
        created_at: now.toISOString(),
      });
      articlesToPublish.push({
        ...baseItem2,
        slug: `${baseItem2.topic}-${Date.now()}-2`,
        title: `【电池学院前沿速递】${baseItem2.title} (${dateStr}专刊)`,
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
      message: `Successfully generated and published 2 daily coin cell battery news articles for ${dateStr}!`,
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
