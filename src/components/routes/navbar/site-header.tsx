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

{
  /* <div
          id="with-sidebar"
          className="h-full bg-background hide-scrollbar w-64 overflow-auto border-r border-border/40"
        >
          <div className="mb-2">
            <div className="flex h-12 max-h-12 items-center px-6 border-border/40">
              <h4 className="mb- text-lg truncate" title="Dashboard">
                Dashboard
              </h4>
            </div>
          </div>
          <div className="-mt-2 border-t">
            <nav>
              <ul>
                <div className="border-b py-5 px-6 border-border/40">
                  <div className=" flex space-x-3 mb-2 font-normal  ">
                    <span className="text-sm text-foreground-lighter w-full">
                      Projects
                    </span>
                  </div>
                  <ul className="space-y-1">
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/projects"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="All projects"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          All projects
                        </span>
                      </span>
                    </a>
                  </ul>
                </div>
                <div className="border-b py-5 px-6 border-border/40">
                  <div className=" flex space-x-3 mb-2 font-normal  ">
                    <span className="text-sm text-foreground-lighter w-full">
                      Organizations
                    </span>
                  </div>
                  <ul className="space-y-1">
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/org/vlrhgtyiluogkafcbsrb/general"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="hws.Code()"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          hws.Code()
                        </span>
                      </span>
                    </a>
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/org/invisible-turquoise-marmot/general"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="KayUmoren004's Org"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          KayUmoren004's Org
                        </span>
                      </span>
                    </a>
                  </ul>
                </div>
                <div className="border-b py-5 px-6 border-border/40">
                  <div className=" flex space-x-3 mb-2 font-normal  ">
                    <span className="text-sm text-foreground-lighter w-full">
                      Account
                    </span>
                  </div>
                  <ul className="space-y-1">
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/account/me"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="Preferences"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          Preferences
                        </span>
                      </span>
                    </a>
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/account/tokens"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="Access Tokens"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          Access Tokens
                        </span>
                      </span>
                    </a>
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/account/security"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="Security"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          Security
                        </span>
                      </span>
                    </a>
                    <a
                      className="block"
                      target="_self"
                      href="/dashboard/account/audit"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span
                          title="Audit Logs"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          Audit Logs
                        </span>
                      </span>
                    </a>
                  </ul>
                </div>
                <div className="border-b py-5 px-6 border-border/40">
                  <div className=" flex space-x-3 mb-2 font-normal  ">
                    <span className="text-sm text-foreground-lighter w-full">
                      Documentation
                    </span>
                  </div>
                  <ul className="space-y-1">
                    <a
                      className="block"
                      target="_blank"
                      href="https://supabase.com/docs"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span className="truncate text-sm text-foreground-lighter transition group-hover:text-foreground-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="sbui-icon"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </span>
                        <span
                          title="Guides"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          Guides
                        </span>
                      </span>
                    </a>
                    <a
                      className="block"
                      target="_blank"
                      href="https://supabase.com/docs/guides/api"
                    >
                      <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-border/40 py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                        <span className="truncate text-sm text-foreground-lighter transition group-hover:text-foreground-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="sbui-icon"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </span>
                        <span
                          title="API Reference"
                          className="w-full truncate text-sm text-foreground-light transition group-hover:text-foreground"
                        >
                          API Reference
                        </span>
                      </span>
                    </a>
                  </ul>
                </div>
                <div className="border-b py-5 px-6 border-border/40">
                  <ul className="space-y-1">
                    <li
                      role="menuitem"
                      className="cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1 ring-foreground-muted focus-visible:z-10 group py-1 font-normal border-border/40 group-hover:border-foreground-muted"
                      //   style="margin-left: 0rem;"
                      style={{ marginLeft: "0rem" }}
                    >
                      <div className="transition truncate text-sm text-foreground-lighter group-hover:text-foreground-light min-w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="sbui-icon"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                      </div>
                      <span className="transition truncate text-sm w-full text-foreground-light group-hover:text-foreground">
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              </ul>
            </nav>
          </div>
        </div> */
}
