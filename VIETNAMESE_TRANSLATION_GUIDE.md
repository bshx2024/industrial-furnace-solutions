# 越南语网站翻译指南 | Vietnamese Translation Guide

## 📂 目录结构 | Directory Structure

```
build/client/
├── index.html              # 英文主页
├── about/
│   └── index.html
├── solutions/
│   └── index.html
├── hero-cases/
│   └── index.html
└── vi/                     # 越南语版本目录
    ├── index.html          # 越南语主页
    ├── about/
    │   └── index.html
    ├── solutions/
    │   └── index.html
    └── hero-cases/
        └── index.html
```

---

## 🔧 第一部分：HTML 结构调整

### 1. 路径引用规则

#### ✅ 资源文件路径（图片、视频、CSS、JS）
```html
<!-- 英文版 (build/client/*.html) -->
<img src="./tech-roof.png" />
<link href="./assets/root-D_QZOxWh.css" />
<video poster="./hero-bg.png">
  <source src="./hero-bg_x264.mp4" />
</video>

<!-- 越南语版 (build/client/vi/*.html) -->
<img src="../tech-roof.png" />
<link href="../assets/root-D_QZOxWh.css" />
<video poster="../hero-bg.png">
  <source src="../hero-bg_x264.mp4" />
</video>
```

#### ✅ 页面导航链接
```html
<!-- 英文版导航 -->
<a href="./index.html">Home</a>
<a href="./solutions/index.html">Solutions</a>
<a href="./hero-cases/index.html">Case Studies</a>
<a href="./about/index.html">About</a>
<a href="./vi/index.html">Tiếng Việt</a>  <!-- 切换到越南语 -->

<!-- 越南语版导航 -->
<a href="./">Trang chủ</a>
<a href="solutions/">Giải pháp</a>
<a href="hero-cases/">Dự án tiêu biểu</a>
<a href="about/">Giới thiệu</a>
<a href="../index.html">English</a>  <!-- 切换回英文 -->
```

### 2. HTML 元数据调整

```html
<!-- 语言标签 -->
<html lang="vi">  <!-- 英文版用 lang="en" -->

<!-- SEO Meta 标签 -->
<title>Hiệu suất Lò nung lại Zero CAPEX | ecoreheating.com</title>
<meta name="description" content="Tối ưu hóa lò nung lại Zero CAPEX. Giảm tiêu thụ nhiên liệu 7-15% với công nghệ được xác thực chuẩn CISA T80 và mô hình Quản gia năng lượng để đảm bảo tiết kiệm." />

<!-- Canonical URL -->
<link rel="canonical" href="https://www.ecoreheating.com/vi/" />

<!-- Open Graph 标签 -->
<meta property="og:title" content="Hiệu suất Lò nung lại Zero CAPEX | ecoreheating.com" />
<meta property="og:description" content="Tối ưu hóa lò nung lại Zero CAPEX..." />
<meta property="og:url" content="https://www.ecoreheating.com/vi/" />
<meta property="og:locale" content="vi_VN" />
<meta property="og:locale:alternate" content="en_US" />
```

---

## 📚 第二部分：专业术语翻译对照表

### A. 核心业务术语 | Core Business Terms

| 英文 | 越南语 | 拼音/注音 | 说明 |
|------|--------|-----------|------|
| **Reheating Furnace** | Lò nung lại | Lò-nung-lại | 加热炉/再加热炉 |
| **Zero CAPEX** | Zero CAPEX | - | 零资本支出（保持原文） |
| **Energy Steward** | Quản gia năng lượng | Quan-gia-năng-lượng | 能源管家模式 |
| **Fuel Consumption** | Tiêu thụ nhiên liệu | Tiêu-thụ-nhiên-liệu | 燃料消耗 |
| **Fuel Saving** | Tiết kiệm nhiên liệu | Tiết-kiệm-nhiên-liệu | 节能/燃料节约 |
| **Walking Beam Furnace** | Lò dầm bước | Lò-dầm-bước | 步进梁式加热炉 |
| **Walking Hearth Furnace** | Lò đáy bước | Lò-đáy-bước | 步进底式加热炉 |
| **Steel Mill** | Nhà máy thép | Nhà-máy-thép | 钢铁厂 |
| **Long Steel / Flat Steel** | Thép dài / Thép phẳng | - | 长材/板材 |
| **Performance-based Model** | Mô hình dựa trên hiệu suất | - | 绩效付费模式 |

### B. 技术术语 | Technical Terms

