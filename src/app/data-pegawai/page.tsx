import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "@/util/data.json";
import { AppSidebar } from "@/components/AppSidebar";
import { cookies } from "next/headers";
import { DataUser, ResponsePayload } from "@/types";
import { DialogDemo } from "@/components/dialog";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://e-arsip-kkp.vercel.app"
      : "http://localhost:3000";

  const response = await fetch(baseUrl + "/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataResponse =
    (await response.json()) as ResponsePayload<DataUser | null>;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        dataUser={dataResponse.status === "failed" ? null : dataResponse.data!}
      />
      <SidebarInset>
        <SiteHeader token={token} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable data={data} />
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
