import nodemailer from 'nodemailer'
import { db } from './db'
import { bookings } from './schema'
import { eq } from 'drizzle-orm'

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
    console.log(`FALLBACK - OTP for ${email}: ${otp}`)
    return true
  }
}

export const sendBookingEmails = async ({ userEmail, adminEmail, bookingDetails }: {
  userEmail: string
  adminEmail: string
  bookingDetails: any
}) => {
  try {
    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: 'Wedding Vibes - Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ec4899;">Wedding Vibes Photography</h1>
          <h2>Booking Confirmation</h2>
          <p>Thank you for your booking request! We have received your inquiry and it's currently pending approval.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Event Type:</strong> ${bookingDetails.eventType}</p>
            <p><strong>Date:</strong> ${bookingDetails.eventDate}</p>
            <p><strong>Venue:</strong> ${bookingDetails.venue}</p>
            <p><strong>Contact:</strong> ${bookingDetails.contactNumber}</p>
          </div>
          <p>We will review your request and get back to you soon!</p>
        </div>
      `
    })

    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: 'New Booking Request - Wedding Vibes',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ec4899;">New Booking Request</h1>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>ID:</strong> ${bookingDetails.id}</p>
            <p><strong>Event Type:</strong> ${bookingDetails.eventType}</p>
            <p><strong>Date:</strong> ${bookingDetails.eventDate}</p>
            <p><strong>Venue:</strong> ${bookingDetails.venue}</p>
            <p><strong>Contact:</strong> ${bookingDetails.contactNumber}</p>
            <p><strong>Email:</strong> ${bookingDetails.email}</p>
            <p><strong>Message:</strong> ${bookingDetails.message}</p>
          </div>
          <p>Please review and approve/reject this booking in the admin dashboard.</p>
        </div>
      `
    })

    return true
  } catch (error) {
    console.error('Booking email error:', error)
    return false
  }
}

export const sendApprovalEmail = async (userEmail: string, booking: any, status: 'approved' | 'rejected') => {
  try {
    const subject = status === 'approved' ? 'Booking Approved!' : 'Booking Update'
    const message = status === 'approved' 
      ? 'Great news! Your booking has been approved.'
      : 'Unfortunately, your booking request could not be approved. Please contact us for more information.'

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `Wedding Vibes - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ec4899;">Wedding Vibes Photography</h1>
          <h2>${subject}</h2>
          <p>${message}</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Event Type:</strong> ${booking.eventType}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Venue:</strong> ${booking.venue}</p>
          </div>
          ${status === 'rejected' ? '<p>For any questions, please contact us at weddingxvibes@gmail.com</p>' : ''}
        </div>
      `
    })

    return true
  } catch (error) {
    console.error('Approval email error:', error)
    return false
  }
}

export const addToCalendar = async (booking: any) => {
  try {
    console.log('Adding to calendar:', booking)
    return true
  } catch (error) {
    console.error('Calendar error:', error)
    return false
  }
}