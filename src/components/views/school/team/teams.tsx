import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { ViewError, ViewSkeleton } from "../views";
import { useColumns } from "./table/columns";
import { useGetTeams } from "@/components/hooks/school/useTeam";
import { useParams } from "next/navigation";
import { DataTable } from "../league/table/data-table";
type TeamsProps = {};

const Teams = ({}: TeamsProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { columns } = useColumns();

  const { leagueId } = useParams();

  const {
    data: teams,
    isLoading: teamsIsLoading,
    isError: teamsIsError,
    error: teamsError,
    refetch,
  } = useGetTeams(leagueId as string);

  if (teamsIsLoading || !teams) return <ViewSkeleton />;

  if (teamsIsError)
    return <ViewError title="Teams" message={teamsError.message} />;

  console.log(teams);

  // Generate table data
  const tableData = teams.map((team) => {
    return {
      ...team,
      captain: team?.captain?.name,
      sport: team?.league?.sport?.name,
      league: team?.league?.name,
    };
  });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top */}
      <div className="mb-2 flex flex-row items-center justify-between">
        <span className="text-4xl font-bold">Teams</span>
        <div>
          {/* <SheetTrigger asChild>
              <Button variant="outline">Create Sport</Button>
            </SheetTrigger> */}
        </div>
      </div>

      {/* Separator */}
      <Separator />

      {/* Body */}
      <div className="mt-4">
        <DataTable data={tableData} columns={columns} />
      </div>

      {/* Sheet */}
      {/* <CreateSport refetch={refetch} /> */}
    </div>
  );
};

export default Teams;
