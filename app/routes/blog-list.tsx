import { useLoaderData, Link } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { getAllPosts } from "../utils/blog.server";
import type { PostListItem } from "../utils/blog.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const lang = url.pathname.startsWith("/vi") ? "vi" : "en";
    const posts = await getAllPosts(lang);
    return { posts, lang };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = data?.lang === "vi" ? "Bài viết | EcoReheating" : "Blog | EcoReheating";
    const description = data?.lang === "vi"
        ? "Khám phá các hướng dẫn kỹ thuật và giải pháp tiết kiệm năng lượng mới nhất cho lò nung thép."
        : "Explore the latest technical guides and energy-saving solutions for steel reheating furnaces.";

    return [
        { title },
        { name: "description", content: description },
    ];
};

export default function BlogList() {
    const { posts, lang } = useLoaderData() as { posts: PostListItem[]; lang: "en" | "vi" };

    const t = {
        title: lang === "vi" ? "Bài viết" : "Blog",
        readMore: lang === "vi" ? "Đọc thêm" : "Read More",
        noPosts: lang === "vi" ? "Chưa có bài viết nào." : "No posts found.",
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-oswald uppercase tracking-wider">
                        {t.title}
                    </h1>
                    <div className="h-1.5 w-24 bg-orange-600 mx-auto"></div>
                </header>

                {posts.length === 0 ? (
                    <p className="text-gray-400 text-center text-lg">{t.noPosts}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post.slug}
                                className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col hover:border-orange-600/50 transition-colors group"
                            >
                                {post.image && (
                                    <Link to={lang === "vi" ? `/vi/blog/${post.slug}` : `/blog/${post.slug}`} className="block overflow-hidden h-48">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                )}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center text-zinc-500 text-sm mb-3 space-x-4">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readingTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                                        <Link to={lang === "vi" ? `/vi/blog/${post.slug}` : `/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                                        {post.description}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-zinc-800 flex flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-widest bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to={lang === "vi" ? `/vi/blog/${post.slug}` : `/blog/${post.slug}`}
                                        className="text-orange-500 font-bold uppercase tracking-widest text-xs hover:text-orange-400 inline-flex items-center"
                                    >
                                        {t.readMore}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
