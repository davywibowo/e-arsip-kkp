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
import { Input } from "@/components/ui/input";
import { DialogAdd } from "@/components/dialog";
import { useMemo, useState } from "react";
import { ResponsePayload } from "@/types";

export const schemaPegawai = z.object({
  id: z.string({ error: "Id is required!" }),
  namaPegawai: z
    .string({ error: "Nama Pegawai is required!" })
    .length(1, { error: "Minimum length of Nama pegawai is 1" }),
  nipLama: z
    .string({ error: "Nip Lama is required!" })
    .regex(/^\d+$/, { error: "NIP Lama must contain only numbers" })
    .length(8, { error: "NIP Lama must be exactly 8 characters" }),
  nipBaru: z
    .string({ error: "Nip Baru is required!" })
    .regex(/^\d+$/, { error: "NIP Baru must contain only numbers" })
    .length(18, { error: "NIP Baru must be exactly 18 characters" }),
  noArsip: z.string({ error: "No Arsip is required!" }),
});

interface TablePegawaiProps {
  dataResponse: ResponsePayload<z.infer<typeof schemaPegawai>[]>;
  includeAdd?: boolean;
  token: string | undefined;
}

export default function TablePegawai(props: TablePegawaiProps) {
  const { dataResponse, includeAdd, token } = props;
  const [valueSearch, setValueSearch] = useState("");
  const columns: ColumnDef<z.infer<typeof schemaPegawai>>[] = [
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
      accessorKey: "namaPegawai",
      header: "Nama Pegawai",
      cell: ({ row }) => {
        return <span>{row.original.namaPegawai}</span>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "nipLama",
      header: "NIP Lama",
      cell: ({ row }) => {
        return <span>{row.original.nipLama}</span>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "nipBaru",
      header: "NIP Baru",
      cell: ({ row }) => {
        return <span>{row.original.nipBaru}</span>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "noArsip",
      header: "No. Arsip",
      cell: ({ row }) => {
        return <span>{row.original.noArsip}</span>;
      },
      enableHiding: false,
    },
    {
      id: "actions",
      cell: () =>
        token && (
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
    const data: z.infer<typeof schemaPegawai>[] = dataResponse.data || [];
    const filteredByNamaPegawai = data.filter((d) =>
      d.namaPegawai.toLowerCase().includes(valueSearch.toLowerCase())
    );

    if (filteredByNamaPegawai.length === 0) {
      const filteredByNIPLama = data.filter((d) =>
        d.nipLama.toLowerCase().includes(valueSearch.toLowerCase())
      );

      if (filteredByNIPLama.length === 0) {
        const filteredByNIPBaru = data.filter((d) =>
          d.nipBaru.toLowerCase().includes(valueSearch.toLowerCase())
        );

        if (filteredByNIPBaru.length === 0) {
          const filteredByNoArsip = data.filter((d) =>
            d.noArsip.toLowerCase().includes(valueSearch.toLowerCase())
          );

          return filteredByNoArsip;
        }

        return filteredByNIPBaru;
      }

      return filteredByNIPLama;
    }

    return filteredByNamaPegawai;
  }, [valueSearch, dataResponse.data]);
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
        {includeAdd && <DialogAdd />}
      </div>
      <DataTable<z.infer<typeof schemaPegawai>>
        data={filteredData}
        columns={columns}
      />
      ;
    </>
  );
}
