import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successfully", success: true },
      { status: 200 }
    );

    response.cookies.delete("token");

    return response;
  } catch (e: any) {
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
