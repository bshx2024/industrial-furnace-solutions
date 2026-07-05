import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const SITE_URL = "https://www.ecoreheating.com";
const root = process.cwd();
const schedulePath = path.join(root, "eco_blog_schedule.md");
const statusPath = path.join(root, "content", "blog", "publishing-status.json");

// Search terms to query Google News RSS
const SEARCH_QUERIES = [
  "steel mill energy saving OR reheating furnace efficiency",
  "steel decarbonization carbon tax CBAM",
  "industrial natural gas prices steel industry",
];

interface RawNewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface BlogSuggestion {
  originalTitle: string;
  originalLink: string;
  suggestedTitle: string;
  suggestedTransTitle: string;
  market: string;
  locales: string[];
  keywords: string;
  focus: string;
  kpi: string;
  slug: string;
}

// 1. Fetch news from Google News RSS feed (Free, no API key required)
async function fetchGoogleNewsRSS(query: string): Promise<RawNewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const xmlText = await res.text();
    
    const items: RawNewsItem[] = [];
    const itemMatches = xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g);
    
    for (const match of itemMatches) {
      const content = match[1];
      const titleRaw = content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
      const link = content.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "";
      const pubDate = content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
      
      // Clean up title (remove publisher suffix like " - Reuters")
      const titleClean = titleRaw.replace(/\s+-\s+[^-\n]+$/, "").trim();
      const source = titleRaw.match(/\s+-\s+([^-\n]+)$/)?.[1] || "Google News";
      
      if (titleClean && link) {
        items.push({ title: titleClean, link, pubDate, source });
      }
    }
    return items.slice(0, 5); // Return top 5 items per query
  } catch (error: any) {
    console.error(`⚠️ Failed to fetch RSS for query "${query}":`, error.message);
    return [];
  }
}

// 2. Fetch via Tavily API (If TAVILY_API_KEY is available)
async function fetchTavilySearch(query: string, apiKey: string): Promise<RawNewsItem[]> {
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        time_range: "week",
        max_results: 5,
      }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return (data.results || []).map((r: any) => ({
      title: r.title,
      link: r.url,
      pubDate: new Date().toUTCString(),
      source: new URL(r.url).hostname,
    }));
  } catch (error: any) {
    console.error(`⚠️ Tavily search failed, falling back to RSS:`, error.message);
    return [];
  }
}

// Helper to slugify titles
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

