import Link from "next/link";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "../../ui/icons";
import { MainNav } from "./main-nav";
import User from "./User";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/default bg-zinc-900 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14 items-center px-6">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            Command Menu
          </div> */}
          <nav className="flex items-center justify-center space-x-2">
            {/* <Link
              href={"siteConfig.links.github"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={"siteConfig.links.twitter"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ModeToggle />

            <User />
          </nav>
        </div>
      </div>
    </header>
  );
}
