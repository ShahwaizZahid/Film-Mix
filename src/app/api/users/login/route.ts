import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/helper/hasPassword";
import { generateToken } from "@/helper/jwt";

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
  console.log(reqBody);
  const { email = "", password = "" } = reqBody;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  if (!password || typeof password !== "string") {
    return NextResponse.json({ message: "Invalid password" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email in mongo" },
        { status: 401 }
      );
    }
    const compare = await comparePassword(password, user?.password);

    if (!compare) {
      return NextResponse.json(
        { message: "Invalid  password" },
        { status: 401 }
      );
    }
    const passedUser = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const jwt = await generateToken(passedUser);

    const response = NextResponse.json(
      { message: "Login successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", jwt);

    console.log("Successfully logged in and created session in MongoDB");

    return response;
  } catch (err: any) {
    console.error("Error while logging in: ", err);
    NextResponse.json({ message: err.message }, { status: 500 });
  }
}
