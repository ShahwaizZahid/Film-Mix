me route

import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(request: NextRequest) {
  try {
    await connect();
    console.log("Mongo connected");
  } catch (e) {
    console.log("Error in Mongo connection", e);
    return NextResponse.json(
      { message: "Database connection error" },
      { status: 500 }
    );
  }

  const userId = await getDataFromToken(request);
  console.log(userId);
  const user = await User.findOne({ _id: userId }).select("-password");
  console.log(user);
  if (!user) {
    return NextResponse.json({ message: "invalid token" }, { status: 400 });
  }
  console.log("successfull working me ", user);
  return NextResponse.json(
    { message: "User found", data: user },
    { status: 200 }
  );
}
