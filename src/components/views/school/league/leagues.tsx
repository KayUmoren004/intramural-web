import {
  useGetLeagues,
  useGetSchoolLeagues,
} from "@/components/hooks/school/useLeague";
import { useGetSport } from "@/components/hooks/school/useSport";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CreateLeague from "./create-league";
import { DataTable } from "./table/data-table";

import { useParams } from "next/navigation";

import { League } from "@/lib/types/entities";
import { useColumns } from "./columns";
import { ViewError, ViewSkeleton } from "../views";

type LeaguesProps = {};

const Leagues = ({}: LeaguesProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { sportId } = useParams();

  // Get all sports
  const {
    data: sport,
    isLoading: sportIsLoading,
    isError: sportIsError,
    error: sportError,
  } = useGetSport(schoolId as string, sportId as string);

  // Get all leagues for a school
  const {
    data: leagues,
    isLoading: leaguesIsLoading,
    isError: leaguesIsError,
    error: leaguesError,
    refetch,
  } = useGetSchoolLeagues(schoolId as string);

  const { columns } = useColumns();

  if (sportIsLoading || leaguesIsLoading || !leagues || !sport)
    return <ViewSkeleton />;
  if (sportIsError)
    return <ViewError title="Leagues" message={sportError.message} />;
  if (leaguesIsError)
    return <ViewError title="Leagues" message={leaguesError.message} />;

  // Generate table data
  const tableData = leagues.map((league) => {
    // const sport = sport.
    return {
      ...league,
      sport: sport.name,
      startDate: new Date(league.startDate).toLocaleDateString(),
      endDate: new Date(league.endDate).toLocaleDateString(),
    };
  });

  return (
    <Sheet>
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Top */}
        <div className="mb-2 flex flex-row items-center justify-between">
          <span className="text-4xl font-bold">Leagues</span>
          <div>
            <SheetTrigger asChild>
              <Button variant="outline">Create League</Button>
            </SheetTrigger>
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Body */}
        <div className="mt-4">
          <DataTable data={tableData} columns={columns} />
        </div>

        {/* Sheet */}
        <CreateLeague refetch={refetch} sport={sport} />
      </div>
    </Sheet>
  );
};

export default Leagues;
