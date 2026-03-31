import emailjs from "@emailjs/nodejs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, topic, message } = await req.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const serviceKey = process.env.EMAIL_SERVICE_KEY!;

        const result = await emailjs.send(
            serviceKey,
            "template_fbnqjwj",
            {
                from_name: name,
                from_email: email,
                topic: topic || "Not specified",
                message,
            },
            {
                publicKey: process.env.EMAIL_PUBLIC_KEY,
                privateKey: process.env.EMAIL_PRIVATE_KEY,
            }
        );

        return NextResponse.json(
            { text: result.text, status: result.status },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("EmailJS error:", error);
        const errMsg =
            error instanceof Error ? error.message : "Failed to send email";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}
