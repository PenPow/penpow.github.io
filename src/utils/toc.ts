import type { MarkdownHeading } from "astro";

export type RecursiveMarkdownHeading = MarkdownHeading & { subheadings: RecursiveMarkdownHeading[] };
export function makeTOC(headings: MarkdownHeading[]) {
	const toc: RecursiveMarkdownHeading[] = [];
	const parentHeadings = new Map<number, RecursiveMarkdownHeading>();

	headings.forEach(h => {
		if(h.slug === "footnote-label") return;

		const heading = { ...h, subheadings: [] };
		
		parentHeadings.set(heading.depth, heading);

		if(heading.depth === 1) toc.push(heading);
		else parentHeadings.get(heading.depth - 1)!.subheadings.push(heading);
	});

	return toc;
}