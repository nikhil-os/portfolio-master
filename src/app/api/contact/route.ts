import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Email to site owner (you)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Contact from ${email}`,
      text: `You have received a new message from ${email}:\n\n${message}`,
    });

    // 2. Auto-reply to sender matching portfolio dark theme
    const autoReplyHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #17171A; color: #F2F5F7; padding: 30px; border-radius: 12px; border: 1px solid #3A404A;">
        <h2 style="color: #D2D8DD; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #D2D8DD;">
          Hi there,
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #D2D8DD;">
          I have received your message and will get back to you as soon as possible. I appreciate your interest in my portfolio and work.
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3A404A;">
          <p style="font-size: 14px; color: #5E6673;">
            Best regards,<br/>
            <strong style="color: #D2D8DD;">Nikhil Sahu</strong><br/>
            Full-Stack Developer
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Nikhil Sahu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me! - Nikhil Sahu",
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
