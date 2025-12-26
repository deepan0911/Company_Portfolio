import nodemailer from 'nodemailer';

// Create Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

interface SendAutoReplyEmailParams {
    customerName: string;
    customerEmail: string;
    service: string;
    message: string;
}

export async function sendAutoReplyEmail({
    customerName,
    customerEmail,
    service,
    message,
}: SendAutoReplyEmailParams) {
    const companyName = process.env.COMPANY_NAME || 'Our Company';
    const supportEmail = process.env.GMAIL_USER || 'deepann09112004@gmail.com';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const mailOptions = {
        from: `"${companyName}" <${supportEmail}>`,
        to: customerEmail,
        replyTo: supportEmail,
        subject: `Thank you for contacting us`,
        text: `Dear ${customerName},

Thank you for reaching out to us. We have received your inquiry and appreciate you taking the time to contact us.

Our team will carefully review your message and get back to you within 24-48 hours with a detailed response.

If you have any urgent questions in the meantime, please feel free to contact us directly.

Best regards,
${companyName} Team

---
Email: ${supportEmail}
Website: ${siteUrl}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Auto-reply email sent successfully to:', customerEmail);
        console.log('Message ID:', info.messageId);
        return { success: true, data: info };
    } catch (error) {
        console.error('❌ Error sending auto-reply email:', error);
        return { success: false, error };
    }
}

// Send notification to admin
interface SendAdminNotificationParams {
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    service: string;
    message: string;
}

export async function sendAdminNotification({
    customerName,
    customerEmail,
    customerMobile,
    service,
    message,
}: SendAdminNotificationParams) {
    const adminEmail = process.env.GMAIL_USER || 'deepann09112004@gmail.com';
    const companyName = process.env.COMPANY_NAME || 'Our Company';

    const mailOptions = {
        from: `"${companyName} Contact Form" <${adminEmail}>`,
        to: adminEmail,
        replyTo: customerEmail,
        subject: `New Contact Form Submission - ${service}`,
        text: `NEW CONTACT FORM SUBMISSION

From: ${customerName}
Email: ${customerEmail}
Mobile: ${customerMobile}
Service: ${service}

Message:
"${message}"

---
An automated response has been sent to the customer.
Reply to this email to respond directly to ${customerName}.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Admin notification sent successfully');
        console.log('Message ID:', info.messageId);
        return { success: true, data: info };
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        return { success: false, error };
    }
}