// 3. Process raw news items into targeted reheating furnace SEO topics
function mapNewsToSuggestions(newsItems: RawNewsItem[]): BlogSuggestion[] {
  const suggestions: BlogSuggestion[] = [];
  
  for (const item of newsItems) {
    const text = item.title.toLowerCase();
    
    // Choose specific B2B templates based on news content keywords
    if (text.includes("decarbon") || text.includes("carbon") || text.includes("cbam") || text.includes("tax")) {
      // Topic: Carbon Tax / CBAM B2B Angle
      suggestions.push({
        originalTitle: item.title,
        originalLink: item.link,
        suggestedTitle: "CBAM Billet Production: Optimizing Reheating Furnace Emissions for Export Markets",
        suggestedTransTitle: "Sản xuất phôi thép CBAM: Tối ưu hóa phát thải lò nung cho thị trường xuất khẩu",
        market: "越南 (EN/VI)",
        locales: ["en", "vi"],
        keywords: "CBAM steel exporter, carbon footprint reheating furnace, lò nung hiệu suất cao",
        focus: "分析碳关税政策对热轧厂出口影响，重点介绍如何通过提高余热回收率降低吨钢排放，提供合规路径与免责声明。",
        kpi: "30天曝光 50+ / CTR > 1% / 目标关键词进入 Top 20",
        slug: "cbam-billet-production-reheating-furnace-emissions",
      });
    } else if (text.includes("gas") || text.includes("price") || text.includes("energy cost") || text.includes("tariff")) {
      // Topic: Energy Prices / Gas / Electricity
      suggestions.push({
        originalTitle: item.title,
        originalLink: item.link,
        suggestedTitle: "Mitigating Natural Gas Price Hikes in Rolling Mills: Waste Heat Recuperator Upgrades",
        suggestedTransTitle: "Menghadapi Kenaikan Harga Gas Alam di Pabrik Baja: Upgrade Rekuperator Panas Bumi",
        market: "印尼 (EN/ID)",
        locales: ["en", "id"],
        keywords: "efisiensi energi tungku baja, waste heat recovery in reheating furnace, rekuperator panas",
        focus: "直击钢厂天然气使用成本高企痛点，重点阐述提高空气预热温度对节省燃料的计算公式，引导至余热回收产品。",
        kpi: "30天曝光 30+ / 1个表单或询盘转化",
        slug: "mitigating-gas-price-hikes-rolling-mills-recuperators",
      });
    } else if (text.includes("hydrogen") || text.includes("h2") || text.includes("future fuel")) {
      // Topic: Future Fuels / Hydrogen Ready
      suggestions.push({
        originalTitle: item.title,
        originalLink: item.link,
        suggestedTitle: "Hydrogen-Ready Reheating Furnaces: Revamping Burners for Future Net-Zero Billet Heating",
        suggestedTransTitle: "Fornos de Reaquecimento Prontos para Hidrogênio: Adaptando Queimadores para Emissão Zero",
        market: "巴西 (EN/PT-BR)",
        locales: ["en", "pt-br"],
        keywords: "forno de reaquecimento hidrogênio, regenerative burner reheating furnace",
        focus: "探讨未来氢能转化趋势，分析现有炉体及蓄热式燃烧器（Regenerative Burners）进行氢气掺烧的技术可行性与改造成本。",
        kpi: "30天拉丁美洲曝光 20+ / 增加主站绿钢关键词权重",
        slug: "hydrogen-ready-reheating-furnaces-burner-revamp",
      });
    } else {
      // Topic: Operational efficiency / OEE / maintenance
      suggestions.push({
        originalTitle: item.title,
        originalLink: item.link,
        suggestedTitle: "Preventing Refractory Wear in Reheating Furnaces: Critical Checklists for Shutdown Maintenance",
        suggestedTransTitle: "Tránh mài mòn vật liệu chịu lửa trong lò nung: Danh sách kiểm tra bảo trì dừng lò",
        market: "全球 / 越南 (EN/VI)",
        locales: ["en", "vi"],
        keywords: "lò nung thép Việt Nam, reheating furnace refractory wear, maintenance checklist",
        focus: "介绍步进梁式/推钢式加热炉停炉期间耐火纤维与浇注料的磨损诊断，提供停炉大修的 SOP 指南，引导下载 Excel 模板。",
        kpi: "30天曝光 40+ / 2个 SOP 模板下载",
        slug: "preventing-refractory-wear-reheating-furnaces-maintenance",
      });
    }
  }

  // Deduplicate suggestions by slug
  const seenSlugs = new Set<string>();
  return suggestions.filter((s) => {
    if (seenSlugs.has(s.slug)) return false;
    seenSlugs.add(s.slug);
    return true;
  });
}

// 4. Update eco_blog_schedule.md with selected recommendation
function appendToSchedule(s: BlogSuggestion) {
  if (!fs.existsSync(schedulePath)) {
    console.error("❌ Error: eco_blog_schedule.md not found!");
    return;
  }

  const scheduleContent = fs.readFileSync(schedulePath, "utf8");
  const lines = scheduleContent.split(/\r?\n/);
  
  // Get local date formatted as YYYY-MM-DD
  const localDate = new Date();
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const todayDateString = `${year}-${month}-${day}`;
  const todayDate = new Date(`${todayDateString}T00:00:00`);

  interface TableRow {
    index: number;
    date: Date;
    weekText: string;
  }
  const tableRows: TableRow[] = [];
  for (let i = 0; i < lines.length; i++) {
    const dateMatch = lines[i].match(/^\|\s*\*\*(\d{4}-\d{2}-\d{2})\*\*\s*\|/);
    if (dateMatch) {
      tableRows.push({
        index: i,
        date: new Date(`${dateMatch[1]}T00:00:00`),
        weekText: lines[i].split("|")[2]?.trim() || ""
      });
    }
  }

  let insertIndex = -1;
  let weekText = "实时热点";
  const insertBeforeRow = tableRows.find(row => row.date > todayDate);

  if (insertBeforeRow) {
    insertIndex = insertBeforeRow.index;
    const beforeRowIndex = tableRows.indexOf(insertBeforeRow) - 1;
    if (beforeRowIndex >= 0) {
      const beforeRow = tableRows[beforeRowIndex];
      const weekNumMatch = beforeRow.weekText.match(/第\s*(\d+)\s*周/);
      if (weekNumMatch) {
        const nextWeekNum = parseInt(weekNumMatch[1], 10) + 1;
        weekText = `第 ${nextWeekNum} 周 (实时热点)`;
      }
    }
  } else {
    if (tableRows.length > 0) {
      const lastRow = tableRows[tableRows.length - 1];
      insertIndex = lastRow.index + 1;
      const weekNumMatch = lastRow.weekText.match(/第\s*(\d+)\s*周/);
      if (weekNumMatch) {
        const nextWeekNum = parseInt(weekNumMatch[1], 10) + 1;
        weekText = `第 ${nextWeekNum} 周 (实时热点)`;
      }
    } else {
      insertIndex = lines.length;
    }
  }

  const newRow = `| **${todayDateString}** | ${weekText} | **${s.market}** | **${s.suggestedTitle}** <br>*(${s.suggestedTransTitle})* | ${s.keywords} | **【热点嗅探】** ${s.focus} | ${s.kpi} |`;

  if (insertIndex !== -1 && insertIndex < lines.length) {
    lines.splice(insertIndex, 0, newRow);
  } else {
    lines.push(newRow);
  }

  fs.writeFileSync(schedulePath, lines.join("\n"), "utf8");
  console.log(`\n🎉 Successfully inserted new hot topic to editorial calendar!`);
  console.log(`   Scheduled Date: ${todayDateString} (${weekText})`);
  console.log(`   Row: ${newRow}`);

  // Auto-init publishing-status.json
  const status = fs.existsSync(statusPath)
    ? JSON.parse(fs.readFileSync(statusPath, "utf8").replace(/^\uFEFF/, ""))
    : { completed: [], inProgress: [] };
  
  if (!status.inProgress) status.inProgress = [];
  
  const alreadyScheduled = status.inProgress.some((item: any) => item.slug === s.slug);
  if (!alreadyScheduled) {
    status.inProgress.push({
      slug: s.slug,
      title: s.suggestedTitle,
      date: todayDateString,
      languages: s.locales,
    });
    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2), "utf8");
    console.log(`📝 Added to in-progress index inside publishing-status.json.`);
  }
}

