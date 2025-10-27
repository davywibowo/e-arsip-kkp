import ResponseError from "@/error/ResponseError";
import { supabase } from "@/lib/supabase/server";
import { DataPegawai, ResponsePayload } from "@/types";

export default class PegawaiService {
  static async createPegawai(
    data: Omit<DataPegawai, "id">
  ): Promise<ResponsePayload> {
    if (data.nipLama !== "-") {
      const dataPegawaiNipLama = await supabase
        .from("pegawai")
        .select("*")
        .eq("nipLama", data.nipLama);

      if (dataPegawaiNipLama.error) {
        throw new ResponseError(503, "An error while create data Pegawai!");
      }

      if (dataPegawaiNipLama.data?.length > 0) {
        throw new ResponseError(401, "Oops! NIP Lama has been registered!");
      }
    }

    if (data.nipBaru !== "-") {
      const dataPegawaiNipBaru = await supabase
        .from("pegawai")
        .select("*")
        .eq("nipBaru", data.nipBaru);

      if (dataPegawaiNipBaru.error) {
        throw new ResponseError(503, "An error while create data Pegawai!");
      }

      if (dataPegawaiNipBaru.data.length > 0) {
        throw new ResponseError(401, "Oops! NIP Baru has been registered!");
      }
    }

    const dataPegawaiNoArsip = await supabase
      .from("pegawai")
      .select("*")
      .eq("noArsip", data.noArsip);

    if (dataPegawaiNoArsip.error) {
      throw new ResponseError(503, "An error while create data Pegawai!");
    }

    if (dataPegawaiNoArsip.data.length > 0) {
      throw new ResponseError(401, "Oops! No Arsip has been registered!");
    }

    const createdPegawai = await supabase.from("pegawai").insert({
      namaPegawai: data.namaPegawai,
      nipLama: data.nipLama,
      nipBaru: data.nipBaru,
      noArsip: data.noArsip,
    });

    if (createdPegawai.error) {
      throw new ResponseError(503, "An error while create data Pegawai!");
    }

    return {
      status: "success",
      statusCode: 201,
      message: "Successfully created data Pegawai",
    };
  }

  static async getPegawai(): Promise<ResponsePayload> {
    const dataPegawai = await supabase.from("pegawai").select("*");

    if (dataPegawai.error) {
      throw new ResponseError(503, "An error while find data Pegawai!");
    }

    return {
      status: "success",
      message: "Successfully get data pegawai",
      statusCode: 200,
      data: dataPegawai.data,
    };
  }

  static async patchPegawai(data: DataPegawai): Promise<ResponsePayload> {
    const dataDb = await supabase.from("pegawai").select("*").eq("id", data.id);
    if (dataDb.error) {
      throw new ResponseError(503, "An error while find data Pegawai!");
    }

    if (dataDb.data.length === 0) {
      throw new ResponseError(404, "Oops! Dat pegawai is not found!");
    }

    const dataPegawaiNipLama = await supabase
      .from("pegawai")
      .select("*")
      .eq("nipLama", data.nipLama);

    if (dataPegawaiNipLama.error) {
      throw new ResponseError(503, "An error while edit data Pegawai!");
    }

    if (dataPegawaiNipLama.data?.length >= 2) {
      throw new ResponseError(401, "Oops! NIP Lama has been registered!");
    }

    const dataPegawaiNipBaru = await supabase
      .from("pegawai")
      .select("*")
      .eq("nipBaru", data.nipBaru);

    if (dataPegawaiNipBaru.error) {
      throw new ResponseError(503, "An error while edit data Pegawai!");
    }

    if (dataPegawaiNipBaru.data.length >= 2) {
      throw new ResponseError(401, "Oops! NIP Baru has been registered!");
    }

    const dataPegawaiNoArsip = await supabase
      .from("pegawai")
      .select("*")
      .eq("noArsip", data.noArsip);

    if (dataPegawaiNoArsip.error) {
      throw new ResponseError(503, "An error while edit Pegawai!");
    }

    if (dataPegawaiNoArsip.data.length > 1) {
      throw new ResponseError(401, "Oops! No Arsip has been registered!");
    }

    const dataEdited = await supabase
      .from("pegawai")
      .update(data)
      .eq("id", data.id)
      .select("*");

    if (dataEdited.error) {
      throw new ResponseError(503, "An error while find data Pegawai!");
    }

    return {
      status: "success",
      message: "Successfully edit data pegawai",
      statusCode: 201,
      data: dataEdited.data[0],
    };
  }

  static async deletePegawai(id: string): Promise<ResponsePayload> {
    const dataPegawai = await supabase.from("pegawai").select("*").eq("id", id);
    if (dataPegawai.error) {
      throw new ResponseError(503, "An error while Detele data Pegawai!");
    }

    if (dataPegawai.data.length === 0) {
      throw new ResponseError(404, "Pegawai is not found!");
    }

    const deletedPegawai = await supabase.from("pegawai").delete().eq("id", id);

    if (deletedPegawai.error) {
      throw new ResponseError(503, "An error while delete data pegawai!");
    }

    return {
      status: "success",
      message: "Successfully delete data pegawai",
      statusCode: 201,
    };
  }
}
