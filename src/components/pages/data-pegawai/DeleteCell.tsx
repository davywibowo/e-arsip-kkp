"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResponseError from "@/error/ResponseError";
import { useTableStore } from "@/store/useTableStore";
import { DataUser, ResponsePayload } from "@/types";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteCell({
  item,
  token,
}: {
  item: DataUser;
  token: string | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setIsChange } = useTableStore();
  async function handleDeleteUser() {
    setLoading(true);
    try {
      if (item.isYou) {
        throw new ResponseError(401, "Oops! You can't delete yourself!");
      }

      const response = await fetch("/api/user?id=" + item.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);
      setIsChange(true);
      setOpen(false);
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
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          type="button"
          className="cursor-pointer"
          size={"icon"}
        >
          <IconTrash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure want to delete {item.username}?
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
            onClick={handleDeleteUser}
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
