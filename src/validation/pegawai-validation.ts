import z from "zod";

export default class PegawaiValidation {
  static readonly CREATEPEGAWAI = z.object({
    namaPegawai: z
      .string({ error: "Please fill 'Nama Pegawai' properly!" })
      .min(1, { error: "Minimum length of Nama Pegawai is 1" }),
    nipLama: z
      .string({ error: "Please fill 'NIP Lama' properly!" })
      .regex(/^\d+$/, { error: "NIP Lama must contain only numbers" })
      .min(8, { error: "NIP Lama must be exactly 8 characters" })
      .max(8, { error: "NIP Lama must be exactly 8 characters" }),
    nipBaru: z
      .string({ error: "Please fill 'NIP Baru' properly!" })
      .regex(/^\d+$/, { error: "NIP Baru must contain only numbers" })
      .min(18, { error: "NIP Baru must be exactly 18 characters" })
      .max(18, { error: "NIP Baru must be exactly 18 characters" }),
    noArsip: z
      .string({ error: "Please fill 'No Arsip' properly!" })
      .min(3, { error: "Minimum length of No Arsip is 3" })
      .max(5, { error: "Max length of No Arsip is 5!" }),
  });

  static readonly PATCHPEGAWAI = z.object({
    id: z.number({ error: "Id is required!" }),
    namaPegawai: z
      .string({ error: "Please fill 'Nama Pegawai' properly!" })
      .min(1, { error: "Minimum length of Nama Pegawai is 1" }),
    nipLama: z
      .string({ error: "Please fill 'NIP Lama' properly!" })
      .regex(/^\d+$/, { error: "NIP Lama must contain only numbers" })
      .min(8, { error: "NIP Lama must be exactly 8 characters" })
      .max(8, { error: "NIP Lama must be exactly 8 characters" }),
    nipBaru: z
      .string({ error: "Please fill 'NIP Baru' properly!" })
      .regex(/^\d+$/, { error: "NIP Baru must contain only numbers" })
      .min(18, { error: "NIP Baru must be exactly 18 characters" })
      .max(18, { error: "NIP Baru must be exactly 18 characters" }),
    noArsip: z
      .string({ error: "Please fill 'No Arsip' properly!" })
      .min(3, { error: "Minimum length of No Arsip is 3" })
      .max(5, { error: "Max length of No Arsip is 5!" }),
  });
}
