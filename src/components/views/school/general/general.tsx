import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateSport from "../sport/create-sport";

type GeneralProps = {};

const General = ({}: GeneralProps) => {
  return (
    <Sheet>
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Top */}
        <div className="mb-2 flex flex-row items-center justify-between">
          <span className="text-4xl font-bold">Left</span>
          <SheetTrigger asChild>
            <Button onClick={() => console.log("settings")} variant="outline">
              Settings
            </Button>
          </SheetTrigger>
        </div>

        {/* Separator */}
        <Separator />

        {/* Body */}
        <div className="mt-4">General</div>

        {/* Sheet */}
      </div>
    </Sheet>
  );
};

export default General;
