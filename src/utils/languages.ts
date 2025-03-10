type HexColour = `#${string}`
export const languageColours = {
	'Astro': '#ff5903',
	'JavaScript': '#f1e15a',
	'Python': '#3573a6',
	'Social': '#5662f6',
	'TypeScript': '#3178c6',
	'Rust': '#dea584',
	'Unknown': '#a1a1aa'
} satisfies Record<string, HexColour>

export type Language = keyof typeof languageColours;