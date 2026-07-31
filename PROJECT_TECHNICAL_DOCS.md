# VSZAPOWER 官网 (vszapower.com) B2B 架构与全站技术文档总览

> **文档创建时间**：2026-07-31  
> **项目定位**：VSZAPOWER 纯品牌官网展示 + 引导 B2B 批发/大宗采购/OEM/ODM 出口独立站  
> **代码仓库**：[https://github.com/666lvdeshui-ux/vszapower-store](https://github.com/666lvdeshui-ux/vszapower-store)  
> **线上域名**：[https://www.vszapower.com](https://www.vszapower.com)  

---

## 一、 项目背景与 B2B 升级核心痛点

针对原本独立站混杂 C 端零售感、$6-$7 低价标签影响品牌供应链层级信誉的问题，全站进行了深度 B2B 批发转型重构：
1. **去掉 C 端零售价格**：隐藏或替换为 `MOQ: 100 Pcs` 与 `Get Wholesale Quote`（获取大宗报价），消除零售小杂货感。
2. **移除 Temu 依赖**：全站产品卡片、买家评价、SEO 元数据、Modal 弹窗与过滤器中彻底清空 `Temu` 单词，重写为 `✓ 1,480+ Verified Reviews` / `Verified Purchase` / `Verified Buyers`。
3. **强化源头工厂背书 (Factory & OEM Showcase)**：新增 10,000+ m² 研发生产基地、500,000+ 月产能、100% 全检 QC 及 50+ 国家出口实力展示。
4. **全球安全与运输认证体系 (Global Certifications)**：全面上架 CE-LVD & EMC, FCC Part 15B, RoHS 2.0, UN38.3 (空运/海运鉴定报告), MSDS, 1.2m 包装跌落测试, PSE Exempt, UKCA, GPSR & 2026 EU Battery 新规认证。
5. **14 种语言国际化体系 (14-Language i18n System)**：实现全站导航、核心板块、动态标题及 Modal 弹窗在 14 种语言下 100% 同步切换。

---

## 二、 核心技术栈与系统架构

- **前端框架**：Next.js 14.2.5 (App Router) + React 18 + TypeScript 5
- **样式与主题引擎**：Vanilla CSS Design Tokens (`app/globals.css`) + CSS Custom Variables (`[data-theme="light"]` / `[data-theme="dark"]`) + `ThemeContext`
- **国际化引擎**：`LanguageContext` + `lib/i18n.ts` (静态 UI 字典) + `lib/dynamicI18n.ts` (板块与动态内容翻译引擎)
- **后端 & 询盘线索收集**：Next.js Server Actions & API Routes (`/api/inquiries`, `/api/posts`, `/api/products`, `/api/videos`, `/api/reviews`) + FormSubmit.co 自动邮件转发与线索归档
- **托管与 CI/CD**：Vercel Production Auto-Deploy (绑定 GitHub `main` 分支全自动构建上线)

---

## 三、 全站模块重构与功能细节

### 1. 顶部 Header 与导航栏 (`components/Header.tsx`, `components/LanguageSwitcher.tsx`, `components/ThemeToggle.tsx`)
- **14 种语言导航 Tabs**：全量绑定 `t('nav_factory')` 与 `t('nav_certifications')`，支持中文（`源头工厂` / `出口资质认证`）、英文（`Factory & OEM` / `Certifications`）、德语（`Fabrik & OEM`）、日语（`自社工場・OEM`）、西班牙语（`Fábrica y OEM`）等 14 国语言无缝同频。
- **防止发光遮挡与排版溢出**：采用卡片式 Flex 布局，`<nav>` 设置 `margin: 0 12px`, `minWidth: 0`；右侧控制区增加 `paddingLeft` 隔离带；微调 `ThemeToggle` 发光阴影半径（`8px`），彻底消除按钮遮挡或文字重叠问题。

### 2. B2B 产品展示与详情弹窗 (`components/ProductGrid.tsx`)
- **询盘与 MOQ 机制**：产品列表标示 `MOQ: 100 Pcs` 与 `Get Wholesale Quote` 询价按钮。
- **Modal 弹窗动态翻译**：弹窗顶部的分类徽章（`Coin Cell Charger` / `Rechargeable Coin Cells`）、产品 Title、Tagline、MOQ 提示及 OEM/ODM 按钮全量接入 `translateDynamicContent(..., lang)`。

### 3. 源头工厂与定制实力 (`components/FactoryShowcase.tsx`)
- 展示 4 大核心产能指标（10,000+ m², 500,000+ Pcs, 100% QC, 50+ Countries）。
- 提供 Custom Logo、Custom Packaging、Custom Micro-Chip、Sample Fast Track 4 大 OEM 定制服务。全文文案全语言动态同频。

### 4. 全球安全与海陆空运出口认证 (`components/CertificationsSection.tsx`)
- 集中展示 CE, FCC, RoHS, UN38.3, MSDS, Drop Test 等 8 大权威证书卡片。
- 支持点击查看 Modal 证书摘要与一键索取 PDF 盖章副本。

### 5. 短视频展示板块 (`components/VideoSection.tsx`)
- 优化精简短视频列表，全英文专业描述，聚焦工厂无尘车间、自动化焊脚、4.2V 防过充测试及耐力 Benchmark。

### 6. 电池学院与首页 3 条精简分页 (`components/BlogPreview.tsx`, `app/academy/page.tsx`)
- **首页 3 条精简**：首页仅保留最新 3 篇文章的 3 列立体卡片展示。
- **首页交互式 Pagination Bar**：底部集成 `Prev` / `1` / `2` / `3` / `4` / `Next` 翻页控制 Bar 与文章总数提示，点击平滑滚动。
- **每日英文发布 API**：`/api/cron/publish-news` 定时生成全英文技术指南与行业白皮书。

### 7. 亮色 / 暗色模式对比度优化 (`app/globals.css`, Components Color Audit)
- 彻底扫清 hardcoded `color: '#fff'`，统一改为 CSS 变量 `color: 'var(--text-main)'`。
- 暗色下呈现高质感亮白 (`#f8fafc`)，切换到亮色模式时自动转换为高对比度石墨黑 (`#0f172a`)，确保文字 100% 清晰可见。
- 重构亮色模式下的 `.badge-green` (#047857), `.badge-gold` (#b45309), Glass Cards 及 Input 表单外观。

### 8. PDF 产品目录 Lead Magnet (`components/CatalogDownloadModal.tsx`, `app/page.tsx`)
- 右下角悬浮 `Download 2026 Catalog (PDF)` 磁铁按钮，一键调出 B2B 资料索取表单，自动捕获买家 Email 与 Company Name 并触发 PDF 下载。

---

## 四、 核心代码目录与配置文件清单

```
vszapower/
├── app/
│   ├── layout.tsx                # 全局 HTML 布局与 SEO Metadata (无 Temu)
│   ├── page.tsx                  # 官网首页主入口 (组装各个 B2B 板块)
│   ├── globals.css               # 核心 CSS Variables、Light/Dark 主题响应式 rules
│   ├── academy/                  # 电池学院文章列表与 slug 文章详情页
│   └── api/                      # Inquiries, Posts, Products, Videos, Reviews API Routes
├── components/
│   ├── Header.tsx                # 14 语言响应式 Navigation Bar
│   ├── HeroCarousel.tsx          # 轮播图 Hero Banner
│   ├── ProductGrid.tsx           # B2B 产品目录与详情 Modal 弹窗
│   ├── FactoryShowcase.tsx       # 源头工厂与 OEM 定制实力板块
│   ├── CertificationsSection.tsx # 8 大国际安全与运输认证板块
│   ├── VideoSection.tsx          # 实验室与工厂短视频 showcase
│   ├── BlogPreview.tsx           # 电池学院首页 3 条精简卡片 + 翻页 Bar
│   ├── ContactSection.tsx        # B2B 询盘与样品索取表单
│   ├── CatalogDownloadModal.tsx  # PDF Catalog 线索收集 Modal
│   ├── LanguageSwitcher.tsx      # 顶部 14 语言下拉选择器
│   └── ThemeToggle.tsx           # 亮暗色模式手动切换按钮
├── context/
│   ├── LanguageContext.tsx       # 语言 State Context
│   └── ThemeContext.tsx          # 主题 State Context
├── lib/
│   ├── i18n.ts                   # 14 语言静态 UI 字典 (SUPPORTED_LANGUAGES)
│   ├── dynamicI18n.ts            # 动态内容与板块标题多语言翻译引擎
│   ├── store.ts                  # 本地/内存数据 Store (Products, Posts, Reviews)
│   └── supabase.ts               # Supabase 数据库客户端配置与 Mock 兜底数据
```

---

## 五、 后续运维与迭代建议

1. **线索收集**：定期检查 `666lvdeshui@gmail.com` 与 `/api/inquiries` 数据库记录，跟进海外买家的大宗报价与样品索取需求。
2. **文章更新**：每日由定时任务触发 `/api/cron/publish-news` 全英文技术文章发布，持续提升 Google SEO 权重。
3. **内容拓展**：如需上架新产品或新增认证证书，只需在 `lib/store.ts` 与 `CertificationsSection.tsx` 中添加标准格式条目，即可自动享有全站 14 语言翻译与亮暗色对比度支持。
