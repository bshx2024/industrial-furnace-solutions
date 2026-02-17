# EcoReheating 博客写作与优化标准 (Blog Writing & Optimization Standard)

本文档定义了 EcoReheating (南方科技) 博客文章的创作、SEO 优化及技术要求标准。所有 AI 生成的博文必须严格遵守此标准，以确保在 Google 及 AI 搜索引擎（GEO）中的高可见度与转化率。

---

## 1. 内容深度 (Content Depth)
- **英文版**：目标字数 2500-3500 词。必须是深度技术指南，而非简单的营销文案。
- **技术详解**：每篇文章必须涵盖至少 5 个技术核心模块。每个模块需包含：
  - 问题描述 (The Problem)
  - 技术原理 (The Principle)
  - FAQ 解答 ("Why..." and "How...")
  - 案例数据 (Case Results)
  - 专家引语 (Expert Quotes)
- 每个技术核心模块 300-500 字，确保深度而非泛泛而谈。

## 2. 文章结构 (Article Structure)
- **开头**：痛点描述 + 量化承诺（如 "7-15% fuel savings"），前两段必须让读者明确知道能获得什么。
- **正文**：每个要点包含以下子结构：
  - 问题描述（为什么这是痛点）
  - 技术原理（通俗解释）
  - FAQ 问答段落（"Why..." / "How does..." 开头）
  - 具体数据/案例结果
  - 专家引语
- **数据对比表格**：至少 1 个 Markdown 表格，放在文章前 20% 处，插入技术参数或效益对比。
- **结论**：强化品牌实体关联（EcoReheating + Zero CAPEX + Energy Steward），不要写空洞的总结。
- **CTA**：个性化、包含关键词、有紧迫感，明确下一步行动。

## 3. SEO 要求 (SEO Requirements)
- **标题标签 (Title Tags)**：50-60 字符，核心关键词靠前。
- **Meta Description**：
  - 英文版：150-160 字符（含空格）
  - 越南语版：145-155 字符（越南语声调符号像素宽度略大）
  - 核心关键词尽量出现在前 80 字符内。
- **关键词密度**：主关键词 1.5% 左右，自然分布 LSI 语义关键词。
- **LSI 关键词**：每篇文章开头提供具体的 LSI 语义关键词列表，正文中自然穿插。
- **内链建设（至少 5 个内部链接）**：
  - 技术相关 → `/solutions`（英文）或 `/vi/solutions`（越南语）
  - 案例相关 → `/hero-cases` 或 `/vi/hero-cases`
  - 公司相关 → `/about` 或 `/vi/about`
  - Energy Steward → `/#energy-steward`
  - 博客首页 → `/blog`（英文）或 `/vi/blog`（越南语）
  - 其他博文 → `/blog/xxx` 或 `/vi/blog/xxx`

## 4. GEO 要求 (Generative Engine Optimization)
- **直接答案**：在 H2 下方的第一段给出简练的直接答案，便于 AI 抓取。
- **数据引用**：明确引用 CISA T80 等权威标准。
- **术语一致性**：严格使用专业术语对照表。
- **结构化清单**：多用 Bullet points 展示技术优势。
- **硬性指标**：
  - 每篇文章至少 3 个 FAQ 问答段落（加粗问题，紧跟回答）。
  - 至少 1 个数据对比表格（Markdown 格式）。
  - 至少 3 条专家引语，格式：
    > "引语内容"
    > — 专家名, 职位, South Technology
- **品牌强化**：强化品牌实体关联，明确 EcoReheating 是 Zero CAPEX 模式的首创者。

## 5. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- **专家署名**：每篇文章必须有真实专家署名。
- **数据佐证**：所有节能百分比必须有具体背景或案例支持。
- **品牌背书**：强调 South Technology 的 300+ 线实施业绩。
- **标准引用**：引用行业标准和认证（CISA T80）。
- **作者简述**：文末附作者简介（2-3句话，突出该作者在本文主题上的经验）。

## 6. Schema 结构化数据 (Schema Structured Data)
- **Article Schema**：详情页已自动实现。
- **FAQPage Schema**：每篇文章额外在文末添加，包含文中所有 FAQ 问答。
  
