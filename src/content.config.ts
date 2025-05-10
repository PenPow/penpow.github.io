import { defineCollection, z } from "astro:content";
import { rssSchema } from '@astrojs/rss';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
	schema: rssSchema.extend({ 
		hidden: z.boolean().optional().default(false),
		description: z.string(),
		title: z.string(),
		pubDate: z.date() 
	}),
});

const papersCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/papers" }),
	schema: rssSchema.extend({ 
		hidden: z.boolean().optional().default(false),
		description: z.string(),
		title: z.string(),
		pubDate: z.date(),
		pdf: z.string().endsWith(".pdf"),
		slides: z.string().endsWith(".pdf").optional(),
	}),
});


export const collections = {
	'posts': postsCollection,
	'papers': papersCollection
}