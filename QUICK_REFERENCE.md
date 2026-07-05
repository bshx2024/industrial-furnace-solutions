# 越南语翻译快速参考卡 | Quick Reference Card
## B2B 工业网站 - 加热炉优化解决方案

---

## 📋 一键命令 | Quick Commands

```bash
# 1. 运行自动翻译脚本
python translate_to_vietnamese.py

# 2. 验证翻译质量
python validate_translation.py

# 3. 修复路径（如果需要）
python batch_fix_paths.py
```

---

## 🔑 核心术语速查表 | Core Terms Cheat Sheet

### 🏭 产品与服务
```
Reheating Furnace          → Lò nung lại
Zero CAPEX                 → Zero CAPEX (保持原文)
Energy Steward Model       → Mô hình Quản gia năng lượng
Fuel Saving                → Tiết kiệm nhiên liệu
Walking Beam Furnace       → Lò dầm bước
Walking Hearth Furnace     → Lò đáy bước
Steel Mill                 → Nhà máy thép
```

### 🔧 核心技术
```
Full-fiber Furnace Roof    → Mái lò toàn sợi gốm
Intelligent Combustion     → Hệ thống đốt thông minh
Energy-saving Coating      → Lớp phủ tiết kiệm năng lượng
Digital Twin Technology    → Công nghệ Bản sao số
Temperature Control        → Kiểm soát nhiệt độ
Oxidation Loss             → Hao hụt oxy hóa
Material Traceability      → Truy xuất vật liệu
```

### 📊 性能指标
```
Fuel Consumption           → Tiêu thụ nhiên liệu
Annual Production          → Sản lượng hàng năm
Estimated Savings          → Tiết kiệm ước tính
Carbon Offset              → Giảm thải carbon
Typical Fuel Saving        → Tiết kiệm nhiên liệu điển hình
CO2 Reduction              → Giảm CO2
Zone Temperature           → Nhiệt độ vùng
Flue Oxygen                → Oxy khí thải
```

### 🎯 UI 元素
```
Home                       → Trang chủ
Solutions                  → Giải pháp
Case Studies               → Dự án tiêu biểu
About                      → Giới thiệu
Free Assessment            → Đánh giá miễn phí
Get Free ROI Audit         → Nhận Đánh giá ROI Miễn phí
View Case Studies          → Xem Dự án Tiêu biểu
Calculate My Full ROI      → Tính toán ROI đầy đủ
Learn More                 → Tìm hiểu thêm
```

### ✅ 认证标准
```
CISA T80                   → CISA T80 (保持原文)
CISA T80 Verified          → Chứng nhận CISA T80
Extreme Efficiency Tech    → Công nghệ hiệu suất cực cao
Performance-based Model    → Mô hình dựa trên hiệu suất
```

---

## 🔗 路径引用规则 | Path Reference Rules

### ✅ 正确示例
```html
<!-- 英文版 (build/client/index.html) -->
<img src="./tech-roof.png" />
<a href="./solutions/index.html">Solutions</a>
<a href="./vi/index.html">Tiếng Việt</a>

<!-- 越南语版 (build/client/vi/index.html) -->
<img src="../tech-roof.png" />
<a href="solutions/">Giải pháp</a>
<a href="../index.html">English</a>
```

### ❌ 错误示例
```html
<!-- 越南语版中的错误 -->
<img src="./tech-roof.png" />        ❌ 缺少 ../
<a href="./solutions/">Giải pháp</a> ❌ 应该去掉 ./
<a href="./vi/">Tiếng Việt</a>       ❌ 不应链接到自己
```

---

## 📝 HTML 元数据模板 | HTML Meta Template

```html
<!-- 越南语版本 HEAD 标签 -->
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- SEO Meta -->
  <title>Hiệu suất Lò nung lại Zero CAPEX | ecoreheating.com</title>
  <meta name="description" content="Tối ưu hóa lò nung lại Zero CAPEX. Giảm tiêu thụ nhiên liệu 7-15%..." />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.ecoreheating.com/vi/" />
  
  <!-- Hreflang -->
  <link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
  <link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
  <link rel="alternate" hreflang="x-default" href="https://www.ecoreheating.com/" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Hiệu suất Lò nung lại Zero CAPEX" />
  <meta property="og:description" content="Tối ưu hóa lò nung lại Zero CAPEX..." />
  <meta property="og:url" content="https://www.ecoreheating.com/vi/" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:locale:alternate" content="en_US" />
  
  <!-- Resources (注意 ../ 前缀) -->
  <link rel="preload" as="image" href="../tech-roof.png" />
  <link rel="stylesheet" href="../assets/root-D_QZOxWh.css" />
</head>
```

