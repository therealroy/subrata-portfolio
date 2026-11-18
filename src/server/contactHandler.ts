import { Resend } from 'resend';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  hp_company_field?: string; // Honeypot field for bot spam detection
  timestamp?: number;        // Timestamp to detect instant bot submissions
}

export interface ContactHandlerResult {
  success: boolean;
  messageId?: string;
  error?: string;
  statusCode?: number;
}

// In-memory rate limiting tracker (per IP/fingerprint, max 5 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (now - record.firstRequestTime > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function processContactSubmission(
  payload: ContactSubmissionPayload,
  clientIp: string = 'unknown'
): Promise<ContactHandlerResult> {
  const { name, email, subject, message, hp_company_field, timestamp } = payload;

  // 1. Honeypot check: Bots fill hidden fields
  if (hp_company_field && hp_company_field.trim().length > 0) {
    console.warn(`[Spam Protection] Honeypot triggered by ${clientIp}`);
    // Return silent fake success to disarm automated bots
    return { success: true, messageId: 'hp_filtered' };
  }

  // 2. Timing check: Humans take at least 1.5 seconds to fill out the form
  if (timestamp) {
    const elapsedMs = Date.now() - timestamp;
    if (elapsedMs < 1200) {
      console.warn(`[Spam Protection] Submission too fast (${elapsedMs}ms) from ${clientIp}`);
      return { success: true, messageId: 'timing_filtered' };
    }
  }

  // 3. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      statusCode: 429,
      error: 'Too many messages sent. Please wait a few minutes before transmitting another message or email directly to roy417996@gmail.com.',
    };
  }

  // 4. Strict Validation
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim().toLowerCase();
  const trimmedSubject = (subject || '').trim();
  const trimmedMessage = (message || '').trim();

  if (!trimmedName || trimmedName.length < 2) {
    return { success: false, statusCode: 400, error: 'Please provide your full name (at least 2 characters).' };
  }

  if (trimmedName.length > 100) {
    return { success: false, statusCode: 400, error: 'Name cannot exceed 100 characters.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { success: false, statusCode: 400, error: 'Please provide a valid email address.' };
  }

  if (trimmedEmail.length > 120) {
    return { success: false, statusCode: 400, error: 'Email address is too long.' };
  }

  if (!trimmedMessage || trimmedMessage.length < 5) {
    return { success: false, statusCode: 400, error: 'Message must be at least 5 characters long.' };
  }

  if (trimmedMessage.length > 5000) {
    return { success: false, statusCode: 400, error: 'Message exceeds the 5,000 character limit.' };
  }

  // 5. Verify Resend API Key
  const apiKey = process.env.RESEND_API_KEY;
  const isInvalidPlaceholder = !apiKey || 
    apiKey.trim() === '' || 
    apiKey.includes('your_resend_api_key') || 
    apiKey.includes('your_api_key') || 
    apiKey.includes('re_your_') ||
    apiKey.length < 15;

  if (isInvalidPlaceholder) {
    console.warn('[Resend API Notice] RESEND_API_KEY is not set or using placeholder. Redirecting to mail template.');
    return {
      success: false,
      statusCode: 400,
      error: 'Resend API key is not yet configured. Redirecting to mail client with pre-filled template.',
    };
  }

  // 6. Build dynamic subject and date/time in IST
  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeSubject = escapeHtml(trimmedSubject);
  const safeMessage = escapeHtml(trimmedMessage);

  const submissionDate = new Date();
  const formattedDate = submissionDate.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const emailSubject = trimmedSubject 
    ? `[Portfolio Contact] ${trimmedSubject} — from ${trimmedName}`
    : `[Portfolio Inquiry] New message from ${trimmedName}`;

  // 7. Compose HTML & Text templates
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #141418; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
    
    <!-- Banner Header -->
    <div style="background: linear-gradient(135deg, #F04B20 0%, #D93E15 100%); padding: 28px 24px; color: #ffffff;">
      <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; opacity: 0.85; margin-bottom: 6px;">
        SUBRATA ROY PORTFOLIO // INCOMING TRANSMISSION
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; line-height: 1.2; color: #ffffff;">
        New Contact Inquiry
      </h1>
    </div>

    <!-- Metadata Section -->
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; color: #a1a1aa; width: 140px; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Sender Name:</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: 700;">${safeName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; color: #a1a1aa; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Sender Email:</td>
          <td style="padding: 10px 0;">
            <a href="mailto:${safeEmail}" style="color: #FF653D; font-weight: 600; text-decoration: none;">
              ${safeEmail}
            </a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; color: #a1a1aa; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Subject:</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${safeSubject || 'General Collaboration / Inquiry'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #a1a1aa; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Timestamp:</td>
          <td style="padding: 10px 0; color: #d4d4d8; font-family: monospace; font-size: 13px;">${formattedDate} (IST)</td>
        </tr>
      </table>

      <!-- Message Body -->
      <div style="margin-bottom: 8px; color: #a1a1aa; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;">
        Message Content
      </div>
      <div style="background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; color: #f4f4f5; font-size: 14px; line-height: 1.7; white-space: pre-wrap; font-family: inherit;">${safeMessage}</div>

      <!-- Quick Reply Action Button -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(trimmedSubject || 'Portfolio Inquiry')}"
           style="display: inline-block; background-color: #F04B20; color: #ffffff; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 32px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 15px rgba(240, 75, 32, 0.4);">
          Reply Directly to ${safeName}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #27272a; padding: 16px 24px; background-color: #0d0d10; font-size: 11px; color: #71717a; text-align: center; line-height: 1.5;">
      Delivered directly to Subrata Roy (<span style="color: #a1a1aa;">roy417996@gmail.com</span>)<br/>
      Sent from Portfolio Contact Transmission Service
    </div>

  </div>
</body>
</html>
  `;

  const textContent = `
NEW PORTFOLIO CONTACT INQUIRY
=========================================================
Sender Name  : ${trimmedName}
Sender Email : ${trimmedEmail}
Subject      : ${trimmedSubject || 'General Collaboration / Inquiry'}
Date & Time  : ${formattedDate} (IST)

MESSAGE:
---------------------------------------------------------
${trimmedMessage}
---------------------------------------------------------
Recipient    : roy417996@gmail.com
Direct Reply : mailto:${trimmedEmail}
=========================================================
  `.trim();

  // 8. Send with Resend SDK
  try {
    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Subrata Roy Portfolio <onboarding@resend.dev>';
    const recipientEmail = 'roy417996@gmail.com';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientEmail],
      replyTo: trimmedEmail,
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('[Resend API Error]:', error);
      return {
        success: false,
        statusCode: 502,
        error: error.message || 'Failed to dispatch email via Resend API.',
      };
    }

    return {
      success: true,
      messageId: data?.id,
      statusCode: 200,
    };
  } catch (err: any) {
    console.error('[Resend Exception]:', err);
    return {
      success: false,
      statusCode: 500,
      error: err?.message || 'Unexpected server error occurred during email dispatch.',
    };
  }
}

