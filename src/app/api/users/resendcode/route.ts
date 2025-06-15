import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helper/sendMailer";

export async function POST(request: NextRequest) {
  try {
    await connect();
  } catch (e) {
    return NextResponse.json(
      { message: "Database connection error" },
      { status: 500 }
    );
  }

  const reqBody = await request.json();
  const { email = "" } = reqBody;
  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json(
      { message: "you are unable to resend code" },
      { status: 400 }
    );
  }

  user.verifyToken = Math.floor(100000 + Math.random() * 900000);
  user.verifyTokenExpiry = Date.now() + 2 * 24 * 60 * 60 * 1000;

  try {
    await user.save();
  } catch (e) {
    return NextResponse.json({ message: "Server error " }, { status: 500 });
  }

  try {
    await sendVerificationEmail({
      email,
      validationCode: user.verifyToken,
    });
    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message:
          "Error while resending otp. Make sure it is a valid to resend code.",
      },
      { status: 500 }
    );
  }
}