---

## ⚡ 常见问题快速解决 | Quick Troubleshooting

### 问题 1: 图片不显示
```bash
# 检查路径
❌ src="./tech-roof.png"
✅ src="../tech-roof.png"
```

### 问题 2: 导航链接失效
```bash
# 检查相对路径
❌ href="./solutions/index.html"  # 英文版路径
✅ href="solutions/"               # 越南语版路径
```

### 问题 3: 语言切换无效
```html
<!-- 英文版 -->
<a href="./vi/index.html">Tiếng Việt</a>

<!-- 越南语版 -->
<a href="../index.html">English</a>
```

### 问题 4: 术语翻译不一致
```bash
# 统一使用标准翻译
❌ "Lò hâm nóng lại"
✅ "Lò nung lại"

❌ "Tiết kiệm fuel"
✅ "Tiết kiệm nhiên liệu"
```

---

## 📂 文件结构检查清单 | File Structure Checklist

```
build/client/
├── index.html ✓
├── about/
│   └── index.html ✓
├── solutions/
│   └── index.html ✓
├── hero-cases/
│   └── index.html ✓
├── assets/ ✓
│   ├── *.js
│   └── *.css
├── *.png ✓
├── *.mp4 ✓
└── vi/
    ├── index.html ✓ (翻译 + 路径修复)
    ├── about/
    │   └── index.html ✓
    ├── solutions/
    │   └── index.html ✓
    └── hero-cases/
        └── index.html ✓
```

---

## ✨ 质量检查点 | Quality Checkpoints

### 翻译前 (Pre-Translation)
- [ ] 备份原始文件
- [ ] 创建 /vi/ 目录结构
- [ ] 复制所有 HTML 文件到 /vi/

### 翻译中 (During Translation)
- [ ] 使用统一术语表
- [ ] 保留品牌名称（EcoReheating, CISA T80）
- [ ] 保留技术单位（Mtpa, °C, %）
- [ ] 保留客户名称（DANIELI, AKS STEEL 等）

### 翻译后 (Post-Translation)
- [ ] 所有资源路径使用 `../` 前缀
- [ ] HTML lang="vi"
- [ ] 导航链接功能正常
- [ ] Meta 标签完整
- [ ] 语言切换按钮正确
- [ ] 运行 validate_translation.py 验证

---

## 🎨 数字格式规范 | Number Format Standards

```
金额：     $3,850,000/năm  (美元符号在前)
百分比：   7-15%            (范围用连字符)
温度：     1,150-1,250 °C  (空格 + °C)
产量：     2.5 Mtpa        (保持英文单位)
吨数：     130,000 t/năm   (t 表示吨)
```

---

## 🌐 SEO 优化提示 | SEO Tips

```html
<!-- Sitemap 条目 -->
<url>
  <loc>https://www.ecoreheating.com/vi/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
  <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

---

## 📈 推广追踪与 UTM 参数规范 | UTM Tracking Standards

海外社媒（如 LinkedIn）或邮件推广博文时，务必使用以下 UTM 规范以防止流量被 GA4 错误地归入 "Direct" 访问：
- **LinkedIn 推广**：`?utm_source=linkedin&utm_medium=social&utm_campaign={slug}`
- **邮件/Newsletter 推广**：`?utm_source=newsletter&utm_medium=email&utm_campaign={slug}`
- **Twitter/X 推广**：`?utm_source=twitter&utm_medium=social&utm_campaign={slug}`

---

## 📞 资源链接 | Resources

- **完整翻译指南**: `VIETNAMESE_TRANSLATION_GUIDE.md`
- **自动翻译脚本**: `translate_to_vietnamese.py`
- **质量验证脚本**: `validate_translation.py`
- **路径修复脚本**: `batch_fix_paths.py`

---

**版本**: v1.0 | **日期**: 2026-01-29 | **团队**: EcoReheating Dev
