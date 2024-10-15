import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";


export function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Unlock the power of </span>
        <span className={title({ color: "green" })}>Resume Parsing</span>
        <br />
        <span className={title()}>
          Extract valuable insights from resumes with ease.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Fast, accurate, and customizable resume parsing for your application.
        </div>
      </div>

      <div className="flex gap-3">
        <NextLink
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/resume"
        >
          Get Started
        </NextLink>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          View on GitHub
        </Link>
      </div>

    </section>
  );
}

export default Home;