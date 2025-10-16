import ResponseError from "@/error/ResponseError";
import PegawaiService from "@/service/pegawai-service";
import { DataPegawai, ResponsePayload } from "@/types";
import PegawaiValidation from "@/validation/pegawai-validation";
import Validation from "@/validation/Validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.text();
    const dataBody = JSON.parse(body) as Omit<DataPegawai, "id">;
    Validation.validate(PegawaiValidation.CREATEPEGAWAI, dataBody);

    const response = await PegawaiService.createPegawai(dataBody);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error Pegawai Route POST Metode:", error);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const response = await PegawaiService.getPegawai();

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error Pegawai Route GET Metode:", error);
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

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.text();
    const dataBody = JSON.parse(body) as DataPegawai;
    const data = Validation.validate(PegawaiValidation.PATCHPEGAWAI, dataBody);
    const response = await PegawaiService.patchPegawai(data);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error Pegawai Route PATCH Metode:", error);
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
