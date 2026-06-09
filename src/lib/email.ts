// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,                     // true only for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,     // Gmail: use App Password, not account password
  },
});

export async function sendVerificationEmail(to: string, url: string) {
  await transporter.sendMail({
    from: `"YourApp" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verify your email",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2>Confirm your email</h2>
        <p>Click the button below to verify your account:</p>
        <a href="${url}" style="
          display:inline-block;padding:12px 24px;
          background:#39FF6A;color:#000;
          border-radius:6px;text-decoration:none;font-weight:bold
        ">Verify Email</a>
        <p style="color:#999;font-size:12px;margin-top:24px">
          Link expires in 24 hours. If you didn't sign up, ignore this.
        </p>
      </div>
    `,
  });
}