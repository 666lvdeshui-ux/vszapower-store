# VSZAPOWER 官网 (vszapower.com) 阶段性技术架构与 B2B 重构文档

> **生成时间**：2026年7月31日  
> **项目名称**：VSZAPOWER Store (vszapower-store)  
> **项目域名**：[vszapower.com](https://www.vszapower.com)  
> **GitHub 仓库**：`666lvdeshui-ux/vszapower-store` (分支: `main`)  
> **主要主体公司**：VSZAPOWER Limited (微贊控股（香港）有限公司)  
> **联系邮箱**：`666lvdeshui@gmail.com`

---

## 一、 项目背景与商业定位重构

本项目为 **VSZAPOWER (微贊)** 品牌全球外贸 B2B 官方商城。为适应大宗批发与海外工厂直供定位，项目已全面抹去 C 端零售与代购标签，打造为兼具权威工厂背书、14 国语言动态切换、线索实时捕获与外贸标准报价 PDF 导出的工业级网站。

---

## 二、 核心重构与功能完成清单

### 1. B2B 商业定位与重构
- **隐藏 C 端零售低价与小单标签**：全站移除单件低单价，统一改为 `MOQ: 100 Pcs` 大宗批发与 `Get Wholesale Quote` 询价模式。
- **100% 清理 `Temu` 词汇**：全站所有产品列表、买家评价、规格 Modal、SEO 关键词及 Layout 元素中的 `Temu` 单词已全量替换为 `✓ 1,480+ Verified Reviews` / `Verified Purchase` / `Verified Buyers`。
- **工厂与权威认证展示**：上线 10,000+ m² 源头工厂、4 大 OEM/ODM 定制能力及 8 大国际出口权威证书（CE-LVD/EMC, FCC, RoHS 2.0, UN38.3, MSDS, 1.2m 跌落测试, PSE, UKCA, GPSR）。

### 2. 顶部 Header 导航精简
- **隐藏非核心 Tabs**：根据最新需求，已隐藏 Header 顶部的 `短视频 (Short Videos)` 与 `电池学院 (Battery Academy)` Tabs。
- **核心 Tabs 结构**：
  1. 首页 (Home)
  2. 纽扣电池充电器 (Coin Cell Chargers)
  3. 可充电纽扣电池 (Rechargeable Coin Cells)
  4. 源头工厂 (Factory & OEM)
  5. 出口资质认证 (Certifications)
  6. 联系我们 (Contact Us)

### 3. 全英文 28 组产品 B2B 官方批发报价单 (PDF/HTML)
- **文档地址**：[https://www.vszapower.com/VSZAPOWER_2026_Official_Wholesale_Quotation.html](https://www.vszapower.com/VSZAPOWER_2026_Official_Wholesale_Quotation.html)
- **商业隐私保护**：彻底删除了所有 `BOM 零部件`、`裸电池单价`、`卡纸单价` 及内部成本叠加公式，换算为美元 FOB 批发价。
- **价格换算规则**：
  - 基础公式：$\text{FOB 单价 (USD)} = \frac{\text{基础成本 (RMB)} + 20.00\,\text{元}}{7.20\,\text{汇率}}$
  - 5-Pack 调价规则：所有 **5 颗装 (5-Pack)** 套装报价额外叠加 **+$1.00 USD**（如 $3.70 \to \$4.70$, $4.12 \to \$5.12$, $3.88 \to \$4.88$）。
- **图片双轮全匹配**：
  - 每一行 `Product Photos` 均同框匹配展示对应的 **【充电器实拍图】 + 【对应型号 2PCS/5PCS 纸卡实物实拍图】**。
- **VIP 欢迎通告与商业条款**：
  - 顶部嵌入 `VIP ACCESS VERIFIED ✓` 专属欢迎通告。
  - 公司抬头：`VSZAPOWER Limited (微贊控股（香港）有限公司)`
  - 联系邮箱：`666lvdeshui@gmail.com`
  - 离岸港口：`FOB Shenzhen / Hong Kong / Ningbo`
  - 右上角支持 `🖨️ Print / Save as PDF` 一键导出打印。

### 4. 自动跳转与线索实时同步
- **自动弹窗跳转**：当买家在官网填写表单发送采购询盘，或点击索取 `Download 2026 Wholesale Catalog (PDF)` 时：
  - 系统自动在后台捕捉线索发至邮箱 `666lvdeshui@gmail.com`，并存入后台系统。
  - 同步自动在新标签页弹窗打开官方英文 B2B 报价单 [VSZAPOWER_2026_Official_Wholesale_Quotation.html](https://www.vszapower.com/VSZAPOWER_2026_Official_Wholesale_Quotation.html)。
- **后台管理系统同步**：访问 [https://www.vszapower.com/admin](https://www.vszapower.com/admin)，可在【询盘线索管理】模块中实时查看买家的 Email、Company、下载时间及详细需求。

### 5. 全站 14 种语言国际化 (`lib/i18n.ts` & `lib/dynamicI18n.ts`)
- 支持 `zh-CN`, `en`, `de`, `ja`, `es`, `ko`, `he`, `ar`, `fr`, `pt`, `ru`, `vi`, `zh-HK`, `zh-TW` 14 国语言一键同频无缝切换。

### 6. 高对比度 Theme 主题转换系统 (`app/globals.css`)
- 扫清硬编码白色文字，统一使用 `color: 'var(--text-main)'` 变量。暗色模式下为白字（`#f8fafc`），亮色模式下自动转换为石墨黑（`#0f172a`）。

---

## 三、 数据库与核心数据结构

### 1. 询盘线索模型 (`InquiryItem`)
```typescript
interface InquiryItem {
  id: string;
  name: string;
  contact: string; // 买家邮箱 / 电话
  company?: string; // 公司名称
  country?: string; // 所属国家 / 线索类型
  product?: string; // 意向产品 / 资料名称
  message?: string; // 详细留言
  created_at: string;
  status: 'new' | 'contacted' | 'resolved';
}
```

---

## 四、 部署与运行说明

1. **类型检查与构建**：
   ```bash
   npx tsc --noEmit
   npm run build
   ```
2. **Git 版本控制与 Vercel 部署**：
   ```bash
   git add .
   git commit -m "docs: complete current B2B technical docs and lead workflow sync"
   git push origin main
   npx vercel --prod
   ```

---

*文档完结*
