# 越南语版本实施指南 - Industrial Furnace Solutions

## 📋 目录
1. [HTML 结构调整方案](#html-结构调整方案)
2. [实施步骤](#实施步骤)
3. [翻译要求与规范](#翻译要求与规范)
4. [专业术语对照表](#专业术语对照表)

---

## HTML 结构调整方案

### 方案 A：动态路由方案（推荐）✅

**优点：**
- 代码复用性高，只需修改一次组件
- 易于维护和更新
- 自动支持语言切换
- SEO 友好

**缺点：**
- 需要添加语言上下文管理
- 初始设置较复杂

### 方案 B：静态文件复制方案

**优点：**
- 简单直接，易于理解
- 不需要复杂的状态管理
- 适合小型网站

**缺点：**
- 代码重复，维护成本高
- 更新内容需要修改两套文件

---

## 实施步骤

### 第一步：修改路由配置

#### 1.1 更新 `app/routes.ts`

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // 英语路由（默认）
    index("pages/Home.tsx"),
    route("solutions", "pages/Solutions.tsx"),
    route("hero-cases", "pages/HeroCases.tsx"),
    route("case-studies", "pages/CaseStudies.tsx"),
    route("about", "pages/AboutContact.tsx"),
    
    // 越南语路由
    route("vi", "pages/vi/Home.tsx"),
    route("vi/solutions", "pages/vi/Solutions.tsx"),
    route("vi/hero-cases", "pages/vi/HeroCases.tsx"),
    route("vi/case-studies", "pages/vi/CaseStudies.tsx"),
    route("vi/about", "pages/vi/AboutContact.tsx"),
] satisfies RouteConfig;
```

#### 1.2 更新 `react-router.config.ts`

```typescript
import type { Config } from "@react-router/dev/config";

export default {
    ssr: false, // Set to false for full static site generation (SSG)
    async prerender() {
        return [
            // 英语页面
            "/", 
            "/solutions", 
            "/hero-cases", 
            "/case-studies", 
            "/about",
            
            // 越南语页面
            "/vi",
            "/vi/solutions",
            "/vi/hero-cases",
            "/vi/case-studies",
            "/vi/about"
        ];
    },
} satisfies Config;
```

### 第二步：创建语言上下文

#### 2.1 创建 `app/context/LanguageContext.tsx`

```typescript
import { createContext, useContext } from "react";

export type Language = "en" | "vi";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
```

### 第三步：创建翻译文件结构

#### 3.1 创建 `app/locales/en.ts`（英语翻译）

```typescript
export const en = {
    nav: {
        home: "Home",
        solutions: "Solutions",
        heroCases: "Hero Cases",
        caseStudies: "Case Studies",
        about: "About & Contact"
    },
    hero: {
        title: "Zero-CAPEX Reheating Furnace Efficiency Solutions",
        subtitle: "Energy Steward Business Model",
        description: "Pay only for saved energy. We invest, install, and guarantee 7-15% fuel consumption reduction for walking beam & walking hearth furnaces.",
        cta: "Calculate Your Savings"
    },
    // ... 更多翻译内容
};
```

#### 3.2 创建 `app/locales/vi.ts`（越南语翻译）

```typescript
export const vi = {
    nav: {
        home: "Trang chủ",
        solutions: "Giải pháp",
        heroCases: "Dự án tiêu biểu",
        caseStudies: "Nghiên cứu tình huống",
        about: "Giới thiệu & Liên hệ"
    },
    hero: {
        title: "Giải pháp tối ưu hóa lò gia nhiệt không cần đầu tư vốn ban đầu",
        subtitle: "Mô hình quản lý năng lượng",
        description: "Chỉ thanh toán cho năng lượng tiết kiệm được. Chúng tôi đầu tư, lắp đặt và đảm bảo giảm 7-15% tiêu thụ nhiên liệu cho lò walking beam và walking hearth.",
        cta: "Tính toán tiết kiệm của bạn"
    },
    // ... 更多翻译内容
};
```

### 第四步：修改组件以支持双语

#### 4.1 更新 `app/root.tsx`

```typescript
import { useLocation } from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const isVietnamese = location.pathname.startsWith("/vi");
    const lang = isVietnamese ? "vi" : "en";

    return (
        <html lang={lang}>
            <head>
                {/* ... 其他 head 内容 */}
            </head>
            <body className="antialiased">
                <AppLayout>
                    {children}
                </AppLayout>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
```

### 第五步：创建越南语页面

#### 5.1 目录结构

```
app/pages/
├── Home.tsx              # 英语首页
├── Solutions.tsx         # 英语解决方案
├── HeroCases.tsx         # 英语案例
├── CaseStudies.tsx       # 英语研究
├── AboutContact.tsx      # 英语关于
└── vi/
    ├── Home.tsx          # 越南语首页
    ├── Solutions.tsx     # 越南语解决方案
    ├── HeroCases.tsx     # 越南语案例
    ├── CaseStudies.tsx   # 越南语研究
    └── AboutContact.tsx  # 越南语关于
```

---

## 翻译要求与规范

### 翻译原则

1. **保留所有 HTML 标签**：不要修改或删除任何 HTML 标签
2. **保持结构一致**：确保翻译后的 HTML 结构与原文完全相同
3. **术语准确性**：使用专业的工业术语
4. **格式保持**：保留原文的空格、换行符和缩进
5. **数字和单位**：保持英文原样（如 7-15%, kWh, °C）
6. **品牌名称**：保持英文原样（如 EcoReheating, Energy Steward）

### 翻译流程

1. 复制英语 HTML 内容
2. 仅翻译标签之间的文本内容
3. 保留所有 className、id 等属性
4. 保留图片路径和链接
5. 检查译文的专业性和准确性

### 示例翻译

#### 英语版本：
```html
<h1 className="text-5xl font-bold">
    Zero-CAPEX Reheating Furnace Efficiency Solutions
</h1>
<p className="text-xl text-gray-300">
    Pay only for saved energy. We invest, install, and guarantee 
    7-15% fuel consumption reduction.
</p>
```

#### 越南语版本：
```html
<h1 className="text-5xl font-bold">
    Giải pháp tối ưu hóa lò gia nhiệt không cần đầu tư vốn ban đầu
</h1>
<p className="text-xl text-gray-300">
    Chỉ thanh toán cho năng lượng tiết kiệm được. Chúng tôi đầu tư, 
    lắp đặt và đảm bảo giảm 7-15% tiêu thụ nhiên liệu.
</p>
```

---

## 专业术语对照表

### 核心业务术语

| 英语 | 越南语 | 说明 |
|------|--------|------|
| Reheating Furnace | Lò gia nhiệt | 加热炉 |
| Walking Beam Furnace | Lò kiểu walking beam | 步进梁式加热炉 |
| Walking Hearth Furnace | Lò kiểu walking hearth | 步进底式加热炉 |
| Energy Steward | Quản lý năng lượng | 能源管家（保留英文品牌名） |
| Zero-CAPEX | Không cần đầu tư vốn ban đầu | 零资本支出 |
| Fuel Consumption | Tiêu thụ nhiên liệu | 燃料消耗 |
| Energy Efficiency | Hiệu suất năng lượng | 能源效率 |
| Combustion System | Hệ thống đốt cháy | 燃烧系统 |

### 技术术语

| 英语 | 越南语 | 说明 |
|------|--------|------|
| AI-Driven Optimization | Tối ưu hóa bằng AI | AI驱动优化 |
| Digital Control System | Hệ thống điều khiển số | 数字控制系统 |
| Ceramic Fiber Coating | Lớp phủ sợi gốm | 陶瓷纤维涂层 |
| Heat Recovery | Thu hồi nhiệt | 热回收 |
| Temperature Control | Kiểm soát nhiệt độ | 温度控制 |
| Thermal Efficiency | Hiệu suất nhiệt | 热效率 |
| NOx Emissions | Khí thải NOx | 氮氧化物排放 |
| Flue Gas | Khí thải lò | 烟气 |

### 业务模式术语

| 英语 | 越南语 | 说明 |
|------|--------|------|
| Return on Investment (ROI) | Lợi tức đầu tư (ROI) | 投资回报率 |
| Shared Savings Model | Mô hình chia sẻ tiết kiệm | 节能分享模式 |
| Performance Guarantee | Đảm bảo hiệu suất | 性能保证 |
| Maintenance-Free | Không cần bảo trì | 免维护 |
| Turnkey Solution | Giải pháp trọn gói | 交钥匙解决方案 |
| Energy Management | Quản lý năng lượng | 能源管理 |

### 行业相关术语

| 英语 | 越南语 | 说明 |
|------|--------|------|
| Steel Mill | Nhà máy thép | 钢厂 |
| Metallurgy | Luyện kim | 冶金 |
| Hot Rolling | Cán nóng | 热轧 |
| Billet | Phôi thép | 钢坯 |
| Slab | Tấm phôi | 板坯 |
| CISA Certified | Chứng nhận CISA | CISA认证 |
| T80 Standard | Tiêu chuẩn T80 | T80标准 |

### 认证和标准

| 英语 | 越南语 | 说明 |
|------|--------|------|
| China Iron & Steel Association | Hiệp hội Thép Trung Quốc | 中国钢铁工业协会 |
| Energy Efficiency Certificate | Chứng chỉ hiệu suất năng lượng | 能效证书 |
| ISO Certification | Chứng nhận ISO | ISO认证 |
| Quality Assurance | Đảm bảo chất lượng | 质量保证 |

### 客户和案例

| 英语 | 越南语 | 说明 |
|------|--------|------|
| Case Study | Nghiên cứu tình huống | 案例研究 |
| Success Story | Câu chuyện thành công | 成功案例 |
| Client Testimonial | Đánh giá của khách hàng | 客户评价 |
| Project Portfolio | Danh mục dự án | 项目组合 |
| Hero Cases | Dự án tiêu biểu | 典型案例 |

### 网站通用术语

| 英语 | 越南语 | 说明 |
|------|--------|------|
| Home | Trang chủ | 首页 |
| Solutions | Giải pháp | 解决方案 |
| About Us | Giới thiệu | 关于我们 |
| Contact | Liên hệ | 联系 |
| Learn More | Tìm hiểu thêm | 了解更多 |
| Get Started | Bắt đầu | 开始 |
| Download | Tải xuống | 下载 |
| Request Quote | Yêu cầu báo giá | 请求报价 |

---

## 资源路径调整

### 相对路径处理

越南语版本在 `/vi/` 子目录中，需要调整资源路径：

**英语版本（根目录）：**
```html
<img src="/images/hero-bg.png" alt="Hero Background">
<link rel="stylesheet" href="/styles/main.css">
<script src="/scripts/app.js"></script>
```

**越南语版本（/vi/ 子目录）：**
```html
<img src="/images/hero-bg.png" alt="Hero Background">  <!-- 保持绝对路径 -->
<link rel="stylesheet" href="/styles/main.css">       <!-- 保持绝对路径 -->
<script src="/scripts/app.js"></script>               <!-- 保持绝对路径 -->
```

**注意：** 由于项目使用绝对路径（以 `/` 开头），无需修改资源路径。如果使用相对路径，需要添加 `../`。

### 语言切换链接

```html
<!-- 英语页面中的语言切换 -->
<a href="/vi/">Tiếng Việt</a>

<!-- 越南语页面中的语言切换 -->
<a href="/">English</a>
```

---

## 构建和部署

### 构建命令

```bash
# 构建静态网站
npm run build

# 预览构建结果
npm run preview
```

### 构建输出结构

```
build/client/
├── index.html              # 英语首页
├── solutions/
│   └── index.html
├── hero-cases/
│   └── index.html
├── case-studies/
│   └── index.html
├── about/
│   └── index.html
└── vi/
    ├── index.html          # 越南语首页
    ├── solutions/
    │   └── index.html
    ├── hero-cases/
    │   └── index.html
    ├── case-studies/
    │   └── index.html
    └── about/
        └── index.html
```

---

## SEO 优化建议

### 1. Hreflang 标签

在每个页面的 `<head>` 中添加：

```html
<!-- 英语页面 -->
<link rel="alternate" hreflang="en" href="https://yourdomain.com/" />
<link rel="alternate" hreflang="vi" href="https://yourdomain.com/vi/" />

<!-- 越南语页面 -->
<link rel="alternate" hreflang="en" href="https://yourdomain.com/" />
<link rel="alternate" hreflang="vi" href="https://yourdomain.com/vi/" />
```

### 2. Meta 标签本地化

```html
<!-- 英语版本 -->
<meta name="description" content="Zero-CAPEX reheating furnace efficiency solutions for steel mills">
<meta property="og:locale" content="en_US">

<!-- 越南语版本 -->
<meta name="description" content="Giải pháp tối ưu hóa lò gia nhiệt không cần đầu tư vốn ban đầu cho nhà máy thép">
<meta property="og:locale" content="vi_VN">
```

### 3. 结构化数据（JSON-LD）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EcoReheating",
  "url": "https://yourdomain.com",
  "inLanguage": ["en", "vi"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yourdomain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 测试清单

- [ ] 所有越南语页面可以正常访问
- [ ] 语言切换功能正常工作
- [ ] 图片和资源正确加载
- [ ] 链接指向正确的页面
- [ ] Meta 标签正确设置
- [ ] 移动端响应式正常
- [ ] SEO 标签完整
- [ ] 翻译准确无误
- [ ] 专业术语使用正确
- [ ] HTML 结构保持一致

---

## 常见问题

### Q1: 如何处理动态内容？
A: 使用翻译函数和语言上下文，在运行时切换语言。

### Q2: 图片中的文字需要翻译吗？
A: 如果图片包含重要文字，建议创建越南语版本的图片。

### Q3: 如何处理第三方脚本？
A: 保持第三方脚本不变，如 Google Analytics、EmailJS 等。

### Q4: 日期和时间格式如何处理？
A: 使用 `Intl.DateTimeFormat` API 根据语言自动格式化。

```typescript
const date = new Date();
const formatter = new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-US');
const formattedDate = formatter.format(date);
```

---

## 下一步行动

1. [ ] 决定使用方案 A（动态路由）或方案 B（静态复制）
2. [ ] 创建翻译文件和术语表
3. [ ] 修改路由配置
4. [ ] 创建越南语页面
5. [ ] 测试所有功能
6. [ ] 部署上线

---

## 联系支持

如果在实施过程中遇到问题，请参考：
- React Router v7 文档：https://reactrouter.com/
- 项目 GitHub 仓库
- 技术支持邮箱

---

**文档版本：** 1.0  
**最后更新：** 2026-01-29  
**适用项目：** Industrial Furnace Solutions (EcoReheating)
