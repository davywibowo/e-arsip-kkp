"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ResponseError from "@/error/ResponseError";
import { cn } from "@/lib/utils";
import { ResponsePayload } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SiteHeaderProps {
  token: string | undefined;
}

export function SiteHeader(props: SiteHeaderProps) {
  const { token } = props;

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogout() {
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.statusCode, dataResponse.message);
      }

      toast.success(dataResponse.message);

      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
        return;
      }
      toast.error("An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  }

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
          {token ? (
            <Button
              disabled={loading}
              onClick={handleLogout}
              variant={loading ? "ghost" : "destructive"}
              asChild
              size="sm"
              className={cn(
                "hidden sm:flex ",
                loading ? "cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex"
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
