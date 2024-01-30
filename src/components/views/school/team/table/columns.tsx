"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {} from "../table.config";
import { TableType } from "../table.config";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";

export const useColumns = () => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { school, leagueId } = useParams();

  // console.log("schoolId", schoolId);
  // console.log("school", school);
  // console.log("leagueId", leagueId);

  const columns: ColumnDef<TableType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">
          <Link
            href={`/web/${school}/school/team/${row.getValue(
              "id"
            )}?leagueId=${leagueId}`}
            passHref
          >
            <span className="cursor-pointer max-w-[500px] truncate font-medium no-underline hover:underline hover:text-blue-500">
              {String(row.getValue("id")).split("-")[0] + "..."}
            </span>
          </Link>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        // const label = divisions.find(
        //   (label) => label.value === row.original.division
        // );

        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "captain",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Captain" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">
          <span>{row.getValue("captain")}</span>
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "sport",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sport" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[100px] items-center">
            <span>{row.getValue("sport")}</span>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "league",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="League" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[100px] items-center">
            <span>{row.getValue("league")}</span>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  return { columns };
};
