
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { languages } from '../i18n/ui';
import { siteConfig } from '../site.config';

export async function GET(context) {
	const supportedLocales = new Set(Object.keys(languages));
	const blog = (await getCollection('blog')).filter((post) =>
		supportedLocales.has(post.id.split('/')[0])
	);
	// Changelog/update entries are intentionally kept out of the public RSS feed
	// so those reusable pages are not promoted to search engines.
	// const changelog = await getCollection('changelog');

	const items = [
		...blog.map((post) => {
			const [lang, ...slugParts] = post.id.split('/');
			const slug = slugParts.join('/').replace(/\.[^/.]+$/, '');

			return {
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: `/${lang}/blog/${slug}/`,
			};
		}),
		// ...changelog.map((entry) => ({
		// 	title: `${entry.data.version} - ${entry.data.title}`,
		// 	pubDate: entry.data.pubDate,
		// 	description: entry.data.description,
		// 	link: `/changelog#${entry.data.version.replace(/\./g, '-')}`,
		// })),
	].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

	return rss({
		title: siteConfig.name,
		description: siteConfig.description,
		site: context.site,
		items: items,
		trailingSlash: false,
	});
}
