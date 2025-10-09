import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import { supabase } from "@/lib/supabase/server";
import { DataLogin, DataSignup, ResponsePayload } from "@/types";
import { cookies } from "next/headers";

export default class UserService {
  static async CreateUser(data: DataSignup): Promise<ResponsePayload> {
    const cookieStore = await cookies();
    const dataFromDb = await supabase
      .from("user")
      .select("*")
      .eq("username", data.username);

    if (dataFromDb.error) {
      throw new ResponseError(
        503,
        "Error while signup! Please try again later"
      );
    }

    if (dataFromDb && dataFromDb.data.length > 0) {
      throw new ResponseError(405, "Username already registered!");
    }

    const passwordHashed = await Bcrypt.hashPassword(data.password);
    const dataInsert = await supabase.from("user").insert({
      username: data.username,
      name: data.name,
      password: passwordHashed,
    });

    if (dataInsert.error) {
      throw new ResponseError(
        503,
        "Error while insert data, please try again later!"
      );
    }

    const token = JWT.generateToken({
      password: passwordHashed,
      username: data.name,
    });

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return {
      status: "success",
      message: "Successfully signup!",
      statusCode: 201,
    };
  }

  static async LoginUser(data: DataLogin): Promise<ResponsePayload> {
    const cookieStore = await cookies();
    const dataFromDb = await supabase
      .from("user")
      .select("*")
      .eq("username", data.username);
    if (dataFromDb.error) {
      throw new ResponseError(
        503,
        "Error while login, please try again later!"
      );
    }

    if (dataFromDb && dataFromDb.data.length === 0) {
      throw new ResponseError(404, "Oops username is not registered!");
    }

    const isPasswordValid = await Bcrypt.comparePassword(
      data.password,
      dataFromDb.data[0].password
    );

    if (!isPasswordValid) {
      throw new ResponseError(403, "Oops! Password doesn't match!");
    }

    const token = JWT.generateToken({
      username: data.username,
      password: dataFromDb.data[0].password,
    });

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully login!",
    };
  }
}
