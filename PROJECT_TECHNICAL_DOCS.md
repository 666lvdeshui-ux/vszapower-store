# VSZAPOWER 官网 (vszapower.com) 技术架构与 Codex 无缝交接文档

> **更新时间**：2026年8月1日  
> **项目名称**：VSZAPOWER Store (`vszapower-store`)  
> **项目域名**：[https://www.vszapower.com](https://www.vszapower.com)  
> **GitHub 仓库**：`666lvdeshui-ux/vszapower-store` (分支: `main`)  
> **主要主体公司**：VSZAPOWER Limited (微贊控股（香港）有限公司)  
> **联系邮箱**：`666lvdeshui@gmail.com`  
> **交接专用文档**：[`CODEX_HANDOVER_DOCS.md`](file:///Users/xiehui/.gemini/antigravity-ide/scratch/vszapower/CODEX_HANDOVER_DOCS.md)  

---

## 一、 项目定位与商业目标

本项目为 **VSZAPOWER (微贊)** 品牌全球外贸 B2B 官方商城。专为承接来自 **TikTok 社媒引流** 及 **Google SEO/GEO 国际化检索流量** 而打造，实现从“社媒点击”到“源头工厂背书”再到“在线实时获取 2026 官方 FOB 报价单 (PDF)”的高高效询盘转化。

### 核心设计原则（后续 Codex/AI 接手必须遵循）：
1. **100% 工业级 B2B 批发定位**：屏蔽所有 C 端小单低价，全站起订量统一为 `MOQ: 100 Pcs`。
2. **零 Temu/零售印记**：所有历史零售评价词汇已全量替换为 `✓ 1,480+ Verified Reviews` / `Verified Buyers`。
3. **线索与 PDF 双轮同步获客**：买家提交询盘或点击索取 `Download Wholesale Catalog (PDF)` 时，前端自动向 `/api/inquiries` 提交线索，存入 Supabase 并邮件通知 `666lvdeshui@gmail.com`；同时自动在新标签页弹窗打开全英文 B2B 官方报价单。

---

## 二、 系统架构与技术栈

- **前端框架**：Next.js 14.2.5 (App Router 模式)
- **开发语言**：TypeScript 5.5.3
- **样式与设计系统**：Tailwind CSS + `app/globals.css` 高对比度主题变量（完美兼容暗色与亮色模式）
- **数据库与后端服务**：Supabase Client (`@supabase/supabase-js`) + `lib/store.ts` 服务端本地 JSON 降级防护
- **14 国语言国际化**：`lib/i18n.ts`（静态 UI 翻译） + `lib/dynamicI18n.ts`（产品/文章动态预翻译引擎）
- **自动构建与部署**：Vercel (配置 `vercel.json` 自动化 Cron 每日定时发布新闻)

---

## 三、 关键文件索引与代码地图

```
vszapower-store/
├── CODEX_HANDOVER_DOCS.md             # 🤖 Codex / AI Agent 无缝交接专属指南
├── PROJECT_TECHNICAL_DOCS.md          # 📄 项目整体技术架构与重构文档
├── app/
│   ├── page.tsx                        # B2B 官网主页入口
│   ├── admin/page.tsx                  # 后台线索与产品管理系统 (/admin)
│   ├── academy/                        # 电池知识库与 SEO 博客 (支持 slug 动态路由)
│   ├── sitemap.ts                      # SEO 动态 Sitemap 生成器
│   └── api/                            # 8 大 RESTful API 路由 (inquiries, products, posts, etc.)
├── components/
│   ├── Header.tsx                      # 导航栏（精简为 6 大 B2B 核心 Tabs）
│   ├── ProductGrid.tsx                 # 28 组产品网格与询盘 Modal
│   ├── CatalogDownloadModal.tsx        # 1-Click 下载 Catalog & 自动弹窗 PDF 报价单
│   ├── CertificationsSection.tsx       # 8 大国际出口权威认证展示
│   ├── ContactSection.tsx              # B2B 专属询盘表单
│   └── admin/InquiryManager.tsx        # 后台询盘线索实时跟踪面板
├── lib/
│   ├── supabase.ts                     # Supabase 连接配置与 Mock 数据降级逻辑
│   ├── i18n.ts                         # 14 国语言字典与逻辑
│   └── store.ts                        # 服务端持久化与产品/文章数据逻辑
├── public/
│   └── VSZAPOWER_2026_Official_Wholesale_Quotation.html # 官方 PDF 打印版 FOB 报价单
└── supabase_schema.sql                 # Supabase 数据库 DDL 表结构定义
```

---

## 四、 数据库与核心数据结构 (`supabase_schema.sql`)

### 询盘线索模型 (`inquiries`)
```typescript
interface InquiryItem {
  id: string;
  name: string;
  contact: string;   // 买家邮箱 / 电话
  company?: string;  // 公司名称
  country?: string;  // 所属国家 / 需求标记
  product?: string;  // 意向产品 / 资料名称
  message?: string;  // 详细需求
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}
```

---

## 五、 测试、构建与无缝交接指令

为保证 Codex 或其他开发者接手后能顺利运行，请使用以下标准命令：

### 1. 运行本地开发服务
```bash
npm run dev
```

### 2. 运行 TypeScript 类型检查与静态生产构建
```bash
npx tsc --noEmit
npm run build
```

### 3. 代码提交与部署
```bash
git add .
git commit -m "feat: your features"
git push origin main
```

---

*文档完结，AI Agent / Codex 可直接阅读 `CODEX_HANDOVER_DOCS.md` 开展后续开发。*
