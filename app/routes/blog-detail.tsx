import { useState } from "react";
import { useLoaderData, Link } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { getPostBySlug, getAllPosts, postExists } from "../utils/blog.server";
import type { Post } from "../utils/blog.server";
import { MDXProvider } from "@mdx-js/react";
import type { Language } from "../contexts/LanguageContext";
import { Share2, Check } from "lucide-react";
import SmartLanguageBanner from "../components/SmartLanguageBanner";
import InlineRoiCalculator from "../components/InlineRoiCalculator";

// Import all MDX components
const mdxComponents = import.meta.glob("../../content/blog/**/*.mdx", { eager: true });

export async function loader({ params, request }: LoaderFunctionArgs) {
    const { slug } = params;
    const url = new URL(request.url);
    let lang = "en";
    if (url.pathname.startsWith("/vi")) lang = "vi";
    else if (url.pathname.startsWith("/id")) lang = "id";
    else if (url.pathname.startsWith("/pt-br")) lang = "pt-br";

    const post = await getPostBySlug(slug!, lang);

    if (!post) {
        throw new Response("Post Not Found", { status: 404 });
    }

    const availableLangs = {
        en: postExists(slug!, "en"),
        vi: postExists(slug!, "vi"),
        id: postExists(slug!, "id"),
        "pt-br": postExists(slug!, "pt-br")
    };

    // Find related posts (same tags, different slug)
    const allPosts = await getAllPosts(lang);
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3);

    return { post, lang, relatedPosts, availableLangs };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) return [{ title: "Post Not Found" }];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data.post.title,
        "description": data.post.description,
        "image": data.post.image,
        "datePublished": data.post.date,
        "author": {
            "@type": "Person",
            "name": data.post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "EcoReheating",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.ecoreheating.com/favicon.svg"
            }
        }
    };

    const faqSchema = data.post.faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.post.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    const metaTags: any[] = [
        { title: `${data.post.title} | EcoReheating` },
        { name: "description", content: data.post.description },
        { property: "og:title", content: data.post.title },
        { property: "og:description", content: data.post.description },
        { property: "og:image", content: data.post.image },
        { property: "og:type", content: "article" }
    ];

    return metaTags;
};

