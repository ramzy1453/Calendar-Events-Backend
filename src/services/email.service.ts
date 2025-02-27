import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/env";

class EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({ from: EMAIL_USER, to, subject, text });
  }
}

export default new EmailService();
