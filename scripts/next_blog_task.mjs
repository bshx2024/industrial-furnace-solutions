import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const schedulePath = path.join(root, "eco_blog_schedule.md");
const statusPath = path.join(root, "content", "blog", "publishing-status.json");
const blogRoot = path.join(root, "content", "blog");
const today = new Date();
const upcomingWindowDays = Number(process.env.BLOG_TASK_WINDOW_DAYS || 7);

const languageMap = {
  EN: "en",
  VI: "vi",
  ID: "id",
  "PT-BR": "pt-br",
};

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function daysUntil(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  return Math.ceil((date.getTime() - new Date(formatDate(today)).getTime()) / 86400000);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function parseSchedule(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| **2026-"))
    .map((line) => {
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      const date = cells[0].replace(/\*\*/g, "");
      const window = cells[1];
      const market = cells[2].replace(/<br>/g, " ").replace(/\*\*/g, "");
      const titleCell = cells[3];
      const titleMatch = titleCell.match(/\*\*([^*]+)\*\*/);
      const title = titleMatch ? titleMatch[1].trim() : titleCell.replace(/<br>.*/, "").replace(/\*\*/g, "").trim();
      const languagesMatch = cells[2].match(/\(([^)]+)\)/);
      const languages = languagesMatch
        ? languagesMatch[1].split("/").map((lang) => languageMap[lang.trim().toUpperCase()]).filter(Boolean)
        : ["en"];
      const keywords = cells[4];
      const focus = cells[5].replace(/<br>/g, " ").replace(/\*\*/g, "");
      const kpi = cells[6];
      const slug = slugify(title);
      return { date, window, market, title, slug, languages, keywords, focus, kpi };
    });
}

function postExists(language, slug) {
  return ["mdx", "md"].some((ext) => fs.existsSync(path.join(blogRoot, language, `${slug}.${ext}`)));
}

function taskStatus(task, status) {
  const completed = status.completed || [];
  const inProgress = status.inProgress || [];
  const completedRecord = completed.find((item) => item.slug === task.slug);
  const inProgressRecord = inProgress.find((item) => item.slug === task.slug);
  const existingLanguages = task.languages.filter((language) => postExists(language, task.slug));
  const missingLanguages = task.languages.filter((language) => !postExists(language, task.slug));
  const isComplete = missingLanguages.length === 0 || (completedRecord && task.languages.every((language) => completedRecord.languages?.includes(language)));
  return { completedRecord, inProgressRecord, existingLanguages, missingLanguages, isComplete };
}

if (!fs.existsSync(schedulePath)) {
  console.error("未找到 eco_blog_schedule.md，无法检查博文任务。");
  process.exit(1);
}

const schedule = parseSchedule(fs.readFileSync(schedulePath, "utf8"));
const status = readJson(statusPath, { completed: [], inProgress: [] });
const tasks = schedule.map((task) => ({ ...task, daysUntil: daysUntil(task.date), status: taskStatus(task, status) }));
const actionable = tasks.filter((task) => !task.status.isComplete && task.daysUntil <= upcomingWindowDays).sort((a, b) => a.daysUntil - b.daysUntil);
const next = actionable[0] || tasks.filter((task) => !task.status.isComplete).sort((a, b) => a.daysUntil - b.daysUntil)[0];

console.log("\nEcoReheating 博文任务检查");
console.log(`今天：${formatDate(today)}｜提醒窗口：${upcomingWindowDays} 天\n`);

if (!next) {
  console.log("✅ 当前排期中的博文均已完成。无需更新。");
  process.exit(0);
}

const isDue = next.daysUntil <= 0;
const isUpcoming = next.daysUntil > 0 && next.daysUntil <= upcomingWindowDays;
const urgency = isDue ? "🔴 已到期/逾期" : isUpcoming ? "🟡 即将到期" : "⚪ 后续任务";

console.log(`${urgency}：下一篇待处理博文`);
console.log(`计划日期：${next.date}（${next.daysUntil >= 0 ? `${next.daysUntil} 天后` : `已逾期 ${Math.abs(next.daysUntil)} 天`}）`);
console.log(`时间窗口：${next.window}`);
console.log(`目标市场/语言：${next.market}`);
console.log(`标题：${next.title}`);
console.log(`建议 slug：${next.slug}`);
console.log(`需要语言：${next.languages.join(", ")}`);
console.log(`已有语言：${next.status.existingLanguages.length ? next.status.existingLanguages.join(", ") : "无"}`);
console.log(`缺失语言：${next.status.missingLanguages.join(", ")}`);
console.log(`关键词：${next.keywords}`);
console.log(`30天 KPI：${next.kpi}`);
console.log("\n建议下一步：");
console.log("1. 让 Antigravity 根据 BLOG_AUTOMATION_PROMPT.md 生成缺失语言的 MDX 草稿。");
console.log("2. 人工审核政策事实、语言质量、免责声明、CTA 和内链。");
console.log("3. 运行 cmd /c npm run lint 与 cmd /c npm run build。");
console.log("4. 发布后当天提交 GSC，并记录 7/14/30 天复盘日期。");
console.log("5. 推广时必须带上 UTM 参数（防止流量混入 Direct，GA4 精准识别）：");
next.languages.forEach((lang) => {
  const prefix = lang === "en" ? "" : `${lang}/`;
  console.log(`   [${lang.toUpperCase()}]`);
  console.log(`     LinkedIn:   https://www.ecoreheating.com/${prefix}${next.slug}?utm_source=linkedin&utm_medium=social&utm_campaign=${next.slug}`);
  console.log(`     Newsletter: https://www.ecoreheating.com/${prefix}${next.slug}?utm_source=newsletter&utm_medium=email&utm_campaign=${next.slug}`);
});

const reviewDates = [7, 14, 30].map((offset) => {
  const date = new Date(`${next.date}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return `${offset}天：${formatDate(date)}`;
});
console.log(`\n复盘日期：${reviewDates.join("｜")}\n`);

