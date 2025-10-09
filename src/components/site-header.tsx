import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { IconSearch } from "@tabler/icons-react";

export function SiteHeader() {
  return (
    <header className="flex  h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full  h-full relative justify-center items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="absolute flex items-center rounded-md top-1/2 left-1/2 px-3 -translate-x-1/2 -translate-y-1/2 bg-slate-300/50">
            <IconSearch />
            <Input
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:font-normal sm:w-94 justify-center"
              placeholder="Cari Pegawai..."
            />
          </div>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
