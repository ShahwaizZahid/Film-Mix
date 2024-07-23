import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = verifyToken(token);
    return decodedToken;
  } catch (e: any) {
    // throw new Error(e.message);
    console.log("user not found");
  }
};
