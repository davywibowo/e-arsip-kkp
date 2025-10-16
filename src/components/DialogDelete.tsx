"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import ResponseError from "@/error/ResponseError";
import { DataPegawai, ResponsePayload } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTableStore } from "@/store/useTableStore";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function DialogDelete({ item }: { item: DataPegawai }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsChange } = useTableStore();

  async function handleDeletePegawai() {
    setLoading(true);
    try {
      const response = await fetch("/api/pegawai?id=" + item.id, {
        method: "DELETE",
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);
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
    <Dialog>
      <DialogTrigger className="w-full">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          variant="destructive"
          className={cn(
            loading ? "cursor-not-allowed" : "cursor-pointer",
            "w-full"
          )}
        >
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogDescription>
            Are you sure want to delete {item.namaPegawai}?
          </DialogDescription>
        </DialogHeader>
        <div className="w-full mt-4 flex items-center gap-x-4 justify-center">
          <DialogClose asChild disabled={loading}>
            <Button disabled={loading} type="button" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={handleDeletePegawai}
            disabled={loading}
            type="button"
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
