"use client";
import { IconDotsVertical } from "@tabler/icons-react";
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

export const schemaUser = z.object({
  id: z.string({ error: "Id must be a string" }),
  name: z.string({ error: "Fill name properly!" }),
  username: z.string({ error: "Fill username properly!" }),
  role: z.enum(["USER", "ADMIN"], { error: "Role must be a USER or ADMIN" }),
});

interface TableUserProps {
  response: ResponsePayload<z.infer<typeof schemaUser>[]>;
}

export default function TableUser(props: TableUserProps) {
  const { response } = props;

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

  const data: z.infer<typeof schemaUser>[] = response.data || [];

  return (
    <DataTable<z.infer<typeof schemaUser>> data={data} columns={columns} />
  );
}
