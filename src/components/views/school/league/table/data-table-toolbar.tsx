"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

// import { divisions } from "../table.config";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useSession } from "next-auth/react";
import { useGetSports } from "@/components/hooks/school/useSport";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const test = [
  {
    label: "Soccer",
    value: "Soccer",
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // const { data: session } = useSession();
  // const schoolId = session?.user.schoolId;

  // const {
  //   data,
  //   isLoading: sportsIsLoading,
  //   isError: sportsIsError,
  //   error: sportsError,
  // } = useGetSports(schoolId as string);

  // if (sportsIsLoading || !data) return null;

  // const sports = data.map((sport) => ({
  //   label: String(sport.name),
  //   value: String(sport.name),
  // }));

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter sports..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("sport") && (
          <DataTableFacetedFilter
            column={table.getColumn("sport")}
            title="Sport"
            options={test}
          />
        )} */}
        {/* {table.getColumn("sport") && (
          <DataTableFacetedFilter
            column={table.getColumn("sport")}
            title="Sport"
            options={test}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
