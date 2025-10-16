"use client";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table";
import { DragHandle } from "@/components/Draghandler";
import { ResponsePayload } from "@/types";
import RoleCell from "@/components/RoleCell";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

export const schemaUser = z.object({
  id: z.number({ error: "Id is required!" }),
  name: z.string({ error: "Fill name properly!" }),
  username: z.string({ error: "Fill username properly!" }),
  role: z.enum(["USER", "ADMIN"], { error: "Role must be a USER or ADMIN" }),
});

interface TableUserProps {
  response: ResponsePayload<z.infer<typeof schemaUser>[]>;
}
export default function TableUser(props: TableUserProps) {
  const { response } = props;
  const [valueSearch, setValueSearch] = useState("");

  const columns: ColumnDef<z.infer<typeof schemaUser>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => (
        <span>
          {row.index + 1} <DragHandle id={row.original.id} />
        </span>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => {
        return <span>{row.original.username}</span>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <span>{row.original.name}</span>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "role",
      header: "ROLE",
      cell: ({ row }) => {
        return <RoleCell roleUser={row.original.role} />;
      },
      enableHiding: false,
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const data: z.infer<typeof schemaUser>[] = response.data || [];
    const filteredByUsername = data.filter((d) =>
      d.username.toLowerCase().includes(valueSearch.toLowerCase())
    );

    if (filteredByUsername.length === 0) {
      const filteredByName = data.filter((d) =>
        d.name.toLowerCase().includes(valueSearch.toLowerCase())
      );

      if (filteredByName.length === 0) {
        const filteredByRole = data.filter((d) =>
          d.role.toLowerCase().includes(valueSearch.toLowerCase())
        );

        return filteredByRole;
      }

      return filteredByName;
    }

    return filteredByUsername;
  }, [valueSearch, response.data]);

  return (
    <>
      <div className="w-full flex justify-between px-6">
        <div className="flex items-center rounded-md px-3 bg-slate-300/50 w-[326px]">
          <IconSearch className="mr-2" />
          <Input
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
            type="search"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:font-normal"
            placeholder="Cari Pegawai..."
          />
        </div>
      </div>
      <DataTable<z.infer<typeof schemaUser>>
        data={filteredData}
        columns={columns}
      />
    </>
  );
}
