import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Explore the&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>sunnah of prophet Muhammad.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					ﷺ (SAW)
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					href={siteConfig.links.hadith}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Find Hadith
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						smart hadith search<Code color="primary">البحث الحديث الذكية</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
