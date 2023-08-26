import nodemailer from 'nodemailer'
import { ENV_CONFIG } from '@/config/env.config'

let transporter = nodemailer.createTransport({
  host: ENV_CONFIG.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: ENV_CONFIG.SMTP_USER,
    pass: ENV_CONFIG.SMTP_PASSWORD,
  },
})

interface EmailParams {
  to: string
  subject: string
  html: string
}

const sendEmail = async ({ to, subject, html }: EmailParams) => {
  try {
    const result = await transporter.sendMail({
      from: `${ENV_CONFIG.SMTP_ALIAS} <${ENV_CONFIG.SMTP_FROM}>`,
      to, // list of receivers
      subject, // Subject line
      html, // html body
    })
    return { success: true, message: 'EMAIL SENT', result }
  } catch (err) {
    // console.log(err)
    return { success: false, message: 'ERROR SENDING EMAIL', error:err }
  }
}

export default sendEmail
