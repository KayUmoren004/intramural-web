"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <ModeToggle />
      <Button onClick={() => router.push("/web/hws/dashboard")}>
        Click me
      </Button>
    </div>
  );
}
