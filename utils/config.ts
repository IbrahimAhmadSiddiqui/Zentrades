import nodemailer from "nodemailer";

/**
 * Nodemailer configuration for sending emails using Gmail.
 *
 * @type {nodemailer.Transporter}
 * @namespace mailer
 *
 * @example
 * // Import in your email-sending module (e.g., emailSender.ts)
 * import { mailer } from './path-to-your-nodemailer-config-file';
 * // Use mailer to send emails
 * mailer.sendMail({ /* email options */
const user = process.env.NEXT_PUBLIC_GMAIL_ID;
const password = process.env.NEXT_PUBLIC_GMAIL_PASSWORD;

/**
 * Represents the Nodemailer transporter configured for Gmail.
 *
 * @type {nodemailer.Transporter}
 */
export const mailer = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: user,
    pass: password,
  },
});
