import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import type { Root } from 'mdast';

interface RemarkPluginData {
	data: {
		astro: {
			frontmatter: Record<string, any>;
		};
	};
}

export function remarkReadingTime() {
	return function (tree: Root, { data }: RemarkPluginData) {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);

		data.astro.frontmatter.minutesRead = readingTime.text;
	};
}