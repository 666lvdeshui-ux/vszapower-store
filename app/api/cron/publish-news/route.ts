import { NextResponse } from 'next/server';
import { savePost, fetchAllPosts } from '@/lib/store';

// Topic Pool for daily automated news generation focusing on Coin Cell Chargers & target battery models
const DAILY_NEWS_POOL = [
  {
    topic: 'lir2032-lir2450-lir2025-lir2016-smart-charger-guide',
    title: 'LIR2032 / LIR2025 / LIR2016 / LIR2450 智能纽扣电池充电器选型与微电流防过充技术指南',
    summary: '专门针对 LIR2032、LIR2025、LIR2016 和 LIR2450 系列可充电纽扣电池设计的智能充电器解析。深入探讨 20mA-50mA 涓流控制、Auto-Cut 4.2V 自动切断芯片与多卡槽兼容设计。',
    category: '充电与安全',
    tags: ['纽扣电池充电器', 'LIR2032充电器', 'LIR2450', 'LIR2025', 'LIR2016', '微电流防过充'],
    cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    author: 'Vszapower 纽扣电池充电器研发组',
    read_time: '6 分钟阅读',
    content: `# LIR2032 / LIR2025 / LIR2016 / LIR2450 智能纽扣电池充电器选型与微电流防过充技术指南

在可充电扣式电池应用中，**专用纽扣电池充电器（Smart Coin Cell Battery Charger）** 是决定电池使用寿命、安全性和充放电循环次数的核心关键设备。

不同于传统 AA/AAA 快充充电器，扣式锂电池（如 **LIR2032**、**LIR2025**、**LIR2016**、**LIR2450**）容量较小（从 25mAh 到 120mAh 不等），必须采用极其精细的微电流控制。

---

## 1. 核心型号与充电电流适配表

| 扣式电池型号 | 物理尺寸 (直径x厚度) | 标称电压 | 典型容量 | 专用充电器最佳输出电流 |
|---|---|---|---|---|
| **LIR2032** | 20mm x 3.2mm | 3.7V | 45mAh - 50mAh | 20mA - 35mA 涓流恒流 |
| **LIR2025** | 20mm x 2.5mm | 3.7V | 35mAh | 15mA - 25mA 恒流 |
| **LIR2016** | 20mm x 1.6mm | 3.7V | 25mAh | 10mA - 20mA 微电流 |
| **LIR2450** | 24mm x 5.0mm | 3.7V | 120mAh | 40mA - 60mA 独立卡槽 |

---

## 2. 为什么不能用通用充电器给纽扣电池充电？

> [!WARNING]
> 切勿使用未经过微电流限制的普通电池充电器或直连 5V 电源对 **LIR2032 / LIR2025 / LIR2016 / LIR2450** 充电！过大电流会导致电芯内部发热膨胀、电解液干涸甚至损坏设备。

**Vszapower 智能扣式电池充电座** 内置微控制芯片（MCU），具有以下四大保护机制：
1. **Auto-Cut 饱充自停**：当电芯电压达到 **4.20V ± 0.05V** 截止点时自动断开充电回路。
2. **正负极反接保护**：防反插短路电路，即便新手误操作也不会损坏电芯。
3. **独立多通道卡槽**：可同时为不同规格（如同时充电 1 节 LIR2032 与 1 节 LIR2450）进行独立电流分配。
4. **环保高密度牛皮纸包装**：出厂防静电盒包装，符合最新 ESG 环保防静电标准。`
  },
  {
    topic: 'lir1632-lir1220-micro-coin-cell-charger-tech',
    title: 'LIR1632 与 LIR1220 微型可充电纽扣电池专用充电器原理及精密设备供电方案',
    summary: '针对智能手表、蓝牙微型遥控器及精密测量仪器常用的 LIR1632 (16mm) 与 LIR1220 (12mm) 扣式电池，解析微小型电芯充电器保护电路设计与 SEO 选型指南。',
    category: '选型与对比',
    tags: ['LIR1632', 'LIR1220', '微型纽扣电池充电器', '精密仪器电池', '扣式电池充电座'],
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: 'Vszapower 微型电源工程部',
    read_time: '5 分钟阅读',
    content: `# LIR1632 与 LIR1220 微型可充电纽扣电池专用充电器原理及精密设备供电方案

在微型电子产品和高精度仪器领域，**LIR1632**（直径 16mm，厚度 3.2mm）与 **LIR1220**（直径 12mm，厚度 2.0mm）是非常关键的微型可充电纽扣电池。

由于其体积极小、电芯容量通常在 10mAh 至 20mAh 之间，这类微型电池对**纽扣电池充电座的精度要求**极高。

---

## 1. LIR1632 与 LIR1220 典型应用场景

- **LIR1632**：智能车钥匙遥控器（部分超薄款）、蓝牙防丢卡片、医疗心率监测胸带、高精度数显游标卡尺。
- **LIR1220**：智能手表 RTC 备份电源、助听器微型测试模块、LED 激光指示笔。

---

## 2. 专用微电流充电器的核心保护要求

对于容量极小的 **LIR1220** 和 **LIR1632** 电池，标准的充电电流必须控制在 **5mA - 15mA** 的极窄范围内：
- **微毫安极精细恒流段**：防止小容量电芯瞬间极化过度。
- **LED 充电双色指示**：红灯充电、绿灯满电自停，充电时间约 30-40 分钟。

选用 **Vszapower 通用多规格扣式电池充电座**，可完美兼容 **LIR1632、LIR1220、LIR2032、LIR2450** 等全系列二次电池的快捷循环充电！`
  },
  {
    topic: 'ml2032-vs-lir2032-3v-charger-compatibility',
    title: 'ML2032 (3.0V) 与 LIR2032 (3.7V) 纽扣电池充电器对比：主板 CMOS 与光动能手表充电全解析',
    summary: '详解 3.0V 锰酸锂可充电池 ML2032 与 3.7V 锂离子可充电池 LIR2032 在专用充电器电压档位设定、主板 RTC 备份电源及光动能手表中的替代与兼容区别。',
    category: '充电与安全',
    tags: ['ML2032', 'LIR2032', '3.0V纽扣电池充电', 'CMOS电池', '纽扣电池充电器'],
    cover_image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    author: 'Vszapower 电化学实验室',
    read_time: '7 分钟阅读',
    content: `# ML2032 (3.0V) 与 LIR2032 (3.7V) 纽扣电池充电器对比：主板 CMOS 与光动能手表充电全解析

在扣式可充电电池家族中，**ML2032** 与 **LIR2032** 虽然外观尺寸完全一致（均为直径 20mm，厚度 3.2mm），但两者的电化学体系与工作电压存在本质区别。

了解 **ML2032** 与 **LIR2032** 在**纽扣电池充电器**上的兼容机制，对于电脑主板维修、光动能手表保养和精密仪器供电至关重要。

---

## 1. 电化学参数对照表

| 参数指标 | ML2032 (锰酸锂可充电池) | LIR2032 (锂离子可充电池) |
|---|---|---|
| **电化学材料** | 锰酸锂二次电池 (Li/MnO2 Rechargeable) | 锂离子钴酸锂/三元扣式 (Li-ion) |
| **标称工作电压** | **3.0V** | **3.6V - 3.7V** |
| **截止充电电压** | **3.3V - 3.4V** | **4.20V** |
| **典型应用领域** | 光动能手表、太阳能设备、主板 CMOS RTC 蓄电 | AirTag、汽车遥控钥匙、LED 徽章、智能传感器 |

---

## 2. 充电器电压档位选择

> [!IMPORTANT]
> **ML2032** 的饱充截止电压为 **3.3V-3.4V**，若误将其放入 4.2V 的 LIR2032 充电槽中，会导致过充损伤！

**Vszapower 多功能纽扣电池智能充电座** 支持智能电压切换与多型号兼容：
- 针对 **LIR2032 / LIR2025 / LIR2016 / LIR2450 / LIR1632 / LIR1220** 提供标准的 4.2V 微芯片控制保护；
- 针对 **ML2032** 提供专门的 3.0V/3.3V 低压降充电维持功能，确保每一节扣式电池都能获得最安全的循环充电！`
  },
  {
    topic: 'airtag-keyfob-lir2032-lir2450-charger-solution',
    title: 'AirTag / 车钥匙 / 智能门锁替换成本计算：为什么必须配置一台专用纽扣电池充电器？',
    summary: '算清经济账！将一次性 CR2032/CR2450/CR2025 替换为 LIR2032/LIR2450/LIR2025 并配置智能纽扣电池充电器，5 年可节省数百元开支并消除废电池污染。',
    category: '选型与对比',
    tags: ['纽扣电池充电器', 'LIR2032', 'LIR2450', 'AirTag电池充电', '车钥匙充电器', 'SEO指南'],
    cover_image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
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
    // Basic verification token support (optional)
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Pick 2 articles from the daily news pool that are not yet in the existing posts
    const existingPosts = await fetchAllPosts();
    const existingSlugs = new Set(existingPosts.map(p => p.slug));

    // Find candidate articles or create timed dynamic articles
    const candidates = DAILY_NEWS_POOL.filter(item => !existingSlugs.has(item.topic));
    
    // If candidates are fewer than 2, generate dynamically timed news updates
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const articlesToPublish = [];
    
    if (candidates.length >= 2) {
      articlesToPublish.push(candidates[0], candidates[1]);
    } else {
      // Pick any available from pool and customize slug/title with timestamp
      const baseItem1 = DAILY_NEWS_POOL[Math.floor(Math.random() * DAILY_NEWS_POOL.length)];
      const baseItem2 = DAILY_NEWS_POOL[(Math.floor(Math.random() * DAILY_NEWS_POOL.length) + 1) % DAILY_NEWS_POOL.length];
      
      articlesToPublish.push({
        ...baseItem1,
        slug: `${baseItem1.topic}-${Date.now()}-1`,
        title: `【每日扣式电池前沿】${baseItem1.title} (${dateStr}版)`,
        created_at: now.toISOString(),
      });
      articlesToPublish.push({
        ...baseItem2,
        slug: `${baseItem2.topic}-${Date.now()}-2`,
        title: `【电池学院前沿速递】${baseItem2.title} (${dateStr}专刊)`,
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
        cover_image: item.cover_image,
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
