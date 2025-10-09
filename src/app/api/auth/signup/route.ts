import ResponseError from "@/error/ResponseError";
import UserService from "@/service/user-service";
import { DataSignup, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import Validation from "@/validation/Validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.text();
    const dataBody = JSON.parse(body) as DataSignup;

    Validation.validate(UserValidation.CREATEUSER, dataBody);

    const response = await UserService.CreateUser(dataBody);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error Sign Up Route:", error);
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
