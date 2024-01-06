import Link from "next/link";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "./icons";
import { ColorWheelIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

export function SiteSide() {
  return (
    <section className="h-full hide-scrollbar w-14 overflow-auto border-r border-border/default   bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Header */}
      <div className="flex flex-col items-center justify-center p-2 space-y-4">
        <ColorWheelIcon className="h-8 w-8 text-primary" />
        <ColorWheelIcon className="h-8 w-8 text-primary" />
        <Separator />
        <ColorWheelIcon className="h-8 w-8 mt-2 text-primary" />
      </div>
    </section>
  );
}
