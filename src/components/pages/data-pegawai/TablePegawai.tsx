"use client";
import data from "@/util/data.json";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import TableCellViewer from "@/components/TableCellViewer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, schema } from "@/components/data-table";
import { DragHandle } from "@/components/Draghandler";
import { Input } from "@/components/ui/input";
import { DialogAdd } from "@/components/dialog";

export default function TablePegawai() {
  const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => (
        <span>
          {row.index + 1}. <DragHandle id={row.original.id} />
        </span>
      ),
    },
    {
      accessorKey: "Nama Pegawai",
      header: "Nama Pegawai",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "nip lama",
      header: "NIP Lama",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "nip baru",
      header: "NIP Baru",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "no.arsip",
      header: "No. Arsip",
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />;
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
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <>
      <div className="w-full flex justify-between px-6">
        <div className="flex items-center rounded-md px-3 bg-slate-300/50 w-[326px]">
          <IconSearch className="mr-2" />
          <Input
            type="search"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:font-normal"
            placeholder="Cari Pegawai..."
          />
        </div>
        <DialogAdd />
      </div>
      <DataTable data={data} columns={columns} />;
    </>
  );
}
