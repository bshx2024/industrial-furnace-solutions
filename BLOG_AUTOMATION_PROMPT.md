# Blog Automation Prompt for Antigravity

当用户说「检查一下博文任务」或「检查博文任务」时，请执行以下流程：

1. 运行 `cmd /c npm run blog:check`。
2. 读取命令输出，判断是否有「已到期/逾期」或「即将到期」的博文。
3. 如果没有到期任务，只简短告诉用户下一篇文章和计划日期。
4. 如果有到期或即将到期任务，询问用户是否要生成缺失语言的 MDX 草稿。
5. 用户确认后，根据 `eco_blog_schedule.md`、`ecoreheating-blog-standard.md` 和命令输出生成文章草稿。
6. 生成草稿时必须遵守：
   - 多语言版本使用同一个 slug。
   - frontmatter 包含 `title`、`description`、`date`、`slug`、`author`、`tags`、`image`、`faq`。
   - 正文至少包含 3 个相关内部链接。
   - 政策类、CBAM 类、补贴/激励类文章必须加入免责声明。
   - 不承诺固定节能收益、固定关税节省或补贴成功。
   - 印尼内容避免“控制资源链”“中资背书”等敏感表达。
   - 越南内容避免攻击大型钢企、电力局或监管机构。
   - 巴西内容避免过度政治化 BRICS 叙事。
7. 写入 MDX 后运行：
   - `cmd /c npm run lint`
   - `cmd /c npm run build`
8. 若验证通过，提醒用户人工审核后再发布，并列出 GSC 提交与 7/14/30 天复盘日期。
9. 自动生成海外社媒（如 LinkedIn）和邮件（Newsletter）的推广文案草稿。文案中的所有链接必须正确附带 UTM 参数（LinkedIn 链接：`?utm_source=linkedin&utm_medium=social&utm_campaign={slug}`；Email 链接：`?utm_source=newsletter&utm_medium=email&utm_campaign={slug}`），以防流量被 GA4 错误归入 Direct 访问。

默认不要自动发布，不要自动部署，不要自动提交 Git。
