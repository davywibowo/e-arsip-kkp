import ResponseError from "@/error/ResponseError";
import { ResponsePayload } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return NextResponse.json<ResponsePayload>({
      status: "success",
      statusCode: 200,
      message: "Successfully logout!",
    });
  } catch (error) {
    console.log("Error auth Route DELETE Metode:", error);
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
