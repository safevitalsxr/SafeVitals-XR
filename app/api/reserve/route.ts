import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { submitDemoRequest } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // 1. Store in Supabase if projects keys are configured
    let storedInSupabase = false;
    try {
      const res = await submitDemoRequest(payload);
      storedInSupabase = !!res.stored;
    } catch (dbError) {
      console.error("Database storage error:", dbError);
      // Continue to try to send the email even if DB write fails
    }

    const { hospital_name, doctor_name, email, department, hospital_size, message } = payload;

    // 2. Setup SMTP Email Transport
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const emailSubject = `New Demo Request: ${hospital_name}`;
    const emailHtml = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #000000; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">
          SafeVitals XR &mdash; Demo Request
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tbody>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 140px; font-size: 14px; border-bottom: 1px solid #f1f5f9;">Hospital Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${hospital_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #f1f5f9;">Doctor Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${doctor_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #f1f5f9;">Email</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">
                <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #f1f5f9;">Department</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${department}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #f1f5f9;">Hospital Size</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${hospital_size}</td>
            </tr>
          </tbody>
        </table>

        ${message ? `
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message / Current Systems</p>
            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
          </div>
        ` : ""}

        <div style="font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 30px;">
          This demo request was submitted via the SafeVitals XR website.
        </div>
      </div>
    `;

    if (smtpHost && smtpUser && smtpPass) {
      // Send real email via SMTP
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        family: 4, // Force IPv4 to prevent ENETUNREACH on IPv6-unsupported networks
      });

      await transporter.sendMail({
        from: `"${doctor_name} via SafeVitals" <${smtpUser}>`,
        to: "safevitals.xr@gmail.com",
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      return NextResponse.json({ success: true, emailSent: true, storedInSupabase });
    } else {
      // Dev mode: log email body to server stdout
      console.log("\n==================================================");
      console.log(`[DEV MODE] EMAIL NOTIFICATION TO safevitals.xr@gmail.com`);
      console.log(`Subject: ${emailSubject}`);
      console.log("HTML Body Preview:\n", emailHtml);
      console.log("==================================================\n");

      return NextResponse.json({ 
        success: true, 
        emailSent: false, 
        storedInSupabase,
        message: "SMTP credentials not configured. Email preview logged to server dev console." 
      });
    }
  } catch (error: unknown) {
    console.error("Reserve API route error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
