export function generateOTP(): string {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export function getOTPEmailTemplate(otp: string, name: string): { subject: string; html: string; text: string } {
    const subject = 'Email Verification Code'

    const text = `Hello ${name},

Thank you for signing up!

Your verification code is: ${otp}

This code will expire in 10 minutes.

Please enter this code on the verification page to complete your registration.

Security Notice: Never share this code with anyone. If you didn't request this code, please ignore this email.

---
This is an automated message, please do not reply.
© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Your Company'}
`

    // Use the same plain text for HTML (email clients will display it as-is)
    const html = text.replace(/\n/g, '<br>')

    return { subject, html, text }
}
