import ResponseError from "@/error/ResponseError";
import { supabase } from "@/lib/supabase/server";
import { DataPegawai, ResponsePayload } from "@/types";

export default class StatsService {
  static async getAllStatistic(): Promise<ResponsePayload> {
    const dataPegawai = await supabase.from("pegawai").select("*");
    if (dataPegawai.error) {
      throw new ResponseError(
        503,
        "An error while get Stats! Please try again later"
      );
    }

    const totalOfEmployee = dataPegawai.data.length;
    const totalOfNipLama = (
      dataPegawai.data.filter(
        (d: DataPegawai) => d.nipLama !== "-"
      ) as DataPegawai[]
    ).length;
    const totalOfNipBaru = dataPegawai.data.filter(
      (d: DataPegawai) => d.nipBaru !== "-"
    ).length;

    return {
      status: "success",
      message: "Successfully get statistic",
      statusCode: 200,
      data: {
        totalEmployee: totalOfEmployee,
        totalNipLama: totalOfNipLama,
        totalNipBaru: totalOfNipBaru,
      },
    };
  }
}