// 5. Main CLI Execution
async function main() {
  console.log("🔥 EcoReheating - Industry Hotspot Sniffer");
  console.log("━".repeat(60));
  
  const apiKey = process.env.TAVILY_API_KEY || "";
  let rawNews: RawNewsItem[] = [];

  if (apiKey) {
    console.log("🔌 Tavily API Key detected. Performing semantic trend search...");
    for (const q of SEARCH_QUERIES.slice(0, 2)) {
      const results = await fetchTavilySearch(q, apiKey);
      rawNews.push(...results);
    }
  } else {
    console.log("ℹ️ No TAVILY_API_KEY found. Falling back to Google News RSS...");
    for (const q of SEARCH_QUERIES) {
      const results = await fetchGoogleNewsRSS(q);
      rawNews.push(...results);
    }
  }

  if (rawNews.length === 0) {
    console.log("❌ No industry news items fetched. Please check internet connection.");
    return;
  }

  // Remove duplicate source news items
  const uniqueNews = rawNews.filter(
    (item, index, self) => self.findIndex((t) => t.title === item.title) === index
  );

  console.log(`\n📰 Crawled ${uniqueNews.length} recent industry updates. Processing into B2B topics...`);
  
  const suggestions = mapNewsToSuggestions(uniqueNews);

  if (suggestions.length === 0) {
    console.log("⚠️ No specific reheating furnace topics generated. Try different queries.");
    return;
  }

  console.log(`\n💡 Recommended B2B Reheating Furnace SEO Blog Topics:`);
  console.log("━".repeat(60));
  
  suggestions.forEach((s, idx) => {
    console.log(`\n[${idx + 1}] Topic Recommendation`);
    console.log(`    Source News:  "${s.originalTitle}"`);
    console.log(`    Source Link:  ${s.originalLink}`);
    console.log(`    Blog Title:   ${s.suggestedTitle}`);
    console.log(`    Translation:  ${s.suggestedTransTitle}`);
    console.log(`    Locales:      ${s.market}`);
    console.log(`    Keywords:     ${s.keywords}`);
    console.log(`    Focus Angle:  ${s.focus}`);
    console.log(`    Slug:         ${s.slug}`);
  });

  console.log("\n" + "━".repeat(60));
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nChoose a recommendation number to add to your editorial calendar (or press Enter/q to quit): ", (answer) => {
    const idx = parseInt(answer.trim(), 10) - 1;
    if (!isNaN(idx) && idx >= 0 && idx < suggestions.length) {
      const selection = suggestions[idx];
      appendToSchedule(selection);
    } else {
      console.log("🚪 Exit. No changes made.");
    }
    rl.close();
  });
}

main().catch(console.error);
