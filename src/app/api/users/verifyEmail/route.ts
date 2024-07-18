import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

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
  const reqBody = await request.json();
  const { token = "" } = reqBody;

  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: new Date() }, // Check if verifyTokenExpiry is greater than current date/time
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired validation code." },
      { status: 400 }
    );
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;

  try {
    await user.save();
    console.log("verify token");
    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Error verifying email:", e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