export default function BlogDetail() {
    const { post, lang, relatedPosts, availableLangs } = useLoaderData() as {
        post: Post;
        lang: Language;
        relatedPosts: any[];
        availableLangs: {
            en: boolean;
            vi: boolean;
            id: boolean;
            'pt-br': boolean;
        };
    };

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        if (typeof window === "undefined") return;
        const shareUrl = `${window.location.origin}${window.location.pathname}?utm_source=user_share&utm_medium=referral&utm_campaign=${post.slug}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.image,
        "datePublished": post.date,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "EcoReheating",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.ecoreheating.com/favicon.svg"
            }
        }
    };

    const faqSchema = post.faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    const t = {
        back: lang === "vi" ? "Quay lại" : lang === "id" ? "Kembali ke Blog" : lang === "pt-br" ? "Voltar para o Blog" : "Back to Blog",
        ctaTitle: lang === "vi" ? "Sẵn sàng tối ưu hóa lò nung của bạn?" : lang === "id" ? "Siap untuk mengoptimalkan tungku Anda?" : lang === "pt-br" ? "Pronto para otimizar seu forno?" : "Ready to optimize your furnace?",
        ctaDesc: lang === "vi"
            ? "Nhận bản đánh giá ROI miễn phí từ các chuyên gia của chúng tôi."
            : lang === "id"
            ? "Dapatkan audit ROI gratis dari pakar teknis kami."
            : lang === "pt-br"
            ? "Obtenha uma auditoria de ROI gratuita de nossos especialistas técnicos."
            : "Get a free ROI audit from our technical experts.",
        ctaBtn: lang === "vi" ? "Yêu cầu đánh giá ROI ngay" : lang === "id" ? "Minta Audit ROI" : lang === "pt-br" ? "Solicitar Auditoria de ROI" : "Request ROI Audit",
        relatedTitle: lang === "vi" ? "Bài viết liên quan" : lang === "id" ? "Artikel Terkait" : lang === "pt-br" ? "Artigos Relacionados" : "Related Posts",
        author: lang === "vi" ? "Tác giả" : lang === "id" ? "Penulis" : lang === "pt-br" ? "Autor" : "Author",
        published: lang === "vi" ? "Ngày đăng" : lang === "id" ? "Diterbitkan" : lang === "pt-br" ? "Publicado" : "Published",
        faqTitle: lang === "vi" ? "Câu hỏi thường gặp" : lang === "id" ? "Pertanyaan Sering Diajukan" : lang === "pt-br" ? "Perguntas Frequentes" : "Frequently Asked Questions",
        share: lang === "vi" ? "Chia sẻ" : lang === "id" ? "Bagikan" : lang === "pt-br" ? "Compartilhar" : "Share Link",
        copied: lang === "vi" ? "Đã sao chép!" : lang === "id" ? "Tersalin!" : lang === "pt-br" ? "Copiado!" : "Copied!",
    };

    // Resolve the MDX component
    const postPath = `../../content/blog/${lang}/${post.slug}.mdx`;
    const MDXContent = (mdxComponents[postPath] as any)?.default;

    if (!MDXContent) {
        return <div className="text-white pt-32 text-center">MDX Content not found.</div>;
    }

    return (
        <article className="bg-[#0a0a0a] min-h-screen pt-24 pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Smart Language Recommendation Banner */}
                <SmartLanguageBanner
                    currentLang={lang}
                    slug={post.slug}
                    availableLangs={availableLangs}
                />

                <Link
                    to={lang === "en" ? "/blog" : `/${lang}/blog`}
                    className="text-orange-500 hover:text-orange-400 mb-8 inline-flex items-center text-sm uppercase tracking-widest font-bold font-oswald"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t.back}
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-oswald uppercase leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 text-zinc-400 text-sm border-y border-zinc-800 py-4 mb-8">
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center">
                                <span className="text-zinc-500 mr-2">{t.author}:</span>
                                <span className="text-white font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-zinc-500 mr-2">{t.published}:</span>
                                <span className="text-white">{post.date}</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {post.readingTime}
                            </div>
                        </div>

                        {/* Direct share button with UTM parameters */}
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-orange-500 hover:text-orange-400 transition-colors border border-orange-500/20 hover:border-orange-500/40 bg-orange-500/5 px-4 py-2 rounded-lg cursor-pointer font-oswald"
                        >
                            {copied ? (
                                <>
                                    <Check size={14} className="text-green-500 animate-bounce" />
                                    <span>{t.copied}</span>
                                </>
                            ) : (
                                <>
                                    <Share2 size={14} />
                                    <span>{t.share}</span>
                                </>
                            )}
                        </button>
                    </div>

                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto rounded-lg shadow-2xl border border-zinc-800"
                        />
                    )}
                </header>

                <div className="prose prose-invert sm:prose-lg max-w-none
          prose-headings:text-white prose-headings:font-oswald prose-headings:uppercase
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-furnace-500 prose-h2:pl-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-gray-300 prose-li:mb-2
          prose-strong:text-white prose-strong:font-bold
          prose-a:text-furnace-500 hover:prose-a:text-furnace-400 prose-a:transition-colors
          prose-blockquote:text-gray-300 prose-blockquote:border-l-furnace-500 prose-blockquote:bg-zinc-900/30 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:rounded-r-lg
          prose-table:border-collapse prose-table:my-8
          prose-th:border prose-th:border-white/20 prose-th:bg-white/5 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-furnace-500 prose-th:font-bold prose-th:uppercase prose-th:text-xs prose-th:tracking-wider
          prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-3 prose-td:text-gray-300 prose-td:text-sm
          "
                >
                    <MDXProvider>
                        <MDXContent />
                    </MDXProvider>
                </div>

                {/* Inline ROI Estimator */}
                <InlineRoiCalculator language={lang} />

                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                    <section className="mt-16 border-t border-zinc-800 pt-12">
                        <h3 className="text-2xl font-bold text-white mb-8 uppercase font-oswald tracking-wider">
                            {t.faqTitle}
                        </h3>
                        <div className="space-y-6">
                            {post.faq.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-xl hover:border-zinc-700/50 transition-all"
                                >
                                    <h4 className="text-lg font-semibold text-white mb-3 flex gap-3 items-start">
                                        <span className="text-orange-500 font-bold font-oswald">Q.</span>
                                        {item.question}
                                    </h4>
                                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base pl-6">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Author Bio Section */}
                {post.authorBio && (
                    <div className="mt-16 p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start transition-all hover:bg-zinc-900/80">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                            {post.author.charAt(0)}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-white font-bold text-xl mb-1">{post.author}</h4>
                            {post.authorTitle && <p className="text-orange-500 text-sm font-medium uppercase tracking-wider mb-4">{post.authorTitle}</p>}
                            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                                {post.authorBio}
                            </p>
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 p-8 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg text-center shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase font-oswald">{t.ctaTitle}</h3>
                    <p className="text-orange-50/90 mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
                    <Link
                        to={lang === "en" ? "/#assessment" : `/${lang}/#assessment`}
                        className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange-50 transition-colors shadow-lg"
                    >
                        {t.ctaBtn}
                    </Link>
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-zinc-800">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-widest bg-zinc-800 text-zinc-400 px-3 py-1 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-zinc-800 pb-4 uppercase font-oswald tracking-wider">
                            {t.relatedTitle}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map(p => (
                                <Link
                                    key={p.slug}
                                    to={lang === "en" ? `/blog/${p.slug}` : `/${lang}/blog/${p.slug}`}
                                    className="group bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg hover:border-orange-600/50 transition-colors"
                                >
                                    <h4 className="text-white font-bold group-hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                                        {p.title}
                                    </h4>
                                    <div className="text-zinc-500 text-xs">{p.date}</div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
