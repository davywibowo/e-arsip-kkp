import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import { supabase } from "@/lib/supabase/server";
import { DataLogin, DataSignup, DataUser, ResponsePayload } from "@/types";
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

  static async getUserData(
    token: string | undefined,
    query: URLSearchParams
  ): Promise<ResponsePayload> {
    const dataUser = JWT.verifyToken(token as string | null);
    if (!dataUser) {
      return {
        status: "success",
        statusCode: 200,
        message: "Successfully get user data",
        data: null,
      };
    }
    const dataFromDb = await supabase
      .from("user")
      .select("*")
      .eq("username", dataUser.username);

    if (query.get("all") == "true") {
      if (dataFromDb.data && dataFromDb.data[0].role !== "ADMIN") {
        throw new ResponseError(
          403,
          "Oops! You don't have any access for this!"
        );
      }

      const dataUsers = await supabase.from("user").select("*");
      if (dataUsers.error) {
        throw new ResponseError(503, "An error while get user data!");
      }

      const data = dataUsers.data.map<DataUser>((d) => ({
        id: d.id,
        username: d.username,
        name: d.name,
        role: d.role,
        isYou: d.username === dataUser.username,
      }));

      return {
        status: "success",
        message: "Successfully get data User",
        statusCode: 200,
        data: data as DataUser[],
      };
    }

    const v = query.get("q");
    if (v) {
      if (dataFromDb.data && dataFromDb.data[0].role !== "ADMIN") {
        throw new ResponseError(
          403,
          "Oops! You don't have any access for this!"
        );
      }

      const dataUsers = await supabase
        .from("user")
        .select("*")
        .eq("username", v);

      if (dataUsers.error) {
        throw new ResponseError(503, "An error while get user data!");
      }

      const data = dataUsers.data.map<DataUser>((d) => ({
        id: d.id,
        username: d.username,
        name: d.name,
        role: d.role,
        isYou: d.username === dataUser.username,
      }));

      return {
        status: "success",
        statusCode: 200,
        message: "Successfully get data user",
        data: data as DataUser[],
      };
    }

    if (dataFromDb.error) {
      throw new ResponseError(503, "An error while get user data!");
    }

    if (dataFromDb && dataFromDb.data.length === 0) {
      throw new ResponseError(404, "Oops username is not found!");
    }

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get user data",
      data: {
        username: dataFromDb.data[0].username,
        name: dataFromDb.data[0].name,
        role: dataFromDb.data[0].role,
      },
    };
  }

  static async deleteUser(token: string, id: number): Promise<ResponsePayload> {
    const verifiedToken = JWT.verifyToken(token);
    if (!verifiedToken) {
      throw new ResponseError(403, "Oops! Token is required!");
    }

    const dataUser = await supabase
      .from("user")
      .select("*")
      .eq("username", verifiedToken.username);

    if (dataUser.error) {
      console.log(dataUser.error);
      throw new ResponseError(500, "An error occured! Please try again later");
    }

    const dataAcces = dataUser.data[0] as DataUser;

    if (dataAcces.role !== "ADMIN") {
      throw new ResponseError(
        403,
        "Oops! You don't have any access for this action!"
      );
    }

    const userDelete = await supabase.from("user").select("*").eq("id", id);

    if (userDelete.error) {
      throw new ResponseError(500, "An error occured! Please try again later");
    }

    if (userDelete.data.length === 0) {
      throw new ResponseError(404, "OOps! user is not found!");
    }

    if (userDelete.data[0].username === verifiedToken.username) {
      throw new ResponseError(401, "Oops! You can't delete yourself :D");
    }

    const deletedUser = await supabase.from("user").delete().eq("id", id);
    if (deletedUser.error) {
      throw new ResponseError(500, "An error occured! Please try again later");
    }

    return {
      status: "success",
      message: "Successfully deleted one user!",
      statusCode: 201,
    };
  }
}