| 英文 | 越南语 | 说明 |
|------|--------|------|
| **Full-fiber Furnace Roof** | Mái lò toàn sợi gốm | 全纤维炉顶 |
| **Intelligent Combustion System** | Hệ thống đốt thông minh | 智能燃烧系统 |
| **High-temperature Energy-saving Coating** | Lớp phủ tiết kiệm năng lượng nhiệt độ cao | 高温节能涂层 |
| **Digital Twin Technology** | Công nghệ Bản sao số | 数字孪生技术 |
| **AI-driven Optimization** | Tối ưu hóa dựa trên AI | AI驱动优化 |
| **Material Traceability** | Truy xuất vật liệu | 材料可追溯性 |
| **Temperature Control** | Kiểm soát nhiệt độ | 温度控制 |
| **Narrow Window Control** | Kiểm soát cửa sổ hẹp | 窄窗口控制 |
| **Oxidation Loss** | Hao hụt oxy hóa | 氧化损失 |
| **Scale Loss Reduction** | Giảm hao hụt vảy oxit | 减少氧化铁皮损失 |
| **Surface Quality** | Chất lượng bề mặt | 表面质量 |
| **Thermal Efficiency** | Hiệu suất nhiệt | 热效率 |
| **Flue Gas** | Khí thải lò | 烟气 |
| **Oxygen Content** | Hàm lượng oxy | 含氧量 |

### C. 认证与标准 | Certifications & Standards

| 英文 | 越南语 | 说明 |
|------|--------|------|
| **CISA T80** | CISA T80 | 中国钢铁工业协会T80认证（保持原文） |
| **CISA T80 Verified** | Chứng nhận CISA T80 | T80认证/验证 |
| **Extreme Efficiency Technologies** | Công nghệ hiệu suất cực cao | 极致能效技术 |
| **Listed Technology** | Công nghệ được liệt kê | 入选技术 |
| **Industry Benchmark** | Tiêu chuẩn ngành | 行业标杆 |
| **National Standard** | Tiêu chuẩn quốc gia | 国家标准 |

### D. UI/导航元素 | UI/Navigation Elements

| 英文 | 越南语 | 位置 |
|------|--------|------|
| **Home** | Trang chủ | 导航菜单 |
| **Solutions** | Giải pháp | 导航菜单 |
| **Case Studies** | Dự án tiêu biểu | 导航菜单 |
| **About** | Giới thiệu | 导航菜单 |
| **Contact** | Liên hệ | 导航菜单 |
| **Free Assessment** | Đánh giá miễn phí | CTA按钮 |
| **Get Free ROI Audit** | Nhận Đánh giá ROI Miễn phí | CTA按钮 |
| **Calculate My Full ROI** | Tính toán ROI đầy đủ | CTA按钮 |
| **View Case Studies** | Xem Dự án Tiêu biểu | 链接按钮 |
| **Learn More** | Tìm hiểu thêm | 链接按钮 |
| **Download PDF** | Tải PDF | 下载按钮 |
| **Request Quote** | Yêu cầu báo giá | 询价按钮 |

### E. 数据与指标 | Data & Metrics

| 英文 | 越南语 | 示例 |
|------|--------|------|
| **Typical Fuel Saving** | Tiết kiệm nhiên liệu điển hình | 7-15% |
| **CO2 Reduction (Est.)** | Giảm CO2 (Ước tính) | 7-15% |
| **Annual Production** | Sản lượng hàng năm | 2.5 Mtpa |
| **Annual Value** | Giá trị hàng năm | - |
| **Estimated Annual Savings** | Tiết kiệm ước tính/năm | $3,850,000/năm |
| **Carbon Offset** | Giảm thải carbon | - |
| **Carbon Credits Equiv.** | Tín chỉ Carbon tương đương | 130,000 t/năm |
| **Zone Temperature** | Nhiệt độ vùng | 1,150-1,250 °C |
| **Flue Oxygen** | Oxy khí thải | 1.8-2.5% |
| **Control Status** | Trạng thái điều khiển | Optimized / Tối ưu hóa |

### F. 公司与客户名称 | Company & Client Names

| 英文 | 越南语 | 说明 |
|------|--------|------|
| **EcoReheating** | EcoReheating | 品牌名称（保持原文） |
| **Industrial Solutions** | Giải pháp công nghiệp | 副标题 |
| **South Technology** | South Technology | 母公司名称（保持原文） |
| **Trusted by Global Steel Leaders** | Đối tác thép toàn cầu tin dùng | 客户背书 |

**客户名称均保持原文**：
- DANIELI
- AKS STEEL
- FANGDA GROUP
- KSRM
- JINGYE GROUP
- JIANLONG STEEL
- JINNAN STEEL

---

## 🎯 翻译要点与风格指南

### 1. **保持原文的术语**
以下术语建议保持英文原文：
- Zero CAPEX（行业通用术语）
- ROI（投资回报率）
- CISA T80（认证名称）
- AI（人工智能）
- Mtpa（百万吨/年）

### 2. **技术精准性**
- "Reheating Furnace" 必须翻译为 **"Lò nung lại"**，而非简单的 "Lò nung"
- "Walking Beam" 翻译为 **"Dầm bước"**，保持技术准确性
- "Oxidation Loss" 翻译为 **"Hao hụt oxy hóa"**，而非 "Mất oxy hóa"

