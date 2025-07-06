import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/otp";
  const isPrivatePath = path === "/movies";
  const isApiPath = path.startsWith("/api/");
  const token = request.cookies.get("token")?.value || "";

  // Allow API calls to proceed without authentication check
  if (isApiPath) {
    return NextResponse.next();
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/otp", "/movies", "/api/:path*"],
};
