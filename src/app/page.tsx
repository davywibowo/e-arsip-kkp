import TablePegawai from "@/components/pages/data-pegawai/TablePegawai";
import { SectionCards } from "@/components/section-cards";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />

          <TablePegawai />
        </div>
      </div>
    </div>
  );
}
