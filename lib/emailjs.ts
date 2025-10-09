// EmailJS integration for contact form
// Install: npm install emailjs-com

import emailjs from 'emailjs-com'

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
  userId: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'your_user_id'
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  address?: string
  eventType: string
  eventDate?: string
  message?: string
}

/**
 * Send contact form email using EmailJS
 * @param formData Contact form data
 * @returns Promise<boolean> Success status
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Initialize EmailJS (call this once in your app)
    emailjs.init(EMAILJS_CONFIG.userId)

    // Prepare template parameters
    const templateParams = {
      to_name: 'Wedding Vibes Photography',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address || 'Not provided',
      event_type: formData.eventType,
      event_date: formData.eventDate || 'Not specified',
      message: formData.message || 'No additional message',
      reply_to: formData.email
    }

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    console.log('Email sent successfully:', response)
    return response.status === 200
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

/**
 * Send auto-reply email to the client
 * @param clientEmail Client's email address
 * @param clientName Client's name
 * @returns Promise<boolean> Success status
 */
export const sendAutoReply = async (clientEmail: string, clientName: string): Promise<boolean> => {
  try {
    const autoReplyParams = {
      to_email: clientEmail,
      to_name: clientName,
      from_name: 'Wedding Vibes Photography',
      message: `
        Dear ${clientName},

        Thank you for reaching out to Wedding Vibes Photography! 

        We have received your inquiry and are excited about the possibility of capturing your special moments. Our team will review your requirements and get back to you within 24 hours.

        In the meantime, feel free to check out our latest work on Instagram @weddingvibes or browse through our portfolio on our website.

        Best regards,
        Wedding Vibes Photography Team
        
        📞 +91 98765 43210
        📧 info@weddingvibes.com
        🌐 www.weddingvibes.com
      `
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'auto_reply_template', // You'll need to create this template in EmailJS
      autoReplyParams
    )

    return response.status === 200
  } catch (error) {
    console.error('Error sending auto-reply:', error)
    return false
  }
}

/**
 * Validate email format
 * @param email Email string to validate
 * @returns boolean
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Indian format)
 * @param phone Phone number string
 * @returns boolean
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91|0)?[6789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

// EmailJS template example for reference:
/*
EmailJS Template (HTML):

<h2>New Contact Form Submission</h2>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Address:</strong> {{address}}</p>
<p><strong>Event Type:</strong> {{event_type}}</p>
<p><strong>Event Date:</strong> {{event_date}}</p>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><em>This email was sent from the Wedding Vibes Photography contact form.</em></p>
*/