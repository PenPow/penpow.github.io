import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
// import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import expressiveCode, { type AstroExpressiveCodeOptions } from "astro-expressive-code";
// @ts-expect-error no types but no types needed
import a11yEmoji from '@fec/remark-a11y-emoji';
import { remarkReadingTime } from './src/utils/remark/remark-reading-time';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

const astroExpressiveCodeOptions: AstroExpressiveCodeOptions = {
	// Example: Change the themes
	themes: ['github-dark', 'github-light'],
	minSyntaxHighlightingColorContrast: 0,
	defaultLocale: "en-GB",
	styleOverrides: {
		codeFontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
	},
	// @ts-ignore seems to be having problems with typescript when cloudflare deploys?
	plugins: [pluginCollapsibleSections()] // FIXME: investigate
}

// https://astro.build/config
export default defineConfig({
  site: "https://www.penpow.dev",
  integrations: [icon(), robotsTxt(), sitemap(), tailwind(), expressiveCode(astroExpressiveCodeOptions), mdx()/*, compress()*/],
  markdown: {
	remarkPlugins: [a11yEmoji, remarkReadingTime],
  },
  image: {
    domains: ['avatars.githubusercontent.com']
  }
});