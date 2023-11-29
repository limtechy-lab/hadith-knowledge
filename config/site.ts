export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Hadith Knowledge",
	description: "Explore the beautiful sunnah of prophet Muhammad (SAW).",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Hadith",
			href: "/hadith",
		},
		{
			label: "Blog",
			href: "/blog",
		}
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Hadith",
			href: "/hadith",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		twitter: "https://twitter.com/getnextui",
		discord: "https://discord.gg/9b6yyZKmH4",
    	donate: "https://patreon.com/jrgarciadev"
	},
};
