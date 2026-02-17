import { useLoaderData, Link } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { getPostBySlug } from "../utils/blog.server";
import type { Post } from "../utils/blog.server";
import { MDXProvider } from "@mdx-js/react";

// Import all MDX components
const mdxComponents = import.meta.glob("../../content/blog/**/*.mdx", { eager: true });

export async function loader({ params, request }: LoaderFunctionArgs) {
    const { slug } = params;
    const url = new URL(request.url);
    const lang = (url.pathname.startsWith("/vi") ? "vi" : "en") as "en" | "vi";

    const post = await getPostBySlug(slug!, lang);

    if (!post) {
        throw new Response("Post Not Found", { status: 404 });
    }

    // Find related posts (same tags, different slug)
    const { getAllPosts } = await import("../utils/blog.server");
    const allPosts = await getAllPosts(lang);
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3);

    return { post, lang, relatedPosts };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) return [{ title: "Post Not Found" }];

    return [
        { title: `${data.post.title} | EcoReheating` },
        { name: "description", content: data.post.description },
        { property: "og:title", content: data.post.title },
        { property: "og:description", content: data.post.description },
        { property: "og:image", content: data.post.image },
        { property: "og:type", content: "article" },
    ];
};

export default function BlogDetail() {
    const { post, lang, relatedPosts } = useLoaderData() as {
        post: Post;
        lang: "en" | "vi";
        relatedPosts: any[]
    };

    const t = {
        back: lang === "vi" ? "Quay lại" : "Back to Blog",
        ctaTitle: lang === "vi" ? "Sẵn sàng tối ưu hóa lò nung của bạn?" : "Ready to optimize your furnace?",
        ctaDesc: lang === "vi"
            ? "Nhận bản đánh giá ROI miễn phí từ các chuyên gia của chúng tôi."
            : "Get a free ROI audit from our technical experts.",
        ctaBtn: lang === "vi" ? "Yêu cầu đánh giá ROI ngay" : "Request ROI Audit",
        relatedTitle: lang === "vi" ? "Bài viết liên quan" : "Related Posts",
        author: lang === "vi" ? "Tác giả" : "Author",
        published: lang === "vi" ? "Ngày đăng" : "Published",
    };

    // Resolve the MDX component
    const postPath = `../../content/blog/${lang}/${post.slug}.mdx`;
    const MDXContent = (mdxComponents[postPath] as any)?.default;

    if (!MDXContent) {
        return <div className="text-white pt-32 text-center">MDX Content not found.</div>;
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "image": post.image,
        "datePublished": post.date,
        "author": {
            "@type": "Organization",
            "name": "EcoReheating"
        },
        "publisher": {
            "@type": "Organization",
            "name": "EcoReheating",
            "logo": {
                "@type": "ImageObject",
                "url": "/logo.png"
            }
        }
    };

    return (
        <article className="bg-[#0a0a0a] min-h-screen pt-24 pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <Link
                    to={lang === "vi" ? "/vi/blog" : "/blog"}
                    className="text-orange-500 hover:text-orange-400 mb-8 inline-flex items-center text-sm uppercase tracking-widest font-bold"
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

                    <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm border-y border-zinc-800 py-4 mb-8">
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

                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto rounded-lg shadow-2xl border border-zinc-800"
                        />
                    )}
                </header>

                <div className="prose prose-invert prose-orange max-w-none 
          prose-h2:font-oswald prose-h2:uppercase prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-orange-600 prose-h2:pl-4
          prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
          prose-li:text-zinc-300 prose-li:mb-2
          prose-strong:text-orange-500
          prose-blockquote:border-l-orange-600 prose-blockquote:bg-zinc-900/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg"
                >
                    <MDXProvider>
                        <MDXContent />
                    </MDXProvider>
                </div>

                {/* CTA Section */}
                <div className="mt-16 p-8 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg text-center shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase font-oswald">{t.ctaTitle}</h3>
                    <p className="text-orange-50/90 mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
                    <Link
                        to="/#assessment"
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
                                    to={lang === "vi" ? `/vi/blog/${p.slug}` : `/blog/${p.slug}`}
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
