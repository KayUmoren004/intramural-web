import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type LeaguesProps = {};

const Leagues = ({}: LeaguesProps) => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top */}
      <div className="mb-2 flex flex-row items-center justify-between">
        <span className="text-4xl font-bold">Left</span>
        <div>
          <Button
            onClick={() => console.log("create league")}
            variant="outline"
          >
            Create League
          </Button>
        </div>
      </div>

      {/* Separator */}
      <Separator />

      {/* Body */}
      <div className="mt-4">League</div>
    </div>
  );
};

export default Leagues;
