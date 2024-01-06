"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "../../ui/icons";
import { ColorWheelIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "../../ui/toggle";
import {
  Trophy,
  User,
  LayoutDashboard,
  BookUser,
  Settings2,
  School,
} from "lucide-react";
import { Config } from "./sidebar.config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  FiCalendar,
  FiFolder,
  FiHome,
  FiTool,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { usePathname } from "next/navigation";

// Icon Map
const icons: any = {
  user: <User className="h-6 w-6" />,
  dashboard: <LayoutDashboard className="h-6 w-6" />,
  users: <BookUser className="h-6 w-6" />,
  settings: <Settings2 className="h-6 w-6" />,
  school: <School className="h-6 w-6" />,
};

export function SiteSide() {
  const { sidebarConfig } = Config();
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <section className="h-full hide-scrollbar w-14 border-r z-50 border-border/default bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Header */}
        <div className="h-full flex flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-between p-2 gap-6 mt-14">
            {/* <Link
              href="/"
              className="flex flex-col items-center justify-center text-indigo-500"
            >
              <Trophy fill="indigo" className="h-6 w-6" />
            </Link> */}

            {sidebarConfig.links.map((item, idx) => {
              return (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <Link
                      className={`flex flex-col items-center justify-center transition-colors duration-200 ease-in-out p-2 rounded-md
                  ${
                    pathname === item.href
                      ? "bg-foreground/20"
                      : "hover:bg-foreground/20"
                  }
                  `}
                      href={item.href}
                      key={item.label}
                    >
                      {icons[item.icon] ? icons[item.icon] : <FiUser />}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    className="ml-2 border border-foreground/20 bg-background text-primary"
                    align="center"
                    side="right"
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-center p-2 space-y-4 mb-4">
            <ColorWheelIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
