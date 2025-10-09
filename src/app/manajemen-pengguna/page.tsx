import TableUser from "@/components/pages/manajemen-pengguna/TableUser";
import { DataUser, ResponsePayload } from "@/types";
import { cookies } from "next/headers";

export default async function ManajemenPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://e-arsip-kkp.vercel.app"
      : "http://localhost:3000";
  const response = await fetch(baseUrl + "/api/user?all=true", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataResponse = (await response.json()) as ResponsePayload<DataUser[]>;
  console.log(dataResponse);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <TableUser />
        </div>
      </div>
    </div>
  );
}
