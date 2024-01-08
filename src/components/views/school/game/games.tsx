import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

type GameProps = {};

const Games = ({}: GameProps) => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top */}
      <div className="mb-2 flex flex-row items-center justify-between">
        <span className="text-4xl font-bold">Left</span>
        <div>
          <Button onClick={() => console.log("save")} variant="outline">
            Settings
          </Button>
        </div>
      </div>

      {/* Separator */}
      <Separator />

      {/* Body */}
      <div className="mt-4">Game</div>
    </div>
  );
};

export default Games;
