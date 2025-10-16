"use client";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table";
import { DragHandle } from "@/components/Draghandler";
import { Input } from "@/components/ui/input";
import { DialogAdd } from "@/components/dialog";
import { useEffect, useMemo, useState } from "react";
import { DataPegawai, ResponsePayload } from "@/types";
import DialogEdit from "@/components/DialogEdit";
import { useTableStore } from "@/store/useTableStore";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";

export const schemaPegawai = z.object({
  id: z.number({ error: "Id is required!" }),
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
  const { isChange, setIsChange } = useTableStore();
  const [dataPegawai, setData] = useState<DataPegawai[]>(
    dataResponse.data || []
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/pegawai", { method: "GET" });
        const dataResponse = (await response.json()) as ResponsePayload<
          DataPegawai[]
        >;
        if (dataResponse.status === "failed") {
          throw new ResponseError(
            dataResponse.statusCode,
            dataResponse.message
          );
        }

        setData(dataResponse.data || []);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
          return;
        }

        toast.error("An error occured!");
      }
    };

    if (isChange) {
      getData();
      setIsChange(false);
    }
  }, [isChange, setIsChange]);

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
      cell: ({ row }) =>
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
              <DialogEdit item={row.original} />
              <DropdownMenuSeparator />
              <DialogDelete item={row.original} />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
    },
  ];

  const filteredData = useMemo(() => {
    const data: z.infer<typeof schemaPegawai>[] = dataPegawai || [];
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
  }, [valueSearch, dataPegawai]);

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
