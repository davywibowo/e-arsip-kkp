"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loader from "./Loader";
import { DataPegawai, ResponsePayload } from "@/types";
import { useForm } from "react-hook-form";
import z from "zod";
import PegawaiValidation from "@/validation/pegawai-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTableStore } from "@/store/useTableStore";

export default function DialogEdit({ item }: { item: DataPegawai }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof PegawaiValidation.PATCHPEGAWAI>>({
    resolver: zodResolver(PegawaiValidation.PATCHPEGAWAI),
    mode: "onChange",
    defaultValues: {
      id: item.id as number,
      namaPegawai: item.namaPegawai,
      nipBaru: item.nipBaru,
      nipLama: item.nipLama,
      noArsip: item.noArsip,
    },
  });
  const router = useRouter();
  const { setIsChange } = useTableStore();

  async function handleSubmit(
    values: z.infer<typeof PegawaiValidation.PATCHPEGAWAI>
  ) {
    setLoading(true);
    try {
      if (values.nipBaru === "-" && values.nipLama === "-") {
        throw new ResponseError(405, "Only one nip can add '-'");
      }
      
      const response = await fetch("/api/pegawai", {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse =
        (await response.json()) as ResponsePayload<DataPegawai>;

      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);

      form.reset({
        id: dataResponse.data?.id as number,
        namaPegawai: dataResponse.data?.namaPegawai,
        nipBaru: dataResponse.data?.nipBaru,
        nipLama: dataResponse.data?.nipLama,
        noArsip: dataResponse.data?.noArsip,
      });

      setOpen(false);
      setIsChange(true);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        if (error.status === 403) {
          router.push("/auth/login");
        }
      } else {
        toast.error("An error occured! Please try again later");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading) setOpen(nextOpen);
      }}
    >
      <DialogTrigger className="w-full">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit)();
          }}
          className="space-y-5"
        >
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="namaPegawai">Nama Pegawai</Label>
              <Input
                id="namaPegawai"
                placeholder="Cristiano Ronaldo"
                {...form.register("namaPegawai")}
              />

              {form.formState.errors.namaPegawai && (
                <span className="text-red-600 text-xs font-semibold">
                  {form.formState.errors.namaPegawai.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nipLama">NIP Lama</Label>
              <Input
                id="nipLama"
                placeholder="13386652"
                {...form.register("nipLama")}
              />
              {form.formState.errors.nipLama && (
                <span className="text-red-600 text-xs font-semibold">
                  {form.formState.errors.nipLama.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nipBaru">NIP Baru</Label>
              <Input
                id="nipBaru"
                {...form.register("nipBaru")}
                placeholder="19659867 198754 1 001"
              />

              {form.formState.errors.nipBaru && (
                <span className="text-red-600 text-xs font-semibold">
                  {form.formState.errors.nipBaru.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="noArsip">No Arsip</Label>
              <Input
                {...form.register("noArsip")}
                id="noArsip"
                placeholder="A 36"
              />
              {form.formState.errors.noArsip && (
                <span className="text-red-600 text-xs font-semibold">
                  {form.formState.errors.noArsip.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild disabled={loading}>
              <Button variant="outline" disabled={loading} type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="cursor-pointer">
              {loading ? (
                <>
                  <Loader />
                  <span>Save changes</span>
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
