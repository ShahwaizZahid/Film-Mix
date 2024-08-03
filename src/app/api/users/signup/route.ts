import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/helper/hasPassword";
import { sendVerificationEmail } from "@/helper/sendMailer";

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
  try {
    const reqBody = await request.json();
    const { email = "", password = "", username = "" } = reqBody;

    const existingUser = await User.findOne({ email });

    if (existingUser && !existingUser.isVerified) {
      return NextResponse.json(
        { message: "Email already exists and not verified. Register again." },
        { status: 405 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      isAdmin: false,
      verifyToken: Math.floor(100000 + Math.random() * 900000),
      verifyTokenExpiry: Date.now() + 2 * 24 * 60 * 60 * 1000,
    });

    try {
      await newUser.save();
    } catch (e) {
      return NextResponse.json(
        { message: "Error saving user" },
        { status: 500 }
      );
    }

    try {
      await sendVerificationEmail({
        email: newUser.email,
        validationCode: newUser.verifyToken,
      });
      console.log("Successfully sent email");
      return NextResponse.json(
        {
          message:
            "Email sent successfully. Check your email for verification code.",
        },
        { status: 200 }
      );
    } catch (err) {
      await User.deleteOne({ email });
      return NextResponse.json(
        {
          message:
            "Error sending verification email. Make sure it is a valid email.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
