import TablePegawai, {
  schemaPegawai,
} from "@/components/pages/data-pegawai/TablePegawai";
import { ResponsePayload } from "@/types";
import z from "zod";

export default async function Page() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://e-arsip-kkp.vercel.app"
      : "http://localhost:3000";

  const response = await fetch(baseUrl + "/api/pegawai", { method: "GET" });
  const dataResponse = (await response.json()) as ResponsePayload<
    z.infer<typeof schemaPegawai>[]
  >;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <TablePegawai dataResponse={dataResponse} />
        </div>
      </div>
    </div>
  );
}
