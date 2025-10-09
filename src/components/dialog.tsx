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

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nama</Label>
              <Input id="name-1" name="name" placeholder="Cristiano Ronaldo" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">NIP Lama</Label>
              <Input id="username-1" name="niplama" placeholder="13386652" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">NIP Baru</Label>
              <Input
                id="username-1"
                name="nipbaru"
                placeholder="19659867 198754 1 001"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">NO. Arsip</Label>
              <Input id="username-1" name="noarsip" placeholder="A 36" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
