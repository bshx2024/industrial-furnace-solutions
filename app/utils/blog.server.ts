import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    authorTitle?: string;
    authorBio?: string;
    tags: string[];
    image: string;
    lang: string;
    readingTime: string;
    content: string;
    faq?: { question: string; answer: string }[];
}

export interface PostListItem extends Omit<Post, "content"> { }

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export async function getAllPosts(lang: "en" | "vi"): Promise<PostListItem[]> {
    const langPath = path.join(BLOG_PATH, lang);

    if (!fs.existsSync(langPath)) {
        return [];
    }

    const files = fs.readdirSync(langPath).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

    const posts = files.map((file) => {
        const fullPath = path.join(langPath, file);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContent);
        const stats = readingTime(content);

        return {
            ...(data as any),
            slug: (data.slug || file.replace(/\.mdx?$/, "")) as string,
            lang,
            readingTime: stats.text,
        } as PostListItem;
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string, lang: "en" | "vi"): Promise<Post | null> {
    const langPath = path.join(BLOG_PATH, lang);
    let fullPath = path.join(langPath, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(langPath, `${slug}.md`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }
    }

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
        ...(data as any),
        slug,
        lang,
        readingTime: stats.text,
        content,
    } as Post;
}
