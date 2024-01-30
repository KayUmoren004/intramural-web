import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CreateSport from "./create-sport";
import { useGetSports } from "@/components/hooks/school/useSport";
import { useSession } from "next-auth/react";
import { ViewError, ViewSkeleton } from "../views";
import { DataTable } from "./table/data-table";
import { useColumns } from "./table/columns";

type SportsProps = {};

const Sports = ({}: SportsProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { columns } = useColumns();

  const { data, isLoading, isError, error, refetch } = useGetSports(
    schoolId as string
  );

  if (isLoading || !data) return <ViewSkeleton />;

  if (isError)
    return <ViewError title="Sports" message={error?.message as string} />;

  return (
    <Sheet>
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Top */}
        <div className="mb-2 flex flex-row items-center justify-between">
          <span className="text-4xl font-bold">Sports</span>
          <div>
            <SheetTrigger asChild>
              <Button variant="outline">Create Sport</Button>
            </SheetTrigger>
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Body */}
        <div className="mt-4">
          <DataTable data={data} columns={columns} />
        </div>

        {/* Sheet */}
        <CreateSport refetch={refetch} />
      </div>
    </Sheet>
  );
};

export default Sports;
