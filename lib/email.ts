import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT!),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    // For development - also log to console
    console.log(`\n=== OTP EMAIL ===`)
    console.log(`To: ${email}`)
    console.log(`OTP Code: ${otp}`)
    console.log(`=================\n`)

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Wedding Vibes - Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; margin: 0;">Wedding Vibes</h1>
            <p style="color: #666; margin: 5px 0;">Professional Photography</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
            <h2 style="color: #333; margin-bottom: 20px;">Email Verification</h2>
            <p style="color: #666; margin-bottom: 30px;">Your verification code is:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px dashed #ec4899;">
              <h1 style="color: #ec4899; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This code will expire in <strong>10 minutes</strong>.<br>
              If you didn't request this code, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>© 2024 Wedding Vibes Photography. All rights reserved.</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    // Still log to console as fallback
    console.log(`FALLBACK - OTP for ${email}: ${otp}`)
    return true
  }
}