**FAQPage Schema 模板:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why does combustion optimization reduce fuel consumption in reheating furnaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Combustion optimization adjusts the air-fuel ratio in real-time across each burner zone, eliminating excess air that carries heat out through the flue. By maintaining optimal stoichiometric conditions, furnaces achieve 7-15% fuel savings while improving temperature uniformity."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Zero CAPEX model work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EcoReheating deploys all hardware, software, and engineering at zero upfront cost. The steel mill pays only a share of verified energy savings, measured against an agreed baseline. If there are no savings, there is no payment."
      }
    }
  ]
}
</script>
```
*注意：Question 的 name 字段必须与文章正文中加粗的 FAQ 问题完全一致。*

## 7. 双语要求 (Bilingual Requirements)
- **同步发布**：每篇英文文章必须对应一篇越南语翻译。
- **本地化调整**：调整术语及内链前缀 (`/vi/`)。
- **目录结构**：
  - 英文文章放 `content/blog/en/`
  - 越南语放 `content/blog/vi/`
  - 两个版本使用相同的 slug。

## 8. Frontmatter 格式 (Frontmatter Format)
```yaml
---
title: "文章标题"
description: "SEO Meta 描述"
date: "YYYY-MM-DD"
author: "专家姓名"
authorTitle: "专家头衔"
authorBio: "专家简短简介"
tags: ["关键词 1", "关键词 2"]
image: "/cover-image.png"
slug: "url-slug"
lang: "en" # 或 "vi"
---
```

**可用作者列表（轮换使用）：**
| 作者 | 职位 | 擅长领域 |
|------|------|----------|
| Dr. Chen Wei | Chief Thermal Engineer, South Technology | 燃烧优化、热工设计 |
| Zhang Liang | Senior Process Engineer, South Technology | 自动化控制、AI 节能 |
| Li Minghua | Project Director, South Technology | 项目管理、客户案例、ROI 分析 |

每篇文章选择与主题最相关的作者。专家引语也可以交叉引用其他作者的观点，增加多角度可信度。

## 9. URL Slug 规范 (URL Slug Specification)
- **英文 slug**：全小写，单词用短横线分隔，包含核心关键词。
- **规范**：3-8 个单词，不超过 60 字符，剔除停用词。
- **越南语版**：使用相同的英文 slug（不翻译）。
- slug 一旦发布不要修改（避免 404）

## 10. CTA 模板 (CTA Template)
文末 CTA 不要用简单的 "Contact Us"，使用以下模板：

### [个性化标题，包含关键词]

[1-2句话说明读者能获得什么，包含具体承诺]

[按钮文字，包含动作词 →](/#assessment)

*[补充说明，降低决策门槛]*

**示例：**
### Get Your Free Reheating Furnace Efficiency Report

Our engineers will analyze your current fuel consumption data and identify 7-15% savings opportunities — backed by CISA T80 methodology.

[Request Your Free ROI Audit →](/#assessment)

*No commitment required. Report delivered within 5 business days.*

## 11. 图片 Alt Text 标准 (Image Alt Text Standard)
- **描述性长句**：每个 alt 必须是完整的描述性英文句子，包含关键词。
- **示例**：`![Pre-assembled ceramic fiber module installation on walking beam reheating furnace roof...](/tech-roof.png)`
- 另一示例：`"AI-driven smart combustion control dashboard showing zone-by-zone burner efficiency data for walking beam reheating furnace"`

## 12. 图片文件与格式规范 (Image Specifications)
- **命名**：英文短横线描述性命名。
- **格式**：WebP > JPEG > PNG。
- **尺寸**：宽 <= 1200px，大小 <= 200KB。
- **数量**：每文至少 2 张（首图 + 至少 1 幅技术/图表）。

## 13. 定义框 (Definition Box)
- **目的**：被 Google 抓取为 Featured Snippet。
- **HTML 模板：**
```html
<div class="my-8 border-l-4 border-orange-500 bg-gray-900 rounded-r-lg p-6">
  <span class="text-xs font-bold uppercase tracking-wider text-orange-400">Definition</span>
  <h4 class="mt-2 text-lg font-semibold text-white">[概念名称]</h4>
  <p class="mt-2 text-gray-300">[概念解释]</p>
</div>
```

**示例：**
```html
<div class="my-8 border-l-4 border-orange-500 bg-gray-900 rounded-r-lg p-6">
  <span class="text-xs font-bold uppercase tracking-wider text-orange-400">Definition</span>
  <h4 class="mt-2 text-lg font-semibold text-white">Energy Steward Model</h4>
  <p class="mt-2 text-gray-300">A performance-based partnership where EcoReheating deploys optimization technology at zero upfront cost to the steel mill. Revenue is shared based on verified energy savings, aligning incentives between provider and client. The model eliminates CAPEX risk while guaranteeing measurable fuel reduction.</p>
</div>
```

## 14. 外部权威链接 (External Authority Links)
- **出站链接**：引用标准时必须链接至权威官方机构（如 CISA 官网、Wikipedia）。
- **格式**：`<a href="..." target="_blank" rel="noopener noreferrer">文字</a>`。
- 每篇文章至少 1-2 个外部权威链接（新窗口打开）。

## 15. 中间转化 CTA (Middle Conversion CTA)
- **位置**：文章 40-60% 处。
- **模板：**
---
📋 **[资源名称]**
[价值描述]
[**Download Free Guide →**](/#assessment) | [**View Case Studies →**](/hero-cases)
---

**资源类型根据文章主题选择：**
- 燃烧优化类文章 → "Combustion Efficiency Checklist" / "Bảng kiểm tra Hiệu suất Đốt cháy"
- ROI/成本类文章 → "ROI Calculator Template" / "Mẫu Tính toán ROI"
- 案例类文章 → "Full Case Study PDF" / "PDF Nghiên cứu Điển hình"
- 技术路线类文章 → "Furnace Optimization Roadmap" / "Lộ trình Tối ưu hóa Lò nung"
*如果对应资源尚未制作，链接统一指向 /#assessment（免费评估入口）*

## 16. 禁止事项 (Prohibited)
- 不要写少于 2500 词的文章。
- 不要编造数据（所有数字必须基于 CISA T80 标准或实际项目）。
- 不要使用 "we are the best" 等空洞宣传语。
- 不要遗漏内链（每篇至少 5 个）。
- 不要使用 "Technical Team" 作为作者（必须用具体专家名字）。
- 不要使用模糊的图片 Alt（如 "image1"）。
- 不要忽视越南语版本的 /vi/ 内链前缀。
- 不要使用 AI 幻觉生成的虚假案例数据。
