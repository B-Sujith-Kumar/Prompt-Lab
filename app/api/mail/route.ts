import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: Response) {
  const { email, username, promptTitle, promptDescription, promptLink, authorName } =
    await req.json();
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });
    const mailOptions = {
      from: "prompt.lab6@gmail.com",
      to: email as string,
      subject: "New Prompt Uploaded",
      html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; color: #555555">
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)">
    <h2 style="color: #333333; text-align: center">Hello ${username},</h2>
    <p style="color: #555555; text-align: center">
      A new prompt titled <strong>${promptTitle}</strong> has been uploaded by the user <strong>${authorName}</strong> you follow.
    </p>
    <p style="color: #555555; text-align: center">${promptDescription}</p>
    <div style="text-align: center; margin-top: 20px">
      <a href="${promptLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold">
        View Prompt
      </a>
    </div>
  </div>
  <div style="background-color: #007bff; padding: 15px; text-align: center; margin-top: 20px; border-radius: 0 0 8px 8px">
    <p style="color: #ffffff; margin: 0">© 2024 PromptLab. All rights reserved.</p>
    </div>
</div>`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ message: "Email not sent" });
  }
}