### 3. **语气风格**
- **专业正式**：使用工业术语，避免口语化
- **简洁有力**：CTA按钮用短语，如 "Đánh giá miễn phí"
- **数据驱动**：保留所有数字和百分比原样

### 4. **格式一致性**
```html
<!-- 单位保持英文 -->
2.5 Mtpa （而非 2,5 triệu tấn）
7-15% （而非 7% đến 15%）
$3,850,000/năm （美元符号在前）
1,150-1,250 °C （温度符号保持）
```

---

## 🚀 实施步骤 | Implementation Steps

### Step 1: 准备文件
```bash
# 复制英文 HTML 到越南语目录
cp build/client/index.html build/client/vi/index.html
cp -r build/client/about build/client/vi/
cp -r build/client/solutions build/client/vi/
cp -r build/client/hero-cases build/client/vi/
```

### Step 2: 运行路径修复脚本
```bash
python batch_fix_paths.py
```

### Step 3: 翻译内容
使用上述术语表，逐一替换英文内容为越南语。

### Step 4: 验证检查清单
- [ ] 所有资源路径正确（`../` 前缀）
- [ ] 导航链接功能正常
- [ ] 语言切换按钮工作正常
- [ ] Meta 标签正确设置
- [ ] 所有技术术语使用统一翻译
- [ ] 数字和单位格式一致
- [ ] 客户名称保持原文

---

## 📋 快速替换映射表（复制粘贴使用）

```javascript
// JavaScript 批量替换映射
const translations = {
  // 导航
  "Home": "Trang chủ",
  "Solutions": "Giải pháp",
  "Case Studies": "Dự án tiêu biểu",
  "About": "Giới thiệu",
  "Contact": "Liên hệ",
  
  // CTA
  "Free Assessment": "Đánh giá miễn phí",
  "Get Free ROI Audit": "Nhận Đánh giá ROI Miễn phí",
  "View Case Studies": "Xem Dự án Tiêu biểu",
  "Calculate My Full ROI": "Tính toán ROI đầy đủ",
  "Learn More": "Tìm hiểu thêm",
  
  // 核心文案
  "Stop Reheating Furnace Fuel Waste. Zero CAPEX Upgrades.": 
    "Chấm dứt Lãng phí nhiên liệu Lò nung lại. Nâng cấp Zero CAPEX.",
  
  "We invest, you save.": "Chúng tôi đầu tư, bạn tiết kiệm.",
  
  "typical 7-15% fuel consumption reduction": 
    "giảm tiêu thụ nhiên liệu điển hình 7-15%",
  
  // 指标
  "Typical Fuel Saving": "Tiết kiệm nhiên liệu điển hình",
  "CO2 Reduction (Est.)": "Giảm CO2 (Ước tính)",
  "Annual Production": "Sản lượng hàng năm",
  "Estimated Annual Savings": "Tiết kiệm ước tính/năm",
  "Carbon Offset": "Giảm thải carbon",
  
  // 技术
  "Full-fiber Furnace Roof": "Mái lò toàn sợi gốm",
  "Intelligent Combustion System": "Hệ thống đốt thông minh",
  "High-temperature Energy-saving Coating": "Lớp phủ tiết kiệm năng lượng nhiệt độ cao",
  
  // 认证
  "CISA T80 Verified": "Chứng nhận CISA T80",
  "Listed in CISA T80 extreme efficiency technologies": 
    "Được liệt kê trong công nghệ hiệu suất cực cao CISA T80"
};
```

---

## 🔍 SEO 优化建议

### 越南语版本 Sitemap 条目
```xml
<url>
  <loc>https://www.ecoreheating.com/vi/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
  <xhtml:link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

### Hreflang 标签（添加到 `<head>`）
```html
<link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
<link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
<link rel="alternate" hreflang="x-default" href="https://www.ecoreheating.com/" />
```

---

## ✅ 质量检查工具

### 自动检测脚本（可选）
```python
# validate_vietnamese.py
import os
import re

def validate_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # 检查 lang 属性
    if 'lang="vi"' not in content:
        issues.append("Missing lang='vi' attribute")
    
    # 检查资源路径
    if 'src="./' in content or 'href="./' in content:
        issues.append("Found relative paths starting with './' instead of '../'")
    
    # 检查导航链接
    if 'href="./vi/index.html"' in content:
        issues.append("Found Vietnamese link in Vietnamese page (should link to English)")
    
    return issues

# 运行检查
vi_files = glob.glob('build/client/vi/**/*.html', recursive=True)
for file in vi_files:
    issues = validate_html(file)
    if issues:
        print(f"Issues in {file}:")
        for issue in issues:
            print(f"  - {issue}")
```

---

## 📞 支持与问题

如果在翻译或实施过程中遇到问题，请检查：
1. 路径是否正确（英文用 `./`，越南语用 `../`）
2. 术语是否使用统一翻译
3. 语言标签是否正确设置
4. 导航链接是否功能正常

---

**文档版本**：v1.0  
**最后更新**：2026-01-29  
**维护者**：EcoReheating Dev Team
