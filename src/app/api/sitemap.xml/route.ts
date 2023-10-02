import { groq } from "next-sanity";
import { client } from "@/../lib/sanity.client";

export const revalidate = false;

export async function GET(req: Request) {
  const posts = (
    await client.fetch(getParamQuery, {
      next: {
        revalidate: revalidate,
      },
    })
  ).posts as Post[];
  try {
    const smap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${process.env.NEXT_PUBLIC_SITE_URL}</loc>
            <lastmod>${new Date()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1</priority>
        </url>
        ${posts.map((post) => {
          return `
          <url>
            <loc>${process.env.NEXT_PUBLIC_SITE_URL}/${post.slug.current}</loc>
            <lastmod>${post._updatedAt ? new Date(post._updatedAt) : new Date()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
          </url>
          `;
        })}
    </urlset>
    `;
    return new Response(smap.trim(), {
      headers: {
        "content-type": "text/xml",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

const getParamQuery = groq`
  {
    "posts": *[_type == "post"] {
      slug,
      _updatedAt,
    }
  }
`;
