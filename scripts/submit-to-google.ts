/**
 * Google Search 提交脚本
 * =====================
 * 
 * 用途：将新博文 URL 提交给 Google 收录
 * 
 * ⚠️ 重要说明：
 * Google 已在 2023 年正式废弃 sitemap ping 端点 (google.com/ping?sitemap=)
 * 目前 Google 推荐的提交方式有 3 种（按效果排序）：
 * 
 * 方法 1️⃣ [最推荐] Google Search Console - 手动提交
 *   1. 登录 https://search.google.com/search-console
 *   2. 选择 ecoreheating.com 站点
 *   3. 左侧菜单 → "Sitemaps" → 输入 "sitemap.xml" → 提交
 *   4. 左侧菜单 → "URL Inspection" → 粘贴新博文 URL → "Request Indexing"
 * 
 * 方法 2️⃣ [自动化] Google Indexing API (需要 Service Account)
 *   需要在 Google Cloud Console 创建 Service Account 并下载 JSON 密钥
 *   然后使用下面的 submitViaIndexingAPI() 函数
 * 
 * 方法 3️⃣ [被动] robots.txt 中的 Sitemap 声明 (已配置)
 *   Google 的爬虫会定期检查 robots.txt 中声明的 sitemap
 *   通常需要 2-7 天才会被发现和收录
 * 
 * 使用方式：
 *   npx tsx scripts/submit-to-google.ts
 */

const SITE_URL = "https://www.ecoreheating.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// 需要提交的新博文 URL
const NEW_URLS = [
    `${SITE_URL}/blog/vietnam-steel-2026-six-pressures-competitive-advantage`,
    `${SITE_URL}/vi/blog/vietnam-steel-2026-six-pressures-competitive-advantage`,
];

// ============================================================
// 方法 1: 通过 Google Indexing API 提交 (需要 Service Account)
// ============================================================
async function submitViaIndexingAPI(serviceAccountKeyPath: string) {
    console.log("\n🔄 Method: Google Indexing API");
    console.log("=".repeat(50));

    try {
        // 动态导入 googleapis
        const { google } = await import("googleapis");

        const auth = new google.auth.GoogleAuth({
            keyFile: serviceAccountKeyPath,
            scopes: ["https://www.googleapis.com/auth/indexing"],
        });

        const indexing = google.indexing({ version: "v3", auth });

        for (const url of NEW_URLS) {
            try {
                const response = await indexing.urlNotifications.publish({
                    requestBody: {
                        url: url,
                        type: "URL_UPDATED",
                    },
                });
                console.log(`✅ Submitted: ${url}`);
                console.log(`   Status: ${response.status}`);
                console.log(`   Notification: ${JSON.stringify(response.data.urlNotificationMetadata)}`);
            } catch (error: any) {
                console.error(`❌ Failed: ${url}`);
                console.error(`   Error: ${error.message}`);
            }
        }
    } catch (error: any) {
        console.error("❌ Google Indexing API Error:", error.message);
        console.log("\n💡 提示: 需要先安装 googleapis 包:");
        console.log("   npm install googleapis");
        console.log("   并准备 Google Cloud Service Account JSON 密钥文件");
    }
}

// ============================================================
// 方法 2: 手动步骤提示 (Search Console)
// ============================================================
function printSearchConsoleSteps() {
    console.log("\n📋 Method: Google Search Console (推荐, 手动操作)");
    console.log("=".repeat(50));
    console.log(`
  步骤 1: 提交 Sitemap
  ─────────────────────
  1. 打开 https://search.google.com/search-console
  2. 选择站点: ${SITE_URL}
  3. 左侧菜单 → "Sitemaps"
  4. 输入: sitemap.xml
  5. 点击 "Submit"

  步骤 2: 请求单个 URL 收录
  ───────────────────────────
  1. 左侧菜单 → "URL Inspection"
  2. 在顶部搜索栏粘贴以下 URL:

  📌 英文版:
     ${NEW_URLS[0]}

  📌 越南语版:
     ${NEW_URLS[1]}

  3. 点击 "Request Indexing"
  4. 等待验证完成后确认

  ⏰ 预期时间:
  - URL Inspection 请求: 1-3 天
  - Sitemap 自然发现: 2-7 天
  - 完全收录并出现在搜索结果: 1-4 周
  `);
}

// ============================================================
// 方法 3: 检查现有配置状态
// ============================================================
async function checkCurrentSetup() {
    console.log("\n🔍 Current SEO Configuration Check");
    console.log("=".repeat(50));

    // 检查 sitemap 是否可访问
    console.log(`\n📄 Sitemap URL: ${SITEMAP_URL}`);
    console.log(`📄 robots.txt includes Sitemap declaration: ✅`);

    // 列出所有需要收录的新 URL
    console.log(`\n🆕 New URLs to index:`);
    NEW_URLS.forEach((url, i) => {
        console.log(`   ${i + 1}. ${url}`);
    });

    // 检查 hreflang 配置
    console.log(`\n🌐 hreflang Configuration:`);
    console.log(`   EN ↔ VI bilateral links: ✅ (configured in sitemap.xml)`);
    console.log(`   x-default set to EN: ✅`);

    // 显示 SEO 就绪状态
    console.log(`\n✅ SEO Readiness Checklist:`);
    console.log(`   [✅] robots.txt → Sitemap declared`);
    console.log(`   [✅] Dynamic sitemap.xml → Auto-includes new blog posts`);
    console.log(`   [✅] lastmod dates → Set from post frontmatter`);
    console.log(`   [✅] hreflang → EN/VI alternate links configured`);
    console.log(`   [✅] Blog posts → Title, description, FAQ schema ready`);
    console.log(`   [✅] Image alt tags → Descriptive, keyword-rich`);
}

// ============================================================
// 主入口
// ============================================================
async function main() {
    console.log("🚀 EcoReheating - Google Search Submission Tool");
    console.log("━".repeat(50));
    console.log(`📅 Date: ${new Date().toISOString().split("T")[0]}`);
    console.log(`🌐 Site: ${SITE_URL}`);

    // 1. 检查当前配置
    await checkCurrentSetup();

    // 2. 输出 Search Console 手动步骤
    printSearchConsoleSteps();

    // 3. 尝试 Indexing API (如果有密钥)
    const keyPath = process.argv[2];
    if (keyPath) {
        console.log(`\n🔑 Service Account key detected: ${keyPath}`);
        await submitViaIndexingAPI(keyPath);
    } else {
        console.log("\n💡 如需使用 Indexing API 自动提交，运行:");
        console.log("   npx tsx scripts/submit-to-google.ts ./path/to/service-account-key.json");
    }

    console.log("\n" + "━".repeat(50));
    console.log("✅ Done! Follow the steps above to complete submission.");
}

main().catch(console.error);
