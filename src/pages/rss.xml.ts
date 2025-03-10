import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { siteConfig } from '@site-config';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
	if(!context.site) throw new Error("You must add site to the astro config");

	const posts = await getCollection("posts");

	return rss({
		title: `PenPow's Blog`,
		description: siteConfig.description,
		site: context.site,
		items: posts.map(post => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: "<language>en-gb</language>",
			link: `/posts/${post.id}`
		})),
	});
}
