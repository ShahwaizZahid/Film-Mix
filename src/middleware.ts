import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/otp";
  const isPrivatePath = path === "/movies";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle /api/user/me route
  if (path === "/api/user/me" && !token) {
    console.log("token ni ha");
    // return new NextResponse(
    //   JSON.stringify({ message: "Unauthorized" }),
    //   { status: 401, headers: { "Content-Type": "application/json" } }
    // );
  }
}

export const config = {
  matcher: ["/login", "/signup", "/otp", "/movies", "/api/user/me"],
};
