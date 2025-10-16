"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PegawaiValidation from "@/validation/pegawai-validation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ResponseError from "@/error/ResponseError";
import toast from "react-hot-toast";
import { ResponsePayload } from "@/types";
import Loader from "./Loader";
import { useTableStore } from "@/store/useTableStore";

export function DialogAdd() {
  const formData = useForm<z.infer<typeof PegawaiValidation.CREATEPEGAWAI>>({
    resolver: zodResolver(PegawaiValidation.CREATEPEGAWAI),
    mode: "onChange",
    defaultValues: {
      namaPegawai: "",
      nipBaru: "",
      nipLama: "",
      noArsip: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { setIsChange } = useTableStore();
  const [open, setOpen] = useState(false);

  async function handleSubmit(
    values: z.infer<typeof PegawaiValidation.CREATEPEGAWAI>
  ) {
    setLoading(true);
    try {
      const response = await fetch("/api/pegawai", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);
      setIsChange(true)
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later");
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading) setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formData.handleSubmit(handleSubmit)();
          }}
          className="space-y-5"
        >
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
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
                {...formData.register("namaPegawai")}
              />

              {formData.formState.errors.namaPegawai && (
                <span className="text-red-600 text-xs font-semibold">
                  {formData.formState.errors.namaPegawai.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nipLama">NIP Lama</Label>
              <Input
                id="nipLama"
                placeholder="13386652"
                {...formData.register("nipLama")}
              />
              {formData.formState.errors.nipLama && (
                <span className="text-red-600 text-xs font-semibold">
                  {formData.formState.errors.nipLama.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="nipBaru">NIP Baru</Label>
              <Input
                id="nipBaru"
                placeholder="19659867 198754 1 001"
                {...formData.register("nipBaru")}
              />
              {formData.formState.errors.nipBaru && (
                <span className="text-red-600 text-xs font-semibold">
                  {formData.formState.errors.nipBaru.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="noArsip">No. Arsip</Label>
              <Input
                id="noArsip"
                placeholder="A 36"
                {...formData.register("noArsip")}
              />
              {formData.formState.errors.noArsip && (
                <span className="text-red-600 text-xs font-semibold">
                  {formData.formState.errors.noArsip.message}
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
            <Button
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
                formData.handleSubmit(handleSubmit)();
              }}
              disabled={loading}
              className="cursor-pointer"
            >
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
