import ResponseError from "@/error/ResponseError";
import UserService from "@/service/user-service";
import { ResponsePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      throw new ResponseError(403, "Oops! Token is required");
    }

    const response = await UserService.getUserData(
      token,
      req.nextUrl.searchParams
    );

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error User Route GET Metode:", error);
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: error.message,
        statusCode: error.status,
      });
    } else if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: error.issues[0].message,
        statusCode: 402,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: "An error occured",
        statusCode: 500,
      });
    }
  }
}
