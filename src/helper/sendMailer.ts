import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import { VerifyIdentityEmail } from "./email";

const transporter = createTransport({
  // @ts-ignore
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail({
  email,
  validationCode,
}: {
  email: string;
  validationCode: string;
}) {
  const emailHTML = render(VerifyIdentityEmail({ validationCode }));

  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify your email",
    html: emailHTML,
  };

  try {
    const mailRes = await transporter.sendMail(message);
    console.log("Email sent to", email);
    return mailRes;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
