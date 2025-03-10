import type { Language } from "@utils/languages";
import DesignLogo from "@assets/design-logo.webp";
import SentryLogo from "@assets/sentry.png";
import BadgesIcon from "@assets/badges.svg";
import GambitIcon from "@assets/gambit.svg";

export type SiteConfig = {
	author: string;
	title: string;
	description: string;
	lang: string;
	ogLocale: string;
};

export const siteConfig: SiteConfig = {
	author: "Joshua Clements",
	title: "PenPow",
	description: "I make computers do stuff",
	lang: "en-GB",
	ogLocale: "en_GB",
};

export type LocalProject = {
	type: "local"

	name: string,
	description: string,

	language: Language

	icon: ImageMetadata | string,

	url?: string | undefined,
}

export type RemoteProject = {
	type: "remote"
	repo: `${string}/${string}`
} & Partial<Omit<LocalProject, "type" | "name">>

export type Project = LocalProject | RemoteProject;
export const projects: Project[] = [
	{
		type: "remote",
		repo: "PenPow/Sentry",
		description: "Discord moderation bot designed to catch malicious files and links.",
		icon: SentryLogo
	},
	{
		type: "remote",
		repo: "PenPow/Badges",
		url: "https://badges.penpow.dev",
		icon: BadgesIcon,
		language: "Astro",
	},
	{
		type: "local",
		name: "</design>",
		description: "Community manager at </design> a development community of 600 web developers from June 2020 to February 2023.",
		language: "Social",
		icon: DesignLogo
	},
	{
		type: "remote",
		repo: "PenPow/Gambit",
		description: "A chess engine built using Rust",
		icon: GambitIcon
	},
	{
		type: "remote",
		repo: "PenPow/LegacyNapoleon",
		description: "A Risk-inspired battle simulator game designed for the ISA Coding Competition 2024."
	},
]