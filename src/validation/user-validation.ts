import z from "zod";

export default class UserValidation {
  static readonly CREATEUSER = z
    .object({
      username: z
        .string({ error: "Please fill username properly!" })
        .min(1, { error: "Minimum of length username is 1" }),
      name: z
        .string({ error: "Please fill username properly!" })
        .min(1, { error: "Minimum of length Name is 1" }),
      password: z
        .string({ error: "Please fill password properly!" })
        .min(6, "Password minimal 6 karakter"),
      confirmPassword: z
        .string({ error: "Please fill confirmation password properly!" })
        .min(6, "Konfirmasi password minimal 6 karakter"),
      descriptionUser: z
        .string({ error: "Please fill description properly!" })
        .min(10, "Description minimal 10 karakter")
        .max(500, "Description maksimal 500 karakter"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password dan konfirmasi password harus sama",
      path: ["confirmPassword"],
    });

  static readonly LOGIN = z.object({
    username: z
      .string({ error: "Please fill username properly!" })
      .min(1, { error: "Minimum of length username is 1" }),
    password: z
      .string({ error: "Please fill password properly!" })
      .min(6, { error: "Minimum of length password is 6" }),
  });
}
