import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ResponsePayload } from "./types";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const url = req.nextUrl.pathname;
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie ? tokenCookie.value : null;

  if (url.includes("/api")) {
    if (url.includes("/auth")) {
      if (req.method === "DELETE") {
        if (!token) {
          return NextResponse.json<ResponsePayload>({
            status: "failed",
            statusCode: 403,
            message: "Oops! You already logout!",
          });
        }
      } else {
        if (token) {
          return NextResponse.json<ResponsePayload>({
            status: "failed",
            statusCode: 403,
            message: "You have been loged in!",
          });
        }
      }
    }
  } else {
    if (url.includes("/auth")) {
      if (token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (url.includes("/manajemen-pengguna")) {
      if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const matcher: MiddlewareConfig = {
  matcher: ["/:path"],
};
