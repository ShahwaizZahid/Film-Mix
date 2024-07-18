import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successfully", success: true },
      { status: 200 }
    );

    response.cookies.delete("token");

    console.log("Successfully logged in and created session in MongoDB");
    return response;
  } catch (e: any) {
    console.log("error in logout", e);
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
