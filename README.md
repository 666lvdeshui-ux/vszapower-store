# VSZAPOWER - Smart Coin Cell Charger Store & Battery Academy

《纽扣电池充电器全渠道运营方案》独立站落地代码库。

全站基于 **Next.js 14 (App Router)** + **Supabase (PostgreSQL / CMS)** + **Vercel (免费托管)** 构建，极致优化 SEO / GEO / TikTok 转化。

---

## 快速连通三部曲 (GitHub + Supabase + Vercel)

### 第一步：连接 Supabase 数据库 (只需 1 分钟)

1. 登录您的 [Supabase 控制台](https://supabase.com/dashboard) 并创建一个新项目（比如命名为 `vszapower-store`）。
2. 打开左侧菜单 **SQL Editor** -> **New query**。
3. 将项目目录中的 `supabase_schema.sql` 文件的完整内容**复制粘贴并运行**（Click "Run"）。
   - 这会自动建立 `posts`, `products`, `battery_compatibilities` 3 张数据表，并注入预置的产品与 Battery Academy 科普文章数据！
4. 前往 Supabase **Project Settings** -> **API**，复制以下两项：
   - `Project URL`
   - `anon / public API key`

---

### 第二步：推送代码到 GitHub 仓库

1. 打开终端，切换到本项目目录：
   ```bash
   cd /Users/xiehui/.gemini/antigravity-ide/scratch/vszapower
   ```
2. 初始化并提交 Git：
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for vszapower store"
   ```
3. 在 [GitHub.com](https://github.com/new) 创建一个新的公开或私有仓库（例如 `vszapower-store`），然后运行：
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vszapower-store.git
   git branch -M main
   git push -u origin main
   ```

---

### 第三步：一键发布到 Vercel 免费版

1. 登录 [Vercel 控制台](https://vercel.com/dashboard) 点击 **"Add New..."** -> **"Project"**。
2. 选中您刚刚推送的 **`vszapower-store`** GitHub 仓库并点击 **Import**。
3. 在 **Environment Variables** 展开框中添加以下环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`: (填写第一步复制的 Supabase Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (填写第一步复制的 Supabase anon key)
4. 点击 **Deploy**！ 约 45 秒后，您的全功能独立站即正式上线，支持自动分配 `.vercel.app` 免费域名和免费 SSL 证书。

---

## 本地开发调试 (Local Development)

在本地测试运行：
```bash
npm install
npm run dev
```
打开浏览器访问 `http://localhost:3000` 即可实时预览。

---

## 文章/产品更新与维护 (Content Hub / Blog Updates)

- **发布新文章**：直接在 Supabase Dashboard 的 `posts` 表中新增一行，或者使用 Supabase 的 Table Editor 修改文章内容。独立站会自动按需更新！
- **更新产品与价格**：修改 Supabase 的 `products` 表。
