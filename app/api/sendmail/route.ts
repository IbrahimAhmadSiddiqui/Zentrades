import { mailer } from "@/utils/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const infoMail = await mailer.sendMail({
      from: process.env.NEXT_PUBLIC_GMAIL_ID,
      to: "support@smartserv.io",
      subject: "Password Reset Requested",
      html: `<h1>Your Requested Password Reset Mail from Ibrahim Siddiqui server is successfully sent</h1>`,
    });
    return NextResponse.json(infoMail);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